import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { GetComplaintsList } from "./api/kitApi";
import { Complaint } from "../interfaces/Complaint";

function ComplaintList() {
  const [complaintData, setComplaintData] = React.useState([
    {
      complaint_id: 0,
      description: "",
      status: true,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await GetComplaintsList()) as Complaint[];
        setComplaintData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching complaint category data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Description</b></TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {complaintData.map((complaint) => (
              <TableRow key={complaint.complaint_id}>
                <TableCell>{complaint.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ComplaintList;
