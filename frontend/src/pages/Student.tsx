import React, { useState, useEffect } from 'react';
import { Student } from '../interfaces/Student';
import { Kit } from '../interfaces/Kit';
import { useNavigate, useLocation } from "react-router-dom";
import {GetStudent} from "./api/studentApi";

// import { Lab } from '../interfaces/Lab';

const StudentDashboard: React.FC = () => {
  const [studentData, setStudentData] = useState<Student | null>(null);
  const [kitIssues, setKitIssues] = useState<Kit[]>([]);
//   const [labExperiments, setLabExperiments] = useState<Lab[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get("id") ===null? 1:queryParams.get("id");

  useEffect(() => {
    // Simulated data fetch - replace with actual API calls
    const fetchStudentData = async () => {
      // Mock data - to be replaced with actual API calls
    

      setKitIssues([
        {
            kit_id: 1,
            description: 'Sensor malfunction',
            status: true,
            kit_qr: ''
        },
        {
            kit_id: 2,
          description: 'Connectivity problem',
          status: true,
            kit_qr: ''
        }
      ]);

        //const student = (await GetStudent(studentId)) as Student;
        //setStudentData(student);

        setStudentData({
          fname: 'Lekha',
          lname:'Bagalkot',
          usn: 'RVCE22BIS059',
          dept: 'ISE'
        });

    };

    fetchStudentData();
  }, []);

  const handleRaiseIssue = () => {
    // Navigation or modal for raising complaint
    window.location.href = '/add-issue';
  };

  const handleLabExp = () => {
    // Navigation or modal for raising complaint
    window.location.href = '/lab-exp';
  };

  return (
    <div className="student-dashboard">
      <div className="sidebar">
        
        <div className="sidebar-actions">
          <button onClick={handleLabExp}>Lab Experiments</button>
          <button onClick={handleRaiseIssue}>
            Raise Issue
          </button>
          <button>View Component Info</button>
          <button onClick={() => window.location.href = '/login'}>Log Out</button>
        </div>
      </div>

      <div className="main-content">
        <div className="student-profile">
          <h2>{studentData?.fname}</h2>
          <p>USN: {studentData?.usn}</p>
          <p>Department: {studentData?.dept}</p>
        </div>

        <div className="kit-issues">
          <h3>Kit Issues</h3>
          <table>
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Description</th>
                <th>Component</th>
                <th>Status</th>
                <th>Reported On</th>
              </tr>
            </thead>
            <tbody>
              {kitIssues.map(issue => (
                <tr key={issue.kit_id}>
                  <td>{issue.kit_id}</td>
                  <td>{issue.description}</td>
                  <td>{issue.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

// Inline CSS Styles
const styles = `
.student-dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar h3 {
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 15px;
  background-color: #34495e;
  padding: 10px;
  border-radius: 5px;
}

.sidebar-actions {
  margin-top: 20px;
}

.sidebar-actions button {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.student-profile {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.kit-issues {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.kit-issues table {
  width: 100%;
  border-collapse: collapse;
}

.kit-issues th, .kit-issues td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.kit-issues th {
  background-color: #f2f2f2;
}
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);