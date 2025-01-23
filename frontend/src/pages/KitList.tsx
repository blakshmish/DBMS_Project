import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { GetKitList } from "./api/kitApi";
import { Kit } from "../interfaces/Kit";

function KitList() {
  const [kitData, setKitData] = React.useState([
    {
      kit_id: 0,
      description: "",
      kit_qr: "",
      status: true,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await GetKitList()) as Kit[];
        setKitData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching kit data:", err);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate(); 
  
  const handleViewComponents = (kitId: number) => {
    navigate(`/components/${kitId}`);
  };
  

  return (
    <>
      <div>
        <h1>Kit List</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Kits list">
          <TableHead>
            <TableRow>
              <TableCell>KIT</TableCell>
              <TableCell>Kit QR</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Components</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kitData.map((kit) => (
              <TableRow key={kit.kit_id}>
                <TableCell>{kit.description}</TableCell>
                <TableCell>{kit.kit_qr}</TableCell>
                <TableCell>{kit.status ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewComponents(kit.kit_id)}
                  >
                    Components
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default KitList;
