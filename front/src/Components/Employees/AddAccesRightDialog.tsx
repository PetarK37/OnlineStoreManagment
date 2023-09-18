import React, { useState } from 'react'
import { AccessRight, EPermision, ObjectName } from '../../constants';
import {
    Button, FormControl, Grid, InputLabel, MenuItem, Select, FormControlLabel, useMediaQuery, Dialog,
    DialogActions, DialogContent, Switch, DialogTitle,
} from '@mui/material';
import { SelectChangeEvent } from "@mui/material";


export interface AddDialogProps {
    openDialog: boolean;
    onClose: () => void;
    onSave: (ar: AccessRight) => void;
    usedRights: AccessRight[];
}

const AddAccesRightDialog: React.FC<AddDialogProps> = ({ openDialog, onClose, onSave, usedRights }) => {

    const usedObjects = usedRights!.map(ar => ar.objectName)
    const [objectName, setObjectName] = useState(ObjectName.INVENTORY)
    const [isReadOnly, setIsReadOnly] = useState(true)


    const onSubmit = () => {
        const newAr: AccessRight = {
            objectName: objectName,
            permissions: [{ type: EPermision.READ }]
        }

        if (!isReadOnly) {
            newAr.permissions = [...newAr.permissions, { type: EPermision.WRITE }]
        }
        onSave(newAr)
        setObjectName(ObjectName.INVENTORY)
        setIsReadOnly(true)
    };

    const handleObjectNameChange = (event: SelectChangeEvent) => {
        setObjectName(event.target.value as ObjectName);
    };

    const handleIsReadOnlyChange = () => {
        setIsReadOnly(!isReadOnly);
    };

    return (
        <Dialog open={openDialog} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Add new AccessRight</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} padding={1}>
                    <Grid item xs={6} >
                        <FormControl fullWidth >
                            <InputLabel >Role</InputLabel>
                            <Select value={objectName} onChange={handleObjectNameChange} >
                                {!usedObjects.includes(ObjectName.ALL) && (<MenuItem value={ObjectName.ALL}>All</MenuItem>)}
                                {!usedObjects.includes(ObjectName.ANYLITICS) && (<MenuItem value={ObjectName.ANYLITICS}>Anylitics</MenuItem>)}
                                {!usedObjects.includes(ObjectName.CATEGORY) && (<MenuItem value={ObjectName.CATEGORY}>Categories</MenuItem>)}
                                {!usedObjects.includes(ObjectName.CUSTOMER_ORDER) && (<MenuItem value={ObjectName.CUSTOMER_ORDER}>Customer orders</MenuItem>)}
                                {!usedObjects.includes(ObjectName.INVENTORY) && (<MenuItem value={ObjectName.INVENTORY}>Inventory</MenuItem>)}
                                {!usedObjects.includes(ObjectName.PROMO_CODE) && (<MenuItem value={ObjectName.PROMO_CODE}>Promo codes</MenuItem>)}
                                {!usedObjects.includes(ObjectName.SUPPLIER_ORDER) && (<MenuItem value={ObjectName.SUPPLIER_ORDER}>Supplier orders</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            value="isReadOnly"
                            control={<Switch size='medium' defaultChecked={true} color="primary" onChange={handleIsReadOnlyChange} />}
                            label="Is Read Only?"
                            labelPlacement="end"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onSubmit}>
                    Save
                </Button>
                <Button
                    form={'arForm'}
                    variant="outlined"
                    onClick={onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default AddAccesRightDialog