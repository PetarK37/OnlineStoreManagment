import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Paper, useMediaQuery, Box, Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { API_URL, Item, ItemSalesData, isSmallerScreenSetting } from '../../constants';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface FormInput {
    itemNum: string;
    months: number;
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function ItemAnyliticsPage() {
    const { control, handleSubmit } = useForm<FormInput>();
    const [salesData, setSalesData] = useState<ItemSalesData | null>(null);
    const { getToken } = useAuthToken();
    const [labels, setLabels] = useState<any>([])
    const [datasets, setDatasets] = useState<any>([])

    const [item, setItem] = useState<Item | null>(null)
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    Chart.register(CategoryScale);


    const onSubmit = async (data: FormInput) => {
        getItem(Number(data.itemNum)).then(item => {
            setItem(item)
            getData(item.id, data.months).then(response => {
                setSalesData(response)
                const ds = {
                    label: item?.name,
                    data: response.monthlySalesData.map(m => m.totalSold),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                }
                setDatasets([ds])
                setLabels(response.monthlySalesData.map(data => monthNames[data.month - 1]))
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
        }).catch(err => {
            toast.error(err.response.data.Detail)
        })
    };

    const getItem = async (num: number) => {
        const response = await axios.get(`${API_URL}/Item/${num}`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const getData = async (id: string, months: number): Promise<ItemSalesData> => {
        const response = await axios.get(`${API_URL}/Anylitics/${id}`, {
            params: { months: months }, headers: { Authorization: `Bearer ${getToken()}` }
        })
        return response.data
    }

    // const labels = salesData ?  : [];

    // const datasets = salesData ?  : [];

    const chartData = {
        labels: labels,
        datasets: datasets
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item sm={12} xs={12}>
                    <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'stretch',
                            flexDirection: isSmallerScreen ? 'column' : 'row',
                            paddingBottom: 3,
                            gap: 2
                        }
                    }>
                        <Typography variant={isSmallerScreen ? 'h5' : 'h4'} alignSelf={"center"}>Sales per item:</Typography>
                        <Controller
                            name="itemNum"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Item number"
                                    {...field}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />)}
                        />
                        <Controller
                            name="months"
                            control={control}
                            rules={{
                                required: true,
                                max: 12 || 'You can only see data up to an year'
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="Months"
                                    {...field}
                                    type='number'
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />)}
                        />

                        <Button type="submit" variant="contained" color="primary" endIcon={<SearchRoundedIcon></SearchRoundedIcon>}>Search</Button>
                    </Box>
                </Grid>
            </form>
            <Paper style={{ marginTop: '20px', padding: '20px', height: '500px' }}>
                {salesData && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}
            </Paper>
        </div >
    )
}

export default ItemAnyliticsPage