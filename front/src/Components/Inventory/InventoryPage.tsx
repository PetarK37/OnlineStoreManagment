import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp, GridRenderCellParams, GridCellParams } from '@mui/x-data-grid';
import {
    FormControl, Grid, InputLabel, FormControlLabel, Dialog,
    DialogActions, DialogContent, Switch, DialogTitle, TextField,
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box/Box';
import { useMediaQuery, Typography, Button } from '@mui/material';
import { Price, Category, ApiError, API_URL, Item, Store, isSmallerScreenSetting, ItemDTO, ObjectName, EPermision, PromoCodeDTO } from '../../constants';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import AddIcon from '@mui/icons-material/Add';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';
import { Controller, useForm } from 'react-hook-form';


function InventoryPage() {
    const [gridData, setGridData] = useState<Item[]>([]);
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    const [categories, setCategories] = useState<Category[]>([])
    const { getToken, hasPermission, getLoggedIn } = useAuthToken();
    const [openDialogId, setOpenDialogId] = useState<string | null>(null)


    useEffect(() => {
        getCategories().then(res => {
            setCategories(res)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

        getStore().then(res => {
            setGridData(res.inventory)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

    }, []);


    const getStore = async (): Promise<Store> => {
        const response = await axios.get(`${API_URL}/Store`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }


    const getCategories = async (): Promise<Category[]> => {
        const response = await axios.get(`${API_URL}/Category`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }


    const handleCategoryChange = (itemId: string, newCategoryId: string) => {
        const updatedData = gridData.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    categoryId: newCategoryId,
                    category: categories.find(cat => cat.id === newCategoryId) || item.category
                };
            }
            return item;
        });
        setGridData(updatedData);
    };

    const handleCellChangeCommitted = React.useCallback(
        async (params: any) => {
            const { id, name, categoryId, icon, description } = params;

            const dto: ItemDTO = {
                name: name,
                categoryId: categoryId,
                icon: icon,
                description: description
            };
            updateItem(dto, id).then(res => {
                toast.success("Updated successfully")
            }).catch(err => {
                if (err.response!.data.Detail) {
                    toast.error(err.response!.data.Detail);
                } else {
                    console.log(err)
                    toast.error(err.response.data.errors.get(0)[0]);
                }
            })
            return params
        }, [])

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        console.log(error)
        toast.error(error.message);
    }, []);

    const updateItem = async (dto: ItemDTO, id: string): Promise<Item> => {
        const response = await axios.put(`${API_URL}/Item/${id}`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }
    const handlePriceSave = (item: Item) => {
        const newList = gridData.map((i, index) => {
            if (i.id === item.id) {
                return item
            }
            return i
        })
        setGridData(newList);
        setOpenDialogId(null);
    }

    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 150, editable: false },
        {
            field: 'icon',
            headerName: 'Icon',
            width: 150,
            filterable: false,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <img src={params.value as string} alt="Item Icon" style={{ width: '50px', height: 'auto' }} />
            )
        },
        { field: 'inStock', headerName: 'In Stock', width: 120, editable: false, type: 'boolean', filterable: false },
        { field: 'itemNum', headerName: 'Item Number', width: 150, editable: false },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'description', headerName: 'Description', width: 250, editable: true, hideable: true },
        { field: 'count', headerName: 'Count', width: 120, editable: false, type: 'number' },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Select
                    value={params.row.categoryId}
                    onChange={(event) => handleCategoryChange(params.row.id, event.target.value as string)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            )
        },
        {
            field: 'latestPrice',
            headerName: 'Current Price',
            width: 300,
            editable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: isSmallerScreen ? 'column' : 'row',
                        gap: !isSmallerScreen ? 10 : 2
                    }}
                    key={params.id}>
                    <Typography variant='body1' >{getLastestPrice(params).value} RSD </Typography>
                    <AuthorizationDisplayWrapper requiredObjectName={ObjectName.INVENTORY} requiredPermission={EPermision.WRITE}>

                        <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDialogId(params.id.toString())}>
                            Add New
                        </Button>
                        <PriceDialog id={params.id.toString()} lastPriceValidDate={getLastestPrice(params).validTo} onClose={() => setOpenDialogId(null)} key={params.id} openDialog={openDialogId === params.id.toString()} onSave={handlePriceSave}></PriceDialog>
                    </AuthorizationDisplayWrapper>
                </Box >)
        }
    ];

    const unathColumns: GridColDef[] = [
        // { field: 'id', headerName: 'ID', width: 150, editable: false },
        {
            field: 'icon',
            headerName: 'Icon',
            width: 150,
            filterable: false,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <img src={params.value as string} alt="Item Icon" style={{ width: '50px', height: 'auto' }} />
            )
        },
        { field: 'inStock', headerName: 'In Stock', width: 120, editable: false, type: 'boolean', filterable: false },
        { field: 'itemNum', headerName: 'Item Number', width: 150, editable: false },
        { field: 'name', headerName: 'Name', width: 150, editable: false },
        { field: 'description', headerName: 'Description', width: 250, editable: false, hideable: true },
        { field: 'count', headerName: 'Count', width: 120, editable: false, type: 'number' },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <Select
                    value={params.row.categoryId}
                    onChange={(event) => handleCategoryChange(params.row.id, event.target.value as string)}
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            )
        },
        {
            field: 'latestPrice',
            headerName: 'Current Price',
            width: 300,
            editable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box sx={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: isSmallerScreen ? 'column' : 'row',
                        gap: !isSmallerScreen ? 10 : 2
                    }}
                    key={params.id}>
                    <Typography variant='body1' >{getLastestPrice(params).value} RSD </Typography>
                    <AuthorizationDisplayWrapper requiredObjectName={ObjectName.INVENTORY} requiredPermission={EPermision.WRITE}>

                        <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpenDialogId(params.id.toString())}>
                            Add New
                        </Button>
                        <PriceDialog id={params.id.toString()} lastPriceValidDate={getLastestPrice(params).validTo} onClose={() => setOpenDialogId(null)} key={params.id} openDialog={openDialogId === params.id.toString()} onSave={handlePriceSave}></PriceDialog>
                    </AuthorizationDisplayWrapper>
                </Box >)
        }
    ];

    const getLastestPrice = (params: GridRenderCellParams): Price => {
        {
            const prices: Price[] = params.row.prices;
            const today = new Date();
            today.setHours(0, 0, 0, 0)

            let price = { validFrom: new Date(), validTo: new Date(), value: 0 }
            for (let i = 0; i < prices.length; i++) {
                const p = prices[i]
                if (new Date(p.validTo) > today && new Date(p.validFrom) <= today) {
                    price = p
                }
            }
            return price
        }
    }

    if (hasPermission(ObjectName.INVENTORY, EPermision.WRITE)) {
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
                    <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Inventory:</Typography>
                </Box>
                <div style={{ minHeight: '500px', width: '100%' }}>
                    <DataGrid
                        rows={gridData}
                        columns={columns}
                        loading={gridData.length === 0}
                        processRowUpdate={handleCellChangeCommitted}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        editMode='row'
                    />
                </div>
            </>
        )
    } else {
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
                    <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Inventory:</Typography>
                </Box>
                <div style={{ height: '650px', width: '100%' }}>
                    <DataGrid
                        rows={gridData}
                        columns={unathColumns}
                        loading={gridData.length === 0}
                        processRowUpdate={handleCellChangeCommitted}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        editMode='row'
                    />
                </div>
            </>
        )
    }

}

export default InventoryPage

interface PriceDialogProps {
    id: string,
    openDialog: boolean;
    onClose: () => void;
    onSave: (item: Item) => void;
    lastPriceValidDate: Date
}


const PriceDialog: React.FC<PriceDialogProps> = ({ openDialog, onClose, onSave, lastPriceValidDate, id }) => {

    const { control, handleSubmit, setValue, formState, getValues, reset } = useForm<Price>();
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);

    const validateDateFrom = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds
        return date >= today;
    };

    const validateDateTo = (date: Date) => {
        return date >= new Date(getValues('validFrom'));
    };

    const onSubmit = (data: Price) => {
        savePrice(data).then(res => {
            reset()
            onSave(res)
            toast.success("Added successfully")
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0)[0]);
            }
        })
    }
    const savePrice = async (dto: Price): Promise<Item> => {
        const response = await axios.put(`${API_URL}/Price/${id}`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    return (
        <Dialog open={openDialog} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle sx={{ padding: 3 }}>Add new price</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <FormControl fullWidth >
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
                                    name="validFrom"
                                    rules={{
                                        required: true,
                                        validate: value => validateDateFrom(new Date(value)) || 'Start Date can not be in the past'
                                    }}
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message} {...field} label="Valid From" type="date" required InputLabelProps={{ shrink: true }} />}
                                />
                                <Controller
                                    name="validTo"
                                    rules={{
                                        required: true,
                                        validate: value => validateDateTo(new Date(value)) || 'End Date can not be before start'

                                    }}
                                    control={control}
                                    defaultValue={new Date()}
                                    render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message}{...field} label="Valid To" type="date" required InputLabelProps={{ shrink: true }} />}
                                />
                                <Controller
                                    name="value"
                                    control={control}
                                    defaultValue={0}
                                    rules={{
                                        required: true,
                                        min: { value: 1, message: 'Price should be greater than zero' }
                                    }}
                                    render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                        helperText={fieldState.error?.message} {...field} label="Price" type="number" required />}
                                />
                            </Box>
                        </Grid>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type='submit' color="primary">
                        Save
                    </Button>
                    <Button
                        form={'arForm'}
                        variant="outlined"
                        onClick={onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    )
}
