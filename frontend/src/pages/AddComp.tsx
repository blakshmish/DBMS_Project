import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreateComponent } from "./api/kitApi";
import { Component } from "../interfaces/Component";

export default function AddComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const kitId = queryParams.get("kitId");

  const [formData, setFormData] = React.useState({
    comp_name: "",
    status: "",
    kit: kitId ? parseInt(kitId) : 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "kit" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = (await CreateComponent(formData)) as Component;
      if (response.comp_id > 0) {
        alert("Component added successfully!");        
      }
      navigate(`/components/${kitId}`);
    } catch (error) {
      alert("Error adding the component. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2> <center> Add Component</center></h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="comp_name"
            value={formData.comp_name}
            onChange={handleChange}
            placeholder="Component Name"
            required
          />
        </div>
        
        <div>
          <select
            name="status"
            value={formData.status} 
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="G">Good</option>
            <option value="D">Defective</option>
            <option value="O">Obsolete</option>
          </select>
        </div>
        <button type="submit">SAVE</button>
      </form>
    </div>
  );
}
