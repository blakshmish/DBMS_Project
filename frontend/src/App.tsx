import react from 'react'
import { BrowserRouter,Router, Route, Navigation, Navigate, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import HomePage from "./pages/home"

import NotFound from './pages/NotFound'
import Student from './pages/Student'
import Labhome from './pages/Labhome'
import CompList from "./pages/CompList";
import AddComp from "./pages/AddComp";
import "../src/styles/dbms_project.css"


function Logout(){
  localStorage.clear()
  return <Navigate to ="/login" />
}
import Depthome from './pages/Depthome'
import AddStaff from './pages/AddStaff'
import AddKit from './pages/AddKit'
import KitList from './pages/KitList'
import AddComplaint from './pages/AddComplaint'
import AllotKit from './pages/AllotKit'
import LabTxnList from './pages/LabTxnList'
import StaffList from './pages/StaffList'

function App() {

  return (
    <BrowserRouter>
     <Routes>
     <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<Student />} />
      <Route path="/Labhome" element={<Labhome />} />
      <Route path="/depthome" element={<Depthome />} />
      <Route path="/add-staff" element={<AddStaff />} />
      <Route path="/staff-list" element={<StaffList />} />
      <Route path="/add-kit" element={<AddKit />} />
      <Route path="/kits" element={<KitList />} />
      <Route path="/components/:kitId" element={<CompList />} />
      <Route path="/add-component" element={<AddComp />} />
      <Route path="/add-complaint" element={<AddComplaint />} />
      <Route path="/allot-kit" element={<AllotKit />} />
      <Route path="/lab-txn-list" element={<LabTxnList />} />


      <Route path="*" element={ <NotFound />} />

     </Routes>
    </BrowserRouter>
  )
}

export default App
