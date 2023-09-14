import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField, Button, Table, TableBody,
    TableCell, TableHead, TableRow,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Container, useMediaQuery, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { isSmallerScreenSetting, API_URL, Category, ObjectName, EPermision, ApiError } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import AuthorizationDisplayWrapper from '../Authorization/AuthorizationDisplayWrapper';


function CategoryAddPage() {

    const [categories, setCategories] = useState<Category[]>([])
    const { control, handleSubmit, setValue, formState, reset } = useForm<Category>();
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);


    useEffect(() => {
        try {
            getCategories().then(res => {
                setCategories(res)
            })
        } catch (error) {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        }

    }, [setValue]);

    const onSubmit = (data: Category) => {
        if (categories.some(c => c.name === data.name)) {
            toast.error("Category name must be unique")
            return
        }
        try {
            saveCategory(data).then(res => {
                setCategories([...categories, res])
                toast.success("Added successfully")
            })
        } catch (error) {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        }
    };

    const saveCategory = async (dto: Category): Promise<Category> => {
        const response = await axios.post(`${API_URL}/Category`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const getCategories = async (): Promise<Category[]> => {
        const response = await axios.get(`${API_URL}/Category`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    return (
        <Container sx={{ padding: isSmallerScreen ? 1.5 : 5 }}>
            <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Categories:</Typography>
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
            <AuthorizationDisplayWrapper requiredObjectName={ObjectName.CATEGORY} requiredPermission={EPermision.WRITE}>
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
                                name="name"
                                control={control}
                                defaultValue=""
                                rules={{ required: true }}
                                render={({ field }) => <TextField {...field} label="Category Name" sx={{ minWidth: '80%' }} required />}
                            />
                            <Button variant="contained" size='large' endIcon={<AddIcon />} type='submit' sx={!isSmallerScreen ? { ml: 'auto' } : {}}>
                                Add New
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
                                <TableCell sx={{ fontSize: '1.5rem' }} >Category name:</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={category.id == null ? index : category.id}>
                                    <TableCell sx={{ fontSize: '1.2rem' }}>{category.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </Box>
        </Container >
    )
}

export default CategoryAddPage