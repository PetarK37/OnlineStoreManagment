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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams, GridCellParams, DataGridProps, GridRowParams, GridRowSelectionCheckboxParams, GridRowSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box/Box';
import { useMediaQuery, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { isSmallerScreenSetting, API_URL, PromoCode, ObjectName, EPermision, ApiError, PromoCodeDTO, Category, SupplierOrder, OrderUpdateDTO, OrderStatus, CustomerOrder } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';
import moment, { min } from 'moment';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditOrderStatusDialog from './EditOrderStatusDialog';
import CustomerOrderAddModal from './CustomerOrderAddModal';


export function CustomerOrderPage() {
    const [orders, setOrders] = useState<CustomerOrder[]>([])
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        setSelectedIds(newSelection.map(id => String(id)));
    };


    const columns: GridColDef[] = [
        { field: 'customerEmail', headerName: 'Email', width: 300, editable: false, type: 'string', filterable: false },
        { field: 'shippingAddress', headerName: 'Shipping address', width: 400, editable: false, type: 'string', filterable: false },
        { field: 'recivedOn', headerName: 'Recived on', width: 200, editable: false, type: 'Date', filterable: true, valueGetter: ({ row }) => moment(row.recivedOn).format('MMMM D, YYYY') },
        // { field: 'updtedOn', headerName: 'Updated on', width: 120, editable: false, type: 'Date', filterable: true },
        { field: 'totalPrice', headerName: 'Total price(RSD)', width: 200, editable: false, type: 'number', filterable: true },
        { field: 'status', headerName: 'Order Status', width: 200, editable: false, type: 'string', filterable: true },
    ]

    useEffect(() => {
        getOrders().then(res => {
            setOrders(res)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

    }, []);
    
    const getOrders = async (): Promise<CustomerOrder[]> => {
        const response = await axios.get(`${API_URL}/CustomerOrder`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }
    
    const handleAdd = (order: CustomerOrder) => {
        setOrders([...orders, order]);
        setOpenAddDialog(false);
    }
    const handleRowClick = (param: GridRowParams) => {
        setSelectedOrder(param.row);
    };

    const updateOrders = (order: CustomerOrder) => {
        const newList = orders.map((o, index) => {
            if (o.id === order.id) {
                return order
            }
            return o
        })
        setOrders(newList);
        setSelectedOrder(null)
    }

    const handlePrintClick = async () => {
        try {
            const response = await axios.post(`${API_URL}/CustomerOrder/Labels`, selectedIds, { headers: { Authorization: `Bearer ${getToken()}` }, responseType: 'blob' })
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.target = '_blank';
            link.click();
        } catch (error) {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        }
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
                <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Customer orders:</Typography>
                <AuthorizationDisplayWrapper requiredObjectName={ObjectName.CUSTOMER_ORDER} requiredPermission={EPermision.WRITE}>
                    <Button variant="contained" size='large' endIcon={<AddIcon />} sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }} onClick={() => { setOpenAddDialog(true) }}>
                        Add New
                    </Button>
                    <CustomerOrderAddModal onClose={() => setOpenAddDialog(false)} openDialog={openAddDialog} onSave={handleAdd}></CustomerOrderAddModal>
                </AuthorizationDisplayWrapper>
            </Box>
            {selectedOrder && (<DetailPanelContent row={selectedOrder} onUpdate={updateOrders} />)}
            <div style={{ height: '650px', width: '100%' }}>
                <AuthorizationDisplayWrapper requiredObjectName={ObjectName.CUSTOMER_ORDER} requiredPermission={EPermision.WRITE}>
                    {selectedIds.length > 0 && (<Button onClick={handlePrintClick} variant="contained" color="primary" sx={{ mb: 5 }}>
                        Print Labels
                    </Button>)}
                </AuthorizationDisplayWrapper>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    loading={orders.length === 0}
                    rowThreshold={0}
                    onRowClick={handleRowClick}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionChange}
                    isRowSelectable={(params) => params.row.status === OrderStatus.IN_PROCESS}
                />
            </div>
        </>
    )
}

function DetailPanelContent({ row: rowProp, onUpdate }: { row: CustomerOrder, onUpdate: (o: CustomerOrder) => void }) {
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)

    const update = (o: CustomerOrder) => {
        setOpenDialogId(null)
        onUpdate(o)
    }
    return (
        <Stack
            sx={{ pb: 2, height: '100%' }}
            direction="column"
        >
            <Paper sx={{ flex: 1, mx: 'auto', width: '90%', p: 1 }}>
                <Stack direction="column" spacing={1} sx={{ height: 1 }}>
                    <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: isSmallerScreen ? 'column' : 'row',
                            paddingBottom: 3,
                            gap: 1
                        }
                    }>

                        <Typography variant="h6">{`Order - ${rowProp.id}`}</Typography>
                        {rowProp.status !== OrderStatus.RECIVED && rowProp.status !== OrderStatus.CANCELED && rowProp.status !== OrderStatus.RETURNED && (<>
                            <Button variant="outlined" endIcon={<EditRoundedIcon />} onClick={() => setOpenDialogId(rowProp.id)}>
                                Update Status
                            </Button>
                            <EditOrderStatusDialog order={rowProp} onClose={() => setOpenDialogId(null)} key={rowProp.id} openDialog={openDialogId === rowProp.id} onSave={update}></EditOrderStatusDialog>
                        </>
                        )}
                    </Box>
                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant="body2" color="textSecondary">
                                Customer information
                            </Typography>
                            <Typography variant="body1">{rowProp.customerName}</Typography>
                            <Typography variant="body1">{rowProp.customerEmail}</Typography>
                            <Typography variant="body1">{rowProp.contactPhone}</Typography>

                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body2" align="right" color="textSecondary">
                                Shipping address
                            </Typography>
                            <Typography variant="body1" align="right">
                                {rowProp.shippingAddress}
                            </Typography>
                        </Grid>
                        <Grid item sx={{ pt: 2 }} md={6}>
                            <Typography variant="body2" align="left" color="textSecondary">
                                Tracking code
                            </Typography>
                            <Typography variant="body1" align="left">
                                {rowProp.trackingCode}
                            </Typography>
                        </Grid>
                        <Grid item md={6}>
                            <Typography variant="body2" align="right" color="textSecondary">
                                Updated on
                            </Typography>
                            <Typography variant="body1" align="right">
                                {moment(rowProp.updatedOn).format('MMMM D, YYYY')}
                            </Typography>
                        </Grid>
                    </Grid>
                    <DataGrid
                        density="compact"
                        columns={[
                            { field: 'name', headerName: 'Product', width: 300, type: 'string', valueGetter: ({ row }) => row.item.name },
                            {
                                field: 'quantity',
                                headerName: 'Quantity',
                                align: 'center',
                                type: 'number',
                                width: 150,
                            },
                            { field: 'unitPrice', headerName: 'Unit Price', width: 200, type: 'number', valueGetter: ({ row }) => row.price! },
                            {
                                field: 'total',
                                headerName: 'Total',
                                type: 'number',
                                width: 150,
                                valueGetter: ({ row }) => row.quantity * row.price!,
                            },
                            {
                                field: 'shippingPrice', headerName: 'Shipping price(RSD)', width: 200, type: 'number', valueGetter: ({ row }) => rowProp.shippingPrice!
                            },
                        ]}
                        rows={rowProp.items}
                        hideFooter
                    />
                </Stack>
            </Paper>
        </Stack>
    );
}



export default CustomerOrderPage