import React, { useState, useEffect } from 'react'
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { Employee, Role } from '../../constants';
import { Container, useMediaQuery } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import axios from 'axios';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';
import { isSmallerScreenSetting } from '../../constants';
import EmployeeForm from './EmployeeForm';
import AddEmployeeModal from './AddEmployeeModal';

function EmployeePage() {

    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenAddDialog(false);
    };

    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        getEmployees();
    }, [])

    const getEmployees = (): Employee[] => {
        axios.get(`${API_URL}/Employee`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(
            res => {
                setEmployees(res.data)
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
        return []
    }

    const handleUpdate = (employee: Employee) => {
        const newList = employees.map((e, index) => {
            if (e.id === employee.id) {
                return employee
            }
            return e
        })
        setEmployees(newList);
    }

    const handleSave = (employee: Employee) => {
        setEmployees((prevEmployees) => [...prevEmployees, employee]);
    }

    const handleDelete = (id: string) => {
        setEmployees((prevEmployees) =>
            prevEmployees.filter((e) => e.id !== id)
        );
    };

    return (
        <>
            <Box sx={
                {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: isSmallerScreen ? 'column' : 'row',
                    paddingBottom: 3,
                    gap: 1
                }
            }>
                <Typography variant='h2' align="center" sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }}>Employees:</Typography>
                <Button variant="contained" size='large' endIcon={<PersonAddAlt1RoundedIcon />} sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }} onClick={() => { setOpenAddDialog(true) }}>
                    Add New
                </Button>
                <AddEmployeeModal onClose={handleCloseDialog} openDialog={openAddDialog} onSave={handleSave}></AddEmployeeModal>
            </Box>
            {
                employees.map(e => (
                    <Accordion key={e.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography variant='h5'>{e.name}  {e.lastName}
                                {e.role === Role.ADMIN && ('  (Administrator)')}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <EmployeeForm employee={e} onUpdate={handleUpdate} onDelete={handleDelete} onAdd={handleSave}></EmployeeForm>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </>
    )
}

export default EmployeePage