// import React, { useEffect } from "react";
// import { Staff } from "../interfaces/Staff";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { GetStaffList } from "./api/staffApi";

// function StaffList() {
//   const [staffData, setStaffData] = React.useState([
//     {
//       fname: "",
//       mname: "",
//       lname: "",
//       email: "",
//       pwd: "",
//       phno: "",
//       type: "",
//       dept: "",
//       role: "",
//     },
//   ]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = (await GetStaffList()) as Staff[];
//         setStaffData(response);
//         console.log(response);
//         console.log(staffData);
//       } catch (err) {
//         //setError(err.message); // Update error state
//       } finally {
//         //setLoading(false); // Set loading to false after the operation
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <div><h2>Staff List</h2></div>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Type</TableCell>
//               <TableCell>First Name</TableCell>
//               <TableCell>Middle Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Department</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Active</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {staffData.map((staff) => (
//               <TableRow key={staff.staff_id}>
//                 <TableCell>{staff.type}</TableCell>
//                 <TableCell>{staff.fname}</TableCell>
//                 <TableCell>{staff.mname}</TableCell>
//                 <TableCell>{staff.lname}</TableCell>
//                 <TableCell>{staff.email}</TableCell>
//                 <TableCell>{staff.phno}</TableCell>
//                 <TableCell>{staff.dept}</TableCell>
//                 <TableCell>{staff.role}</TableCell>
//                 <TableCell>{staff.active ? "Yes" : "No"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }

// export default StaffList;

import React, { useEffect } from "react";
import { Staff } from "../interfaces/Staff";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { GetStaffList } from "./api/staffApi";

function StaffList() {
  const navigate = useNavigate(); // For navigation

  const [staffData, setStaffData] = React.useState([
    {
      fname: "",
      mname: "",
      lname: "",
      email: "",
      pwd: "",
      phno: "",
      type: "",
      dept: "",
      role: "",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await GetStaffList()) as Staff[];
        setStaffData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching staff data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(-1)} // Go back to the previous page
            style={{ marginRight: "8px" }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
          <h2 style={{ margin: 0 }}>Staff List</h2>
        </div>
        <Button
          style={{ width: '5cm', height: '50px', backgroundColor: '#3498db' }}
          size="small"
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-staff")}
        >
          Add Staff
        </Button>
      </div>
      <TableContainer component={Paper} style={{ marginTop: "16px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff, index) => (
              <TableRow key={index}>
                <TableCell>{staff.type}</TableCell>
                <TableCell>{staff.fname}</TableCell>
                <TableCell>{staff.mname}</TableCell>
                <TableCell>{staff.lname}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phno}</TableCell>
                <TableCell>{staff.dept}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.active ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StaffList;


