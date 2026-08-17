import { getAllRoles } from "../services/rolesService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import RolesModal from "./RolesModal";
import { deleteRoles } from "../services/rolesService";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
    setIsAdd(false);
  }, [isAdd]);

  const handleDelete = async (rolesId) => {
    try {
      const success = await deleteRoles(rolesId);
      if (success){
        setRoles(roles.filter(roles => roles.id !== rolesId));
        console.log("Roles deleted successfully");
      }
      else {
        console.error("Failed to delete roles");
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "role_name", headerName: "Role Name", width: 200 },
    { field: "description", headerName: "Description", width: 430 },
    { field: "actions", headerName: "Actions", width: 300, renderCell: (params) => (
      <>
        <Button
          variant="outlined"
          onClick={() =>{
            setSelectedRoles(params.row)
            setModalOpen(true);
          }}
        >
          <EditIcon /> Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() =>{
            handleDelete(params.row.id)
          }}
        >
          <DeleteIcon /> Delete
        </Button>
      </>
    )}
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
      <Button variant="contained" color="success" onClick={createRoles}><AddIcon/> Add species</Button>
      <DataGrid rows={roles} columns={columns} autosizeOnMount ></DataGrid>
      <RolesModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedRoles={selectedRoles} 
        setIsAdd={setIsAdd}
      />
    </>
  );
};

export default Roles;
