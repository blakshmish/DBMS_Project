import React, { useState, useEffect } from 'react';
import { CreateIssue, GetComplaintsList, GetComponentList } from "./api/kitApi";
import { Complaint } from "../interfaces/Complaint";
import { useParams, useNavigate } from "react-router-dom";
import { Issue } from '../interfaces/Issue';

export default function AddIssue() {
  const { kitId } = useParams<{ kitId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaint: '', // Complaint category
    description: '',
    kit: '', // Kit ID
    comp: '', // Component
    student: '', // Student ID
    status: 'Pending' // Default status
  });

  const [availableComponents, setAvailableComponents] = useState<string[]>([]);
  const [complaintCategories, setComplaintCategories] = useState<string[]>([]);

  // Fetch complaint categories from the database or API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = (await GetComplaintsList()) as Complaint[]; // Expecting an array of Complaint objects
        // Extract descriptions from the response
        const categories = response.map((item) => item.description);
        setComplaintCategories(categories);
        console.log(categories);
      } catch (err) {
        console.error("Error fetching complaint category data:", err);
        setComplaintCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const allComponents = await GetComponentList();
        // Extract component names where the kit ID matches
        const filteredComponents = (allComponents || [])
          .filter((component) => component.kit === 1/*parseInt(kitId || "0")*/)
          .map((component) => component.comp_name); 
        setAvailableComponents(filteredComponents); 
      } catch (err) {
        console.error("Error fetching components:", err);
        setAvailableComponents([]); // Set to an empty array on error
      }
    };
    fetchComponents();
  }, [kitId]);
  
  

  // Simulated function to fetch student and kit details
  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    const kitId = localStorage.getItem('currentKitId');
    const kitComponents = JSON.parse(localStorage.getItem('kitComponents') || '[]');

    setFormData(prev => ({
      ...prev,
      student: studentId || '',
      kit: kitId || ''
    }));

    setAvailableComponents(kitComponents);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = (await CreateIssue(formData)) as Issue;
      console.log("Form Data Submitted: ", res);
      
      if (res.issue_id > 0) {
        alert("Issue added successfully!");
        navigate("/Student")
        setFormData({
          complaint: '',
          description: '',
          kit: formData.kit,
          comp: '',
          student: formData.student,
          status: 'Pending'
        });
      } else {
        alert("Error in adding the data, retry!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Create IoT Kit Issue
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Complaint Category
          </label>
          <select
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="">Select Complaint Category</option>
            {complaintCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
  
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Component
          </label>
          <select
            name="comp"
            value={formData.comp}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          >
            <option value="">Select Component</option>
            {availableComponents.map((component) => (
              <option key={component.comp} value={component}>
                {component}
              </option>
            ))}
          </select>
        </div>
  
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#333",
            }}
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "14px",
              resize: "none",
              height: "100px",
            }}
          />
        </div>
  
        <div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#4caf50",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#45a049")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#4caf50")
            }
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
  
}


