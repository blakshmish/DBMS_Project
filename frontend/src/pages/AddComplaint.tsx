import React from "react";
import "../styles/dbms_project.css";
import { CreateComplaint } from "./api/kitApi";
import { Complaint } from "../interfaces/Complaint";
import ComplaintList from "./ComplaintList";

export default function AddComplaint() {
  const [formData, setFormData] = React.useState({
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = (await CreateComplaint(formData)) as Complaint;
    console.log("Form Data Submitted: ", res);
    if (res.complaint_id > 0) {
      alert("Complaint added successully!");
    } else {
      alert("Error in adding the data, retry !");
    }
  };

  return (

    <>

    <div className="container">
      <h2><center>Add Complaint Category</center></h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>
        
        <div>
          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>

    <ComplaintList />
    </>

  );    
}


