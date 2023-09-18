import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, IconButton, List, ListItem, ListItemText } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Container, useMediaQuery, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { isSmallerScreenSetting, API_URL, StoreDTO, Social, ApiError, Store } from '../../constants';
import axios, { AxiosError } from 'axios';
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { toast } from 'react-toastify';

const errorMessages: Record<string, string> = {
    name: "Name is required.",
    pib: "PIB must be 9 characters long.",
    mb: "MB must be 8 characters long.",
    address: "Address is required.",
    phone: "Phone format is incorrect. It should be in the format 061627361 or +3861627361.",
    email: "Email is required and should be in a valid format.",
    shippingName: "Shipping Name is required.",
};

const StoreEditForm: React.FC = () => {
    const { control, handleSubmit, setValue, formState } = useForm<StoreDTO>();
    const [socialName, setSocialName] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [socials, setSocials] = useState<Social[]>([]);
    const { getToken } = useAuthToken();
    const isSmallerScreen = useMediaQuery(isSmallerScreenSetting);

    const onSubmit = (data: StoreDTO) => {
        data.socials = socials;
        if (!formState.isValid) {
            for (const errorField in formState.errors) {
                if (errorMessages[errorField]) {
                    toast.error(errorMessages[errorField]);
                    return
                }
            }
        }
        updateStore(data).then(
            store => {
                setValue('name', store.name);
                setValue('pib', store.pib);
                setValue('mb', store.mb);
                setValue('address', store.address);
                setValue('phone', store.phone);
                setValue('email', store.email);
                setValue('shippingName', store.shippingName);
                setSocials(store.socials);
                toast.success("Saved successfully")
            }).catch(err => {
                if (err.response!.data.Detail) {
                    toast.error(err.response!.data.Detail);
                } else {
                    console.log(err)
                    toast.error(err.response.data.errors.get(0)[0]);
                }
            })
    };

    const updateStore = async (dto: StoreDTO): Promise<Store> => {
        const response = await axios.put(`${API_URL}/Store`, dto, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    useEffect(() => {
        getStore().then(store => {
            setValue('name', store.name);
            setValue('pib', store.pib);
            setValue('mb', store.mb);
            setValue('address', store.address);
            setValue('phone', store.phone);
            setValue('email', store.email);
            setValue('shippingName', store.shippingName);
            setSocials(store.socials);
        }).catch(error => {
            const err = error as AxiosError<ApiError>
            toast.error(err.response!.data.Detail);
        })
    }, [setValue]);

    const getStore = async (): Promise<Store> => {
        const response = await axios.get(`${API_URL}/Store`, { headers: { Authorization: `Bearer ${getToken()}` } })
        return response.data
    }

    const addSocial = () => {
        if (socialLink !== "" && socialName !== "") {
            const newSocial = {
                name: socialName,
                link: socialLink,
            };
            setSocials(prev => [...prev, newSocial]);
            setSocialName('');
            setSocialLink('');
        }
    };

    const removeSocial = (index: number) => {
        if (socials.length === 1) {
            toast.error("There must be at least one social link")
            return
        }
        setSocials(prev => prev.filter((_, i) => i !== index));
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
                <Typography variant={isSmallerScreen ? 'h4' : 'h2'} align="center">Edit store info:</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Name" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="pib"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, maxLength: 9, minLength: 9 }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="PIB" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="mb"
                            control={control}
                            defaultValue=""
                            rules={{ required: true, maxLength: 8, minLength: 8 }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="MB" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Address" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Phone" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Email" type='email' required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <Controller
                            name="shippingName"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field, fieldState }) => <TextField {...field} error={!!fieldState.error}
                                helperText={fieldState.error?.message} label="Shipping Name" required fullWidth />}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <Box sx={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: isSmallerScreen ? 'column' : 'row',
                                paddingBottom: 3,
                                gap: 2
                            }
                        }>
                            <TextField value={socialName} onChange={(e) => setSocialName(e.target.value)} label="Social Name" fullWidth />
                            <TextField value={socialLink} onChange={(e) => setSocialLink(e.target.value)} label="Social Link" fullWidth />
                            <Button variant="contained" size='large' endIcon={<AddIcon />} onClick={addSocial}>
                                Add
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <List >
                            {socials.map((social, index) => (
                                <ListItem key={social.link} sx={isSmallerScreen ? { flexDirection: "column", alignItems: 'start' } : {}}>
                                    <Grid container direction={isSmallerScreen ? "column" : "row"} alignItems="start">
                                        <Grid item lg={9} xs={9} sm={12}>
                                            <ListItemText primary={social.name} secondary={social.link} />
                                        </Grid>
                                        <Grid item lg={3} xs={3} sm={12}>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                fullWidth={isSmallerScreen}
                                                endIcon={<DeleteIcon />}
                                                onClick={() => removeSocial(index)}>
                                                Remove
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" sx={{ ml: 'auto', minWidth: '200px' }} size='large'>Save</Button>
                </Grid >
            </form >
        </>
    );
};

export default StoreEditForm;
