import React from 'react'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SignIn from './Components/SignIn/SignInPage'
import PageAndNavLayout from './Components/Layouts/PageAndNavLayout';
import EmployeePage from './Components/Employees/EmployeePage';
import NotFound from './Components/NotFound/NotFound';
import AuthorizationRedirectWrapper from './Components/Authorization/AuthorizationRedirectWrapper';
import { Role } from './constants';
import StoreEditForm from './Components/Store/StoreEditForm';
import CategoryAddPage from './Components/Category/CategoryAddPage';
import PromoCodePage from './Components/PromoCode/PromoCodePage';

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
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN]}>
                                    <PageAndNavLayout children={<StoreEditForm></StoreEditForm>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/Anylitics'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<h1>Anylitics</h1>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/Inventory'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<h1>Inventory</h1>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/CustomerOrder'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<h1>CustomerOrder</h1>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/SupplierOrder'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<h1>SupplierOrder</h1>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/PromoCode'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<PromoCodePage></PromoCodePage>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/Employee'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN]}>
                                    <PageAndNavLayout children={<EmployeePage></EmployeePage>} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/Category'
                            element={
                                <AuthorizationRedirectWrapper requiredRoles={[Role.ADMIN, Role.EMPLOYEE]}>
                                    <PageAndNavLayout children={<CategoryAddPage />} />
                                </AuthorizationRedirectWrapper>
                            }>
                        </Route>
                        <Route
                            path='/NotFound'
                            element={<PageAndNavLayout children={<NotFound />}></PageAndNavLayout>}
                        >
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