import React from 'react';
import { Routes, Route } from 'react-router-native';
import PublicRoute from './PublicRoute';
import LoginScreen from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import CasherScreen from '../pages/CasherScreen';

const RoutesApp = () => (
    <Routes>
        <Route path='/login' element={
            <PublicRoute>
                <LoginScreen />
            </PublicRoute>
        } />
        <Route path="/*" element={
            <ProtectedRoute>
                <Routes>
                    <Route path='/home' element={<CasherScreen />} />
                    <Route path='/' element={<CasherScreen />} />
                </Routes>
            </ProtectedRoute>
        } />
    </Routes>
) 


export default RoutesApp;