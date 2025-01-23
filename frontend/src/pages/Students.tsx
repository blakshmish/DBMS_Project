import React, { useEffect } from "react";
import { Student } from "../interfaces/Student";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import { GetStudents } from "./api/studentApi";

function Students({ dept, sem, sendIdsToParent }) {
  const [studentsData, setstudentsData] = React.useState<Student[]>([]);

  const handleAddStudent = (id: number) => {
    setstudentsData((prevSelected) =>
      prevSelected.map((student) =>
        student.student_id === id ? { ...student, isSelected: true } : student
      )
    );

    sendIdsToParent(studentsData);
  };

  const handleRemoveStudent = (id: number) => {
    setstudentsData((prevSelected) =>
      prevSelected.map((student) =>
        student.student_id === id ? { ...student, isSelected: false } : student
      )
    );

    sendIdsToParent(studentsData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (dept != "" && sem != "") {
          const response = (await GetStudents(dept, sem)) as Student[];

          const sData: Student[] = response.map((student) => ({
            student_id: student.student_id,
            fname: student.fname,
            mname: student.mname,
            lname: student.lname,
            usn: student.usn,
            email: student.email,
            dept: student.dept,
            semester: student.semester,
            pwd: student.dept,
            isSelected: false,
          }));
          console.log(sData);
          setstudentsData(sData);
        }
      } catch (err) {
        //setError(err.message); // Update error state
      } finally {
        //setLoading(false); // Set loading to false after the operation
      }
    };
    fetchData();
  }, [dept, sem]);

  return (
    <>
      <div>
        <h2>Students</h2>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Middle Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsData.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell padding="checkbox">
                  <Checkbox disabled={true} checked={student.isSelected} />
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      width: "100px",
                      height: "50px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddStudent(student.student_id)}
                  >
                    add
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      width: "100px",
                      height: "50px",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleRemoveStudent(student.student_id)}
                  >
                    remove
                  </Button>
                </TableCell>
                <TableCell>{student.fname}</TableCell>
                <TableCell>{student.mname}</TableCell>
                <TableCell>{student.lname}</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Students;
