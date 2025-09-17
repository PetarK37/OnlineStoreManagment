import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField, Button, Table, TableBody,
    TableCell, TableHead, TableRow,
} from '@mui/material';
import { InputLabel, Select, MenuItem } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Container, useMediaQuery, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { isSmallerScreenSetting, API_URL, PromoCode, ObjectName, EPermision, ApiError, PromoCodeDTO, Category } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import moment, { min } from 'moment';
import ConfirmDialog from '../Modal/ConfirmDialog';
import Chip from '@mui/material/Chip';



function PromoCodePage() {

    const [promoCodeToDelete, setPromoCodeToDelete] = useState<PromoCode | null>();
    const [categories, setCategories] = useState<Category[]>([])
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])
    const { control, handleSubmit, setValue, reset } = useForm<PromoCodeDTO>();
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);



    useEffect(() => {
        getPromoCodes().then(res => {
            setPromoCodes(res)
        })
        getCategories().then(res => {
            setCategories(res)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })

    }, [setValue]);

    const onSubmit = (data: PromoCodeDTO) => {
        data.code = data.code.replace(/\s+/g, '_')
        savePromoCode(data).then(res => {
            setPromoCodes([...promoCodes, res])
            reset()
            toast.success("Added successfully")
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0)[0]);
            }
        })
    };

    const getCategories = async (): Promise<Category[]> => {
        const response = await axios.get(`${API_URL}/Category`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const savePromoCode = async (dto: PromoCodeDTO): Promise<PromoCode> => {
        const response = await axios.post(`${API_URL}/DiscountCode`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const getPromoCodes = async (): Promise<PromoCode[]> => {
        const response = await axios.get(`${API_URL}/DiscountCode`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const deletePromoCode = (code: PromoCode) => {
        axios.delete(`${API_URL}/DiscountCode/${code.id}`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(res => {
            const newCodes = promoCodes.filter(c => c.id !== code.id)
            setPromoCodes(newCodes)
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })
    }

    const validateDate = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds
        return date >= today;
    };


    return (
        <>
            <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Promo codes:</Typography>
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
            <AuthorizationDisplayWrapper requiredObjectName={ObjectName.PROMO_CODE} requiredPermission={EPermision.WRITE}>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                name="code"
                                rules={{
                                    required: true,
                                    minLength: 3 || 'Code needs to be at least 3chars'
                                }}
                                control={control}
                                defaultValue=""
                                render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message} {...field} label="Code" required />}
                            />
                            <Controller
                                name="validFrom"
                                rules={{
                                    required: true,
                                    validate: value => validateDate(new Date(value)) || 'Date should not be in the past'
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
                                    validate: value => validateDate(new Date(value)) || 'Date should not be in the past'
                                }}
                                control={control}
                                defaultValue={new Date()}
                                render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message}{...field} label="Valid To" type="date" required InputLabelProps={{ shrink: true }} />}
                            />
                            <Controller
                                name="discount"
                                control={control}
                                defaultValue={0}
                                rules={{
                                    required: true,
                                    min: { value: 1, message: 'Discount should be greater than zero' }
                                }}
                                render={({ field, fieldState }) => <TextField error={!!fieldState.error}
                                    helperText={fieldState.error?.message} {...field} label="Discount in %" type="number" required />}
                            />
                            <InputLabel id="demo-multiple-chip-label">Categories:</InputLabel>
                            <Controller
                                name="categories"
                                control={control}
                                defaultValue={[]}
                                rules={{
                                    required: true,
                                    minLength: { value: 1, message: 'You need to add at least one category' }
                                }}
                                render={({ field, fieldState }) => (
                                    <Select
                                        {...field}
                                        error={!!fieldState.error}
                                        labelId="categories-label"
                                        multiple
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((id) => {
                                                    const category = categories.find(cat => cat.id === id);
                                                    return category ? <Chip key={id} label={category.name} /> : null;
                                                })}
                                            </Box>)}
                                    >
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <Button variant="contained" size='medium' endIcon={<AddIcon />} type='submit' sx={!isSmallerScreen ? { ml: 'auto' } : {}}>
                                Add
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </AuthorizationDisplayWrapper>
            <Box sx={{ overflow: "auto", mt: 5 }}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >Code:</TableCell>
                                <TableCell >Valid From:</TableCell>
                                <TableCell >Valid To:</TableCell>
                                <TableCell >Categories included:</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {promoCodes.map((code, index) => (
                                <TableRow key={code.id}>
                                    <TableCell>{code.code}</TableCell>
                                    <TableCell>{moment(code.validFrom).format('MMMM D, YYYY')}</TableCell>
                                    <TableCell>{moment(code.validTo).format('MMMM D, YYYY')}</TableCell>
                                    <TableCell>{code.categories.map((c, index) => (
                                        <span key={c.name}> {c.name}, </span>)
                                    )}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => setPromoCodeToDelete(code)}
                                            endIcon={<DeleteOutlineRoundedIcon />}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                    <ConfirmDialog
                                        onConfirm={() => {
                                            if (promoCodeToDelete) {
                                                deletePromoCode(promoCodeToDelete);
                                                setPromoCodeToDelete(null); // Reset after deletion
                                            }
                                        }}
                                        open={promoCodeToDelete === code}
                                        setOpen={() => setPromoCodeToDelete(null)}
                                        title='Delete promo code?'
                                    >
                                        <h3>Are you sure about that? This acction can not be undone.</h3>
                                    </ConfirmDialog>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default PromoCodePage