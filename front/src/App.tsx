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
                            element={<SignIn />}>
                        </Route>
                        <Route
                            path='/SignIn'
                            element={<SignIn />}>
                        </Route>
                        <Route
                            path='/LogIn'
                            element={<SignIn />}>
                        </Route>
                        <Route
                            path='/Store'
                            element={<PageAndNavLayout children={<h1>Store</h1>} />}>
                        </Route>
                        <Route
                            path='/Anylitics'
                            element={<PageAndNavLayout children={<h1>Anylitics</h1>} />}>
                        </Route>
                        <Route
                            path='/Inventory'
                            element={<PageAndNavLayout children={<h1>Inventory</h1>} />}>
                        </Route>
                        <Route
                            path='/CustomerOrder'
                            element={<PageAndNavLayout children={<h1>CustomerOrder</h1>} />}>
                        </Route>
                        <Route
                            path='/SupplierOrder'
                            element={<PageAndNavLayout children={<h1>SupplierOrder</h1>} />}>
                        </Route>
                        <Route
                            path='/PromoCode'
                            element={<PageAndNavLayout children={<h1>PromoCode</h1>} />}>
                        </Route>
                        <Route
                            path='/Employee'
                            element={<PageAndNavLayout children={<h1>Employee</h1>} />}>
                        </Route>
                        <Route
                            path='/Category'
                            element={<PageAndNavLayout children={<h1>Category</h1>} />}>
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