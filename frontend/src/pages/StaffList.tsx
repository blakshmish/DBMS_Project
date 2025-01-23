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
} from "@mui/material";
import { GetStaffList } from "./api/staffApi";

function StaffList() {
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
        console.log(staffData);
      } catch (err) {
        //setError(err.message); // Update error state
      } finally {
        //setLoading(false); // Set loading to false after the operation
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div><h1>Staff List</h1></div>
      <TableContainer component={Paper}>
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
            {staffData.map((staff) => (
              <TableRow key={staff.staff_id}>
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
    </>
  );
}

export default StaffList;
