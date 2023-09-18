import React, { useState } from 'react'
import { Employee, Role } from '../../constants';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import EmployeeForm from './EmployeeForm';

export interface AddDialogProps {
    openDialog: boolean;
    onClose: () => void;
    onSave: (ar: Employee) => void;
}

const AddEmployeeModal: React.FC<AddDialogProps> = ({ openDialog, onClose, onSave }) => {
    const [employee, setEmployee] = useState<Employee>({
        accessRights: [],
        email: "",
        lastName: "",
        id: null,
        isDeleted: false,
        name: "",
        password: "",
        role: Role.EMPLOYEE,
        usermame: ""
    })

    const handleFormUpdate = (e: Employee) => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            ...e,
        }));
        if (e.id !== null) {
            onClose();
            onSave(e);
            setEmployee((prevEmployee) => ({
                ...prevEmployee,
                ...{
                    accessRights: [],
                    email: "",
                    lastName: "",
                    id: null,
                    isDeleted: false,
                    name: "",
                    password: "",
                    role: Role.EMPLOYEE,
                    usermame: ""
                },
            }));
        }
    }


    return (
        <Dialog open={openDialog} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Add new Employee</DialogTitle>
            <DialogContent>
                <EmployeeForm employee={employee}
                    onUpdate={handleFormUpdate}
                    onAdd={handleFormUpdate}
                    onCancel={onClose}></EmployeeForm>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog >
    )
}

export default AddEmployeeModal