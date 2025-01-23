import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dbms_project.css";
import { CreateStaff } from "./api/staffApi";
import { Staff } from "../interfaces/Staff";

export default function AddStaff() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    pwd: "",
    phno: "",
    type: "",
    dept: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await CreateStaff(formData) as Staff
    if (res.staff_id > 0) {
      alert("Staff added successully!")      
      navigate("/Labhome")
    }
    else {
        alert("Error in adding the data, retry !")
    }
  };

  return (
      <div className="container">
        <h2> <center> Add Staff</center></h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="mname"
              value={formData.mname}
              onChange={handleChange}
              placeholder="Middle Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Last Name"              
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phno"
              value={formData.phno}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="Lab">Lab Staff</option>
              <option value="Staff">Teaching Staff</option>
            </select>
          </div>
          <div>
            <select
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="ISE">ISE</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </select>
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div>
            <br></br>
            <button style= {{backgroundColor: '#3498db'}}type="submit">SAVE</button>
          </div>
        </form>
      </div>
  );
}
