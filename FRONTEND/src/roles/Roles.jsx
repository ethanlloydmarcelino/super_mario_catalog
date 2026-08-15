import { getAllRoles } from "../services/rolesService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
// import RolesModal from "./RolesModal";
import AddIcon from '@mui/icons-material/Add';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRoles();
        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isAdd]);

  const columns = [
    { field: "role_name", headerName: "Role Name", width: 200 },
    { field: "description", headerName: "Description", width: 430 }
  ];

  // console.log(factions);

  const createRoles = () => {
    setSelectedRoles({})
    setModalOpen(true);
  }
console.log(selectedRoles)
  return (
    <>
      <h1>Roles</h1>
      <Button variant="contained" color="success" ><AddIcon/> Add species</Button>
      <DataGrid rows={roles} columns={columns} autosizeOnMount ></DataGrid>
      {/* <RolesModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedRoles={selectedRoles} 
      /> */}
    </>
  );
};

export default Roles;
