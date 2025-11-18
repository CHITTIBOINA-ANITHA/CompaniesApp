import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";

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
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "industry", header: "Industry" },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={companies}
      state={{ isLoading: loading }}
      enableColumnFilters={true}
      enableGlobalFilter={true}
      enableSorting={true}
      enablePagination={true}
      initialState={{ showGlobalFilter: true }}

    />
  );
};

export default CompaniesTable;
