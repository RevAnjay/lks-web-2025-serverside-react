import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CreateValidation from './pages/DataValidation/createValidation.jsx'
import Installment from './pages/Installment/Installment.jsx'
import InstallmentShow from './pages/Installment/InstallmentShow.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/validation" element={<CreateValidation />} />
      <Route path="/dashboard/installment" element={<Installment />} />
      <Route path="/dashboard/installment-show/:id" element={<InstallmentShow />} />
    </Routes>
  )
}

export default App
