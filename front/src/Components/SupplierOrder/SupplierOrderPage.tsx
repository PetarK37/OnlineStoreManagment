import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Button, Table, TableBody,
    TableCell, TableHead, TableRow,
} from '@mui/material';
import {
    FormControl, Grid, InputLabel, Select, Dialog,
    DialogActions, DialogContent, MenuItem, DialogTitle, TextField,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { useMediaQuery, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { isSmallerScreenSetting, API_URL, PromoCode, ObjectName, EPermision, ApiError, PromoCodeDTO, Category, SupplierOrder, OrderUpdateDTO, OrderStatus } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';
import moment, { min } from 'moment';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SupplierOrderAddModal from './SupplierOrderAddModal';


function SupplierOrderPage() {


    const [orders, setOrders] = useState<SupplierOrder[]>([])
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [openAddDialog, setOpenAddDialog] = useState(false);




    useEffect(() => {

        getOrders().then(res => {
            setOrders(res)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

    }, []);

    const handleUpdate = (order: SupplierOrder) => {
        const newList = orders.map((o, index) => {
            if (o.id === order.id) {
                return order
            }
            return o
        })
        setOrders(newList);
        setOpenDialogId(null);
    }

    const handleAdd = (order: SupplierOrder) => {
        setOrders([...orders, order]);
        setOpenAddDialog(false);
    }

    const getOrders = async (): Promise<SupplierOrder[]> => {
        const response = await axios.get(`${API_URL}/SupplierOrder`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }
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
                <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Supplier orders:</Typography>
                <AuthorizationDisplayWrapper requiredObjectName={ObjectName.SUPPLIER_ORDER} requiredPermission={EPermision.WRITE}>
                    <Button variant="contained" size='large' endIcon={<AddIcon />} sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }} onClick={() => { setOpenAddDialog(true) }}>
                        Add New
                    </Button>
                    <SupplierOrderAddModal onClose={() => setOpenAddDialog(false)} openDialog={openAddDialog} onSave={handleAdd}></SupplierOrderAddModal>
                </AuthorizationDisplayWrapper>
            </Box>

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
            </Box>
            <Box sx={{ overflow: "auto", mt: 5 }}>
                <Box sx={{ width: "120%", display: "table", tableLayout: "fixed" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <AuthorizationDisplayWrapper requiredObjectName={ObjectName.SUPPLIER_ORDER} requiredPermission={EPermision.WRITE}>
                                    <TableCell></TableCell>
                                </AuthorizationDisplayWrapper>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Item link</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Tracking link</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Ordered on</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Dispte date</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Item nmber</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Item price</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Quantity</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Total price</TableCell>
                                <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>Order Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <AuthorizationDisplayWrapper requiredObjectName={ObjectName.SUPPLIER_ORDER} requiredPermission={EPermision.WRITE}>
                                            {order.status === OrderStatus.IN_PROCESS && (<>
                                                <Button variant="outlined" endIcon={<EditRoundedIcon />} onClick={() => setOpenDialogId(order.id)}>
                                                    Update
                                                </Button>
                                                <UpdateDialog order={order} onClose={() => setOpenDialogId(null)} key={order.id} openDialog={openDialogId === order.id} onSave={handleUpdate}></UpdateDialog>
                                            </>
                                            )}
                                        </AuthorizationDisplayWrapper>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}> <Box component="div" width={250} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                        <a href={order.itemLink}>{order.itemLink}</a>
                                    </Box></TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}> <Box component="div" width={250} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                        <a href={order.trackingLink}>{order.trackingLink}</a>
                                    </Box></TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{moment(order.orderDate).format('MMMM D, YYYY')}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{moment(order.disputeDate).format('MMMM D, YYYY')}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{order.item.itemNum}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{order.itemPrice}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{order.quantity}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{order.totalPrice}</TableCell>
                                    <TableCell sx={{ fontSize: '1.1rem' }} style={{ whiteSpace: 'nowrap', overflow: 'visible' }}>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>

            </Box >
        </>)
}

export default SupplierOrderPage

interface UpdateDialogProps {
    order: SupplierOrder,
    openDialog: boolean;
    onClose: () => void;
    onSave: (item: SupplierOrder) => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = ({ openDialog, onClose, onSave, order }) => {

    const { control, handleSubmit, setValue, formState, getValues, reset } = useForm<OrderUpdateDTO>();
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);


    const onSubmit = (data: OrderUpdateDTO) => {
        updateOrder(data).then(res => {
            reset()
            onSave(res)
            toast.success("Updated successfully")
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0)[0]);
            }
        })
    }

    const updateOrder = async (dto: OrderUpdateDTO): Promise<SupplierOrder> => {
        const response = await axios.put(`${API_URL}/SupplierOrder/${order.id}`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
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
                                defaultValue={order.status}
                                rules={{
                                    required: true,
                                }}
                                render={({ field, fieldState }) => (
                                    <Select
                                        label="Status"
                                        id="status"
                                        fullWidth
                                        {...field}
                                        required
                                        error={!!fieldState.error}
                                    >
                                        <MenuItem value={OrderStatus.CANCELED} selected={order.status === OrderStatus.CANCELED}>{OrderStatus.CANCELED}</MenuItem>
                                        <MenuItem value={OrderStatus.IN_PROCESS} selected={order.status === OrderStatus.IN_PROCESS}>{OrderStatus.IN_PROCESS}</MenuItem>
                                        <MenuItem value={OrderStatus.RECIVED} selected={order.status === OrderStatus.RECIVED}>{OrderStatus.RECIVED}</MenuItem>
                                        <MenuItem value={OrderStatus.RETURNED} selected={order.status === OrderStatus.RETURNED}>{OrderStatus.RETURNED}</MenuItem>
                                    </Select>
                                )}
                            />
                            <Controller
                                name="additionalExpense"
                                control={control}
                                defaultValue={0}
                                rules={{
                                    min: { value: 0, message: 'Additiona expenses should be greater than zero' }
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        {...field}
                                        label="Additional Expense"
                                        type="number"
                                        variant="outlined"
                                        margin="normal"
                                    />
                                )}
                            />
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

