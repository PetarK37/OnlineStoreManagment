import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, InputAdornment,
    Box, useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import { CustomerOrder, OrderItemDTO, Item, API_URL, Category, ApiError, CustomerOrderDTO, isSmallerScreenSetting } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';



export interface AddDialogProps {
    openDialog: boolean;
    onClose: () => void;
    onSave: (order: CustomerOrder) => void;
}

const CustomerOrderAddModal: React.FC<AddDialogProps> = ({ openDialog, onClose, onSave }) => {

    const { control, handleSubmit, register, reset, getValues } = useForm<CustomerOrderDTO>();
    const [items, setItems] = useState<Item[]>([]);
    const [orderItems, setOrderItems] = useState<OrderItemDTO[]>([]);

    const { getToken } = useAuthToken();
    const [itemNum, setItemNum] = useState<number>(0)
    const [itemCount, setItemCount] = useState<number>(0)
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);

    const filterOne = (id: string): Item => {
        const item = items.find(i => i.id === id)
        return item!
    }

    const onSubmit = (data: CustomerOrderDTO) => {
        if (orderItems.length === 0) {
            toast.error("You must add at least one item")
            return
        }
        data.items = orderItems
        saveOrder(data).then(res => {
            onSave(res)
            close()
            toast.success("Saved successfully")
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0)[0]);
            }
        })
    }

    const saveOrder = async (dto: CustomerOrderDTO): Promise<CustomerOrder> => {
        const response = await axios.post(`${API_URL}/CustomerOrder`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const addItem = () => {
        if (items.find(i => i.itemNum === itemNum)) {
            toast.error("You allready added this")
            return
        }
        getItem(itemNum).then(res => {
            if (res.count < itemCount) {
                toast.error("You do not have enough items in stock")
                return
            }
            setItems([...items, res])
            const item: OrderItemDTO = {
                itemID: res!.id,
                quantity: itemCount
            }
            setOrderItems([...orderItems, item])
            setItemCount(0)
            setItemNum(0)
        }).catch(err => {
            toast.error(err.response.data.Detail)
        })

    }

    const removeItem = (id: string) => {
        const newItems = items.filter(i => i.id !== id)
        const newOrderItems = orderItems.filter(i => i.itemID !== id)
        setItems(newItems)
        setOrderItems(newOrderItems)
    }

    const getItem = async (num: number): Promise<Item> => {
        const response = await axios.get(`${API_URL}/Item/${num}`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const close = () => {
        reset()
        setItemCount(0)
        setItemNum(0)
        setItems([])
        setOrderItems([])
        onClose()
    }

    return (
        <Dialog open={openDialog} onClose={close} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Add new SupplierOrder</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>

                    <Controller
                        name="customerName"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Customer name" fullWidth variant="outlined" margin="normal" required />}
                    />

                    <Controller
                        name="customerEmail"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Customer email" fullWidth variant="outlined" type='email' margin="normal" required />}
                    />

                    <Controller
                        name="shippingAddress"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Shipping address" fullWidth variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} required />}
                    />

                    <Controller
                        name="contactPhone"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Contact phone" fullWidth variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} required />}
                    />

                    <Controller
                        name="promoCode"
                        control={control}
                        defaultValue=""
                        rules={{
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Discount code" fullWidth variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} />}
                    />

                    <Controller
                        name="shippingPrice"
                        control={control}
                        defaultValue={0}
                        rules={{
                            required: true,
                            min: { value: 1, message: 'Price should be greater than zero' }

                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} required
                            helperText={fieldState.error?.message} label="Shipping Price" fullWidth variant="outlined" margin="normal" InputProps={{ endAdornment: <InputAdornment position="end">RSD</InputAdornment> }} />}
                    />
                    <div>
                        <h3>Add items</h3>
                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center',
                                flexDirection: isSmallerScreen ? 'column' : 'row',
                                gap: 2
                            }
                        }>
                            <TextField label="ItemNumber" onChange={(e) => setItemNum(Number(e.target.value))} value={itemNum} />
                            <TextField label="Number of items" type="number" onChange={(e) => setItemCount(Number(e.target.value))} value={itemCount} />
                            <Button variant="contained" size='medium' onClick={addItem} endIcon={<AddIcon />} sx={!isSmallerScreen ? { ml: 'auto' } : {}}>
                                Add
                            </Button>
                        </Box>
                    </div>
                </DialogContent>

                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Count</TableCell>
                            <TableCell>Avelable</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderItems.map((item, index) => (
                            < TableRow key={item!.id} >
                                <TableCell>{filterOne(item.itemID).name}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{filterOne(item.itemID).count}</TableCell>
                                <TableCell>{filterOne(item.itemID).category.name}</TableCell>
                                <TableCell>
                                    <IconButton color='error' onClick={() => { removeItem(item.itemID) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
    );
};

export default CustomerOrderAddModal