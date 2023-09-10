import React, { useState, useEffect } from 'react'
import { useAuthToken } from '../../Hooks/UseAuthToken';
import { useNavigate } from 'react-router-dom';
import { Employee, Role } from '../../constants';
import { Container, useMediaQuery } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import axios from 'axios';
import { API_URL } from '../../constants';
import { toast } from 'react-toastify';

function EmployeePage() {

    const { getLoggedIn, isAuthenticated, getToken } = useAuthToken();
    const navigate = useNavigate();
    const isSmallerScreen = useMediaQuery('(max-width:600px)');

    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/LogIn')
            return
        }
        if (getLoggedIn().role !== Role.ADMIN) {
            navigate('/NotFound')
            return
        }
        getEmployees();
    }, [])

    const getEmployees = (): Employee[] => {
        axios.get(`${API_URL}/Employee`, { headers: { Authorization: `Bearer ${getToken()}` } }).then(
            res => {
                setEmployees(res.data)
            }).catch(err => {
                toast.error(err.response.data.Detail)
            })
        return []
    }

    return (
        <Container sx={{ padding: 5 }}>
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
                <Typography variant='h2' align="center" sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }}>Employees:</Typography>
                <Button variant="contained" size='large' endIcon={<PersonAddAlt1RoundedIcon />} sx={{ marginLeft: isSmallerScreen ? 0 : 'auto' }}>
                    Add New
                </Button>
            </Box>
            {employees.map(e => (
                <Accordion key={e.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant='h5'>{e.name}  {e.lastName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {JSON.stringify(e)}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}

        </Container>
    )
}

export default EmployeePage