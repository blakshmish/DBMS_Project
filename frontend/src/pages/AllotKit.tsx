import React from "react";
import { Kit } from "../interfaces/Kit";
import { GetActiveKitList } from "./api/kitApi";
import { LabTransactionCreate } from "./api/labApi";
import { Student } from "../interfaces/Student";
import Students from "./Students";
import { useNavigate } from "react-router-dom";

import { LabTransactions } from "../interfaces/LabTransactions";

export default function AllotKit() {

  const navigate = useNavigate();

  const [kits, setKits] = React.useState([
    {
      kit_id: 0,
      description: "",
      kit_qr: "",
      status: true,
    },
  ]);
  const [errMessage, setErrMessage] = React.useState("");
  const [selectedKit, setSelectedKit] = React.useState<number>(0);
  const [selectedDept, setSelectedDept] = React.useState("");
  const [selectedSem, setSelectedSem] = React.useState<number>(0);
  const [studentsData, setstudentsData] = React.useState<Student[]>([]);

  const handleStudentIds = (s: Student[]) => {
    setstudentsData(s);
    console.log(s);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await GetActiveKitList()) as Kit[];
        setKits(response);
        if (kits.length === 0) {
          setErrMessage("There are no active kits, ensure Kits list is added");
        }
      } catch (err) {
        console.error("Error fetching kit data:", err);
      }
    };
    fetchData();
  }, []);

  const handleKitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKit(Number(event.target.value)); // Convert to number or reset to empty string
  };
  const handleDeptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(event.target.value);
  };
  const handleSemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSem(Number(event.target.value)); // Convert to number or reset to empty string
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const labTxn: LabTransactions[] = studentsData.map((student) => (
      {
           dept:selectedDept,
           semester: selectedSem,
           staff:1,
           kit:selectedKit,
           student:student.student_id,
           checkin_time:new Date(),
           lab_date:new Date().toISOString().slice(0, 10),
           status:true,
      }
    ))

    labTxn.forEach( (lt) => {
      LabTransactionCreate(lt);
    } )
    
    

  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <h2>
            <center>Allot Kit to Students</center>
          </h2>
          <select id="kits" value={selectedKit} onChange={handleKitChange}>
            <option value="0">-- Select a Kit --</option>
            {kits.map((kit) => (
              <option key={kit.kit_id} value={kit.kit_id}>
                {kit.description}
              </option>
            ))}
          </select>
          <select id="dept" value={selectedDept} onChange={handleDeptChange}>
            <option value="">-- Select Department --</option>
            <option value="ISE">ISE</option>
            <option value="CSE">CSE</option>
          </select>
          <select id="Semester" value={selectedSem} onChange={handleSemChange}>
            <option value="0">-- Select Semester --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <br></br>
          <label color="orange"> {errMessage} </label>
        </div>
        <button style= {{backgroundColor: '#3498db'}} type="submit"> Save</button>
      </form>
     
      <Students
        dept={selectedDept}
        sem={selectedSem}
        sendIdsToParent={handleStudentIds}
      />
    </>
  );
}
