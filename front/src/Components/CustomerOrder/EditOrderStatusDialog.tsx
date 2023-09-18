import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Button
} from '@mui/material';
import {
    Grid, InputLabel, Select, Dialog,
    DialogActions, DialogContent, MenuItem, DialogTitle, TextField,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { useMediaQuery } from '@mui/material';
import { isSmallerScreenSetting, API_URL, PromoCode, ObjectName, EPermision, ApiError, PromoCodeDTO, Category, SupplierOrder, CustomerUpdateDTO, OrderStatus, CustomerOrder } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';

interface UpdateDialogProps {
    order: CustomerOrder,
    openDialog: boolean;
    onClose: () => void;
    onSave: (item: CustomerOrder) => void;
}

const EditOrderStatusDialog: React.FC<UpdateDialogProps> = ({ openDialog, onClose, onSave, order }) => {

    const { control, handleSubmit, reset } = useForm<CustomerUpdateDTO>();
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);


    const onSubmit = (data: CustomerUpdateDTO) => {
        console.log(data)
        updateOrder(data).then(res => {
            reset()
            onSave(res)
            toast.success("Updated successfully")
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0).get(0));
            }
        })
    }

    const updateOrder = async (dto: CustomerUpdateDTO): Promise<CustomerOrder> => {
        const response = await axios.put(`${API_URL}/CustomerOrder/${order.id}`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const close = () => {
        reset()
        onClose()
    }

    return (
        <Dialog open={openDialog} onClose={close} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Update order info</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Grid item sm={12} xs={12}>
                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                flexDirection: isSmallerScreen ? 'column' : 'row',
                                paddingBottom: 3,
                                gap: 2
                            }
                        }>
                            <Controller
                                name="status"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                defaultValue={order.status}
                                render={({ field, fieldState }) => (

                                    <TextField
                                        select
                                        {...field}
                                        label="Status"
                                        id="status"
                                        fullWidth
                                        required
                                        error={!!fieldState.error}
                                    >
                                        <MenuItem value={OrderStatus.CANCELED} >{OrderStatus.CANCELED}</MenuItem>
                                        {/* {order.status !== OrderStatus.IN_PROCESS && (<MenuItem value={OrderStatus.IN_PROCESS} >{OrderStatus.IN_PROCESS}</MenuItem>)} */}
                                        {order.status === OrderStatus.IN_PROCESS && (<MenuItem value={OrderStatus.SENT} >{OrderStatus.SENT}</MenuItem>)}
                                        <MenuItem value={OrderStatus.RECIVED} >{OrderStatus.RECIVED}</MenuItem>
                                        <MenuItem value={OrderStatus.RETURNED} >{OrderStatus.RETURNED}</MenuItem>
                                    </TextField>
                                )}
                            />
                            {order.status === OrderStatus.IN_PROCESS && (<Controller
                                name="trackingCode"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    minLength: { value: 3, message: 'TrackingCode needs to have some value' }
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field}
                                        label="Tracking code"
                                        variant="outlined"
                                        margin="normal"
                                    />
                                )}
                            />)}
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type='submit' color="primary">
                        Save
                    </Button>
                    <Button
                        form={'arForm'}
                        variant="outlined"
                        onClick={close}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    )
}

export default EditOrderStatusDialog