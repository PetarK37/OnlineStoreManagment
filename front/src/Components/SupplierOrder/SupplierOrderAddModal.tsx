import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, InputAdornment, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogTitle, } from '@mui/material';
import { SupplierOrderDTO, ItemDTO, SupplierOrder, Item, API_URL, Category, ApiError } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';


export interface AddDialogProps {
    openDialog: boolean;
    onClose: () => void;
    onSave: (order: SupplierOrder) => void;
}

const SupplierOrderAddModal: React.FC<AddDialogProps> = ({ openDialog, onClose, onSave }) => {

    const { control, handleSubmit, register, reset, getValues } = useForm<SupplierOrderDTO>();
    const [item, setItem] = useState<Item | null>(null);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const { getToken } = useAuthToken();
    const [categories, setCategories] = useState<Category[]>([])


    useEffect(() => {
        getCategories().then(res => {
            setCategories(res)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

    }, []);


    const getCategories = async (): Promise<Category[]> => {
        const response = await axios.get(`${API_URL}/Category`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const onSubmit = (data: SupplierOrderDTO) => {
        if (item === null) { data.itemNum = null }
        if (item === null && (getValues('item.name') === "")) {
            toast.error("You must fill in product data")
            return null
        }
        updateOrder(data).then(res => {
            onSave(res)
            reset()
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

    const updateOrder = async (dto: SupplierOrderDTO): Promise<SupplierOrder> => {
        const response = await axios.post(`${API_URL}/SupplierOrder`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }


    const getItem = (num: number) => {
        axios.get(`${API_URL}/Item/${num}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => {
            alert(res.data.name)
            setItem(res.data)
        }).catch(err => {
            toast.error(err.response.data.Detail)
        })
    }

    const close = () => {
        reset()
        setIsNewProduct(false)
        onClose()
    }

    return (
        <Dialog open={openDialog} onClose={close} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Add new SupplierOrder</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>

                    <Controller
                        name="itemLink"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Product Link" fullWidth variant="outlined" margin="normal" required />}
                    />

                    <Controller
                        name="trackingLink"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Tracking Link" fullWidth variant="outlined" margin="normal" required />}
                    />

                    <Controller
                        name="disputeDate"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Dispute Date" type="date" fullWidth variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} required />}
                    />

                    <Controller
                        name="orderDate"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Order Date" type="date" fullWidth variant="outlined" margin="normal" InputLabelProps={{ shrink: true }} required />}
                    />

                    <Controller
                        name="totalPrice"
                        control={control}
                        defaultValue={1}
                        rules={{
                            required: true,
                            min: { value: 1, message: 'Price should be greater than zero' }
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error} required
                            helperText={fieldState.error?.message} label="Total Price" fullWidth variant="outlined" margin="normal" InputProps={{ endAdornment: <InputAdornment position="end">RSD</InputAdornment> }} />}
                    />

                    <Controller
                        name="itemPrice"
                        control={control}
                        defaultValue={1}
                        rules={{
                            required: true,
                            min: { value: 1, message: 'Price should be greater than zero' }
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Product Price" fullWidth variant="outlined" margin="normal" InputProps={{ endAdornment: <InputAdornment position="end">RSD</InputAdornment> }} required />}
                    />

                    <Controller
                        name="quantity"
                        control={control}
                        defaultValue={1}
                        rules={{
                            required: true,
                            min: { value: 1, message: 'Quantity should be greater than zero' }
                        }}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Quantity" type="number" fullWidth variant="outlined" margin="normal" required />}
                    />

                    {!isNewProduct && (<Controller
                        name="itemNum"
                        control={control}
                        defaultValue={null}
                        render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                            helperText={fieldState.error?.message} label="Existing Product Number" fullWidth variant="outlined" margin="normal"
                            onBlur={() => {
                                if (field.value! > 100000) {
                                    getItem(field.value!)
                                }
                            }} />}
                    />
                    )}
                    {item === null && (<FormControlLabel
                        control={<Checkbox checked={isNewProduct} onChange={() => setIsNewProduct(!isNewProduct)} />}
                        label="Is New Product?"
                    />)}
                    {isNewProduct && (
                        <>
                            <h3>Product Details</h3>

                            <Controller
                                name="item.name"
                                control={control}
                                defaultValue={""}
                                rules={{
                                    minLength: { value: 3, message: 'Product must have some name' }
                                }}
                                render={({ field, fieldState }) => <TextField  {...field} error={!!fieldState.error}
                                    helperText={fieldState.error?.message} {...register("item.name")} label="Product Name" fullWidth variant="outlined" margin="normal" />
                                }
                            />
                            <Controller
                                name="item.description"
                                control={control}
                                defaultValue={""}
                                render={({ field, fieldState }) => <TextField  {...field} error={!!fieldState.error}
                                    helperText={fieldState.error?.message} {...register("item.description")} label="Product Description" fullWidth variant="outlined" margin="normal" />
                                }
                            />
                            <Controller
                                name="item.icon"
                                control={control}
                                defaultValue={""}
                                render={({ field, fieldState }) => <TextField  {...field} error={!!fieldState.error}
                                    helperText={fieldState.error?.message}  {...register("item.icon")} label="Product Icon URL" fullWidth variant="outlined" margin="normal" />
                                }
                            />
                            <Controller
                                name="item.categoryId"
                                control={control}
                                defaultValue={categories[0].id}
                                render={({ field, fieldState }) => <Select  {...field} error={!!fieldState.error}
                                    fullWidth label="Category" placeholder='Category' defaultValue={categories[0].id}>
                                    {categories.map((category, index) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>}
                            />

                        </>
                    )}
                </DialogContent>
                {item !== null && (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={item!.id}>
                                <TableCell>{item!.name}</TableCell>
                                <TableCell>{item!.category.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setItem(null)} color='error'>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>)}
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

export default SupplierOrderAddModal