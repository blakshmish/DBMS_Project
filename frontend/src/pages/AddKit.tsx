import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dbms_project.css";
import { CreateKit } from "./api/kitApi";
import { Kit } from "../interfaces/Kit";

export default function AddKit() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    description: "",
    kit_qr: "",
    status: true,
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
    
    const res = await CreateKit(formData) as Kit
    console.log("Form Data Submitted: ", res);
    if (res.kit_id > 0) {
        alert("Kit added successully!") 
        navigate("/Labhome"); 
    }
    else {
        alert("Error in adding the data, retry !")
    }
  };

  return (
    <div className="container">
      <h2><center>Add Kit</center></h2>
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
          <input
            type="text"
            name="kit_qr"
            value={formData.kit_qr}
            onChange={handleChange}
            placeholder="Kit QR"
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
            Status
          </label>
        </div>
        <div>
          <br />
          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
  );
}
