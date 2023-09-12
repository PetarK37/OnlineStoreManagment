import React, { useState } from 'react'
import {
    Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody,
    TableCell, TableHead, TableRow, TextField, Typography, useMediaQuery, Dialog,
    DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { AccessRight, Employee } from '../../constants';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { isSmallerScreenSetting } from '../../constants';
import AddAccesRightDialog from './AddAccesRightDialog';


interface AccessRightCrudTableProps {
    accessRights: AccessRight[],
    handleUpdate: (list: AccessRight[]) => void
}

const AccessRightCrudTable: React.FC<AccessRightCrudTableProps> = ({ accessRights, handleUpdate }) => {
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [openDialog, setOpenDialog] = useState(false);

    const handleAddAccessRight = (ar: AccessRight) => {
        const newList = [...accessRights, ar]
        handleUpdate(newList);
        setOpenDialog(false)
    };

    const handleDeleteAccessRight = (i: number) => {
        const newList = accessRights.filter((ar, index) => index !== i)
        handleUpdate(newList);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (<>
        <Box sx={
            {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: isSmallerScreen ? 'column' : 'row',
                paddingTop: 4,
                gap: 1,
            }
        }>
            <Typography variant="h6" gutterBottom>
                Access Rights
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => { setOpenDialog(true) }}
                endIcon={<AddRoundedIcon />}
            >
                Add Access Right
            </Button>
        </Box>

        <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Object Name</TableCell>
                            <TableCell>Permissions</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accessRights.map((accessRight, index) => (
                            <TableRow key={accessRight.id == null ? index : accessRight.id}>
                                <TableCell>{accessRight.objectName}</TableCell>
                                <TableCell>
                                    {accessRight.permissions.map((permission, i) => (
                                        <div key={permission.id == null ? i : permission.id}>{permission.type}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteAccessRight(index)}
                                        endIcon={<DeleteOutlineRoundedIcon />}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
        <AddAccesRightDialog onClose={handleCloseDialog} openDialog={openDialog} onSave={handleAddAccessRight} usedRights={accessRights}></AddAccesRightDialog>
    </>
    )
}

export default AccessRightCrudTable