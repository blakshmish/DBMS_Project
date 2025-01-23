import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { GetComponentList } from "./api/kitApi";
import { Component } from "../interfaces/Component";

function CompList() {
  const { kitId } = useParams<{ kitId: string }>(); // Get kitId from URL
  const navigate = useNavigate();
  const [components, setComponents] = React.useState<Component[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const allComponents = await GetComponentList();
        // Ensure allComponents is always an array (fallback to empty array if undefined)
        const filteredComponents = (allComponents || []).filter(
          (component) => component.kit === parseInt(kitId || "0")
        );
        setComponents(filteredComponents);
      } catch (err) {
        console.error("Error fetching components:", err);
      }
    };
    fetchComponents();
  }, [kitId]);

  const handleAddComponent = () => {
    navigate(`/add-component?kitId=${kitId}`);
  };

  return (
    <div>
      <h1>Components for Kit ID: {kitId}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddComponent}
        style={{ marginBottom: "20px" }}
      >
        Add Component
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.comp_id}>
                <TableCell>{component.comp_name}</TableCell>
                <TableCell>
                  {component.status === "G"
                    ? "Good"
                    : component.status === "D"
                    ? "Damaged"
                    : "Obsolete"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CompList;
