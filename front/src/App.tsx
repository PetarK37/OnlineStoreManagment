import React from 'react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SignIn from './Components/SignIn/SignInPage'
import PageAndNavLayout from './Components/Layouts/PageAndNavLayout';

function App() {
    const defaultTheme = createTheme();

    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<PageAndNavLayout />}>
                    </Route>
                    <Route
                        path='/SignIn'
                        element={<SignIn />}>
                    </Route>
                    <Route
                        path='/LogIn'
                        element={<SignIn />}>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                limit={1}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
                    </ThemeProvider >
        </>
    )
}

export default App