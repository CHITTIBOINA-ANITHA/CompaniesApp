import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { Paper,Box } from "@mui/material";
const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("/companies.json");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching company data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const columns = [
    { accessorKey: "id", header: "ID" , },
    { accessorKey: "name", header: "Name" ,},
    { accessorKey: "location", header: "Location"},
    { accessorKey: "industry", header: "Industry",},
  ];

  return (
     <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // centers vertically
      bgcolor="#b6d3adff"
      //padding={2}
      minWidth={1500}
    >
    <Paper
        elevation={3}
        style={{
          padding: "16px",
          width: "80%",
          maxWidth: "900px",
          border: "2px solid #181a1bff", // blue border
          borderRadius: "12px",        // rounded corners
        }}
      >
    <MaterialReactTable
      columns={columns}
      data={companies}
      state={{ isLoading: loading }}
      enableColumnFilters={true}
      enableGlobalFilter={true}
      enableSorting={true}
      enablePagination={true}
      initialState={{ showGlobalFilter: true }}
      minWidth={1000}

    />
    </Paper>
    </Box>
  );
};

export default CompaniesTable;
