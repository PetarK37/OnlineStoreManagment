import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button, Paper, useMediaQuery, Box, Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { API_URL, SalesData, isSmallerScreenSetting } from '../../constants';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


interface FormInput {
    from: string;
    to: string;
}


function AnyliticsPage() {
    const { control, handleSubmit } = useForm<FormInput>();
    const [salesData, setSalesData] = useState<SalesData[] | null>(null);
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);
    Chart.register(CategoryScale);


    const onSubmit = async (data: FormInput) => {
        getData(data.from, data.to).then(res => {
            setSalesData(res);
        }).catch(err => {
            if (err.response!.data.Detail) {
                toast.error(err.response!.data.Detail);
            } else {
                console.log(err)
                toast.error(err.response.data.errors.get(0)[0]);
            }
        })
    };

    const getData = async (from: string, to: string): Promise<SalesData[]> => {
        const response = await axios.get(`${API_URL}/Anylitics`, {
            params: {
                from: from,
                to: to
            }, headers: { Authorization: `Bearer ${getToken()}` }
        })
        return response.data
    }

    const chartData = {
        labels: salesData?.map(item => item.itemName),
        datasets: [
            {
                label: 'Total Sold',
                data: salesData?.map(item => item.totalSold),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }
        ]
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
                        <Typography variant={isSmallerScreen ? 'h5' : 'h4'} alignSelf={"center"}>Sales anylitics:</Typography>
                        <Controller
                            name="from"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="From"
                                    type="date"
                                    {...field}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />)}
                        />
                        <Controller
                            name="to"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    label="To"
                                    type="date"
                                    {...field}
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
    );
}

export default AnyliticsPage

