import React from 'react'
import { Route, Routes } from 'react-router-native'
import CasherScreen from '../pages/CasherScreen'

const RoutesScreen = () => {
    <Routes>
        <Route path='/home' element={<CasherScreen />} />
        <Route path='/' element={<CasherScreen />} />
    </Routes>
}

export default RoutesScreen