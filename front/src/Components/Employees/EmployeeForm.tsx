import React, { useState } from 'react'
import {
    Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { API_URL, EmployeeReqDTO, isSmallerScreenSetting } from '../../constants';
import { useForm, Controller } from 'react-hook-form';
import { Employee, Role, AccessRight, Permission } from '../../constants';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import AccessRightCrudTable from './AccessRightCrudTable';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import ConfirmDialog from '../Modal/ConfirmDialog';


interface EmployeeFormProps {
    employee: Employee;
    onUpdate: (data: Employee) => void;
    onCancel?: () => void;
    onDelete?: (id: string) => void
    onAdd?: (data: Employee) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onUpdate, onCancel, onDelete, onAdd }) => {
    const { getToken } = useAuthToken()
    const [openConfirm, setOpenConfirm] = useState(false)

    const { control, handleSubmit, setValue, reset } = useForm<Employee>({
        defaultValues: {
            accessRights: employee.accessRights,
            email: employee.email,
            id: employee.id,
            isDeleted: false,
            lastName: employee.lastName,
            name: employee.name,
            password: undefined,
            role: employee.role,
            usermame: employee.usermame
        },
    });

    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);


    const onSubmit = (data: Employee) => {
        console.log(data)
        if (data.accessRights.length < 1) {
            toast.error("Employee must contan at least one Acces Right")
            return
        }
        if (employee.id !== null) {
            const dto: EmployeeReqDTO = {
                accessRights: data.accessRights,
                name: data.name,
                lastName: data.lastName,
                password: data.password !== "" ? data.password : null,
            }
            updateEmployee(dto)
        } else {
            if (data.password.length < 8) {
                toast.error("Employee must have password(min 8 characters long)")
                return
            }
            addEmployee(data)
            reset()
        }
    };

    const handleDelete = () => {
        deleteEmployee();
        if (onDelete) {
            onDelete(employee.id!)
        }
    }

    const updateEmployee = (dto: EmployeeReqDTO) => {
        axios.put(`${API_URL}/Employee/${employee.id}`, dto, { headers: { Authorization: `Bearer ${getToken()}` } }).then(
            res => {
                onUpdate(res.data)
                toast.success("Saved successfully")
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
    }

    const deleteEmployee = () => {
        axios.delete(`${API_URL}/Employee/${employee.id}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(
            res => {
                toast.success("Deleted successfully")
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
    }

    const addEmployee = (dto: Employee) => {
        axios.post(`${API_URL}/Employee/`, dto, { headers: { Authorization: `Bearer ${getToken()}` } }).then(
            res => {
                if (onAdd) {
                    onAdd(res.data)
                }
                toast.success("Saved successfully")
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
    }

    const handleArUpdate = (newList: AccessRight[]) => {
        const updatedEmployee = employee;
        updatedEmployee.accessRights = newList;
        setValue('accessRights', newList)
        onUpdate(updatedEmployee);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => <TextField fullWidth {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Name" required />}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => <TextField fullWidth {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Last Name" required />}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="usermame"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => <TextField fullWidth {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Username" required />}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextField fullWidth {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Email" type="email" required />
                        )}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState }) => (
                            <TextField fullWidth {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Password(fill in if you wnat to change it)" type="password" />
                        )}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue={Role.EMPLOYEE}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth disabled>
                                <InputLabel>Role</InputLabel>
                                <Select {...field} error={!!fieldState.error}>
                                    <MenuItem value={Role.ADMIN}>Admin</MenuItem>
                                    <MenuItem value={Role.EMPLOYEE}>Employee</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />
                </Grid>
            </Grid>
            {(employee.role !== Role.ADMIN) && (< AccessRightCrudTable accessRights={employee.accessRights} handleUpdate={handleArUpdate}></AccessRightCrudTable>)}
            <Box
                sx={
                    {
                        display: 'flex',
                        justifyContent: isSmallerScreen ? 'start' : 'start',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingTop: 3,
                        gap: 1,
                        flexWrap: isSmallerScreen ? 'wrap' : 0
                    }}
            >
                <Button type="submit" variant="contained" color="primary" >
                    Save
                </Button>
                {onCancel && (<Button
                    variant="outlined"
                    onClick={onCancel}
                >
                    Cancel
                </Button>)}
                {(employee.role !== Role.ADMIN && employee.id !== null) &&
                    (<Button variant="outlined" color="error"
                        onClick={() => { setOpenConfirm(true) }}
                        style={{ marginLeft: 'auto', marginRight: isSmallerScreen ? 'auto' : 0, paddingTop: isSmallerScreen ? 10 : 0 }}
                        endIcon={<PersonRemoveRoundedIcon />}
                    >
                        Remove Employee
                    </Button>)}
                <ConfirmDialog
                    onConfirm={handleDelete}
                    open={openConfirm}
                    setOpen={setOpenConfirm}
                    title='Delete worker?'
                >
                    <h3>Are you shure about that? This acction can not be undone.</h3>
                </ConfirmDialog>
            </Box>
        </form >
    );
};

export default EmployeeForm