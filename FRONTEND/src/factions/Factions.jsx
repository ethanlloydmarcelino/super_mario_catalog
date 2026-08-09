import { getAllFactions } from "../services/factionService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import FactionModal from './FactionModal';
import { Button } from '@mui/material';
import { deleteFaction } from "../services/factionService";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Factions = () => {
  const [factions, setFactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllFactions();
        setFactions(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsAdd(false);
  }, [isAdd]);

  const handleDelete = async (factionId) => {
    try {
      const success = await deleteFaction(factionId);
      if (success){
        setFactions(factions.filter(faction => faction.id !== factionId));
        console.log("Faction deleted successfully");
      }
      else {
        console.error("Failed to delete faction");
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "character_id", headerName: "Character_id", width: 100 },
    { field: "faction_name", headerName: "Faction Name", width: 200 },
    { field: "description", headerName: "Description", width: 430 },
    { field: "actions", headerName: "Actions", width: 300, renderCell: (params) => (
      <>
        <Button
          variant="outlined"
          onClick={() =>{
            setSelectedFaction(params.row)
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

  const createFaction = () => {
    setSelectedFaction({})
    setModalOpen(true);
  }
console.log(selectedFaction)
  return (
    <>
      <h1>Factions</h1>
      <Button variant="contained" color="success" onClick={createFaction}><AddIcon/> Add faction</Button>
      <DataGrid rows={factions} columns={columns} autosizeOnMount ></DataGrid>
      <FactionModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedFaction={selectedFaction} 
        setIsAdd={setIsAdd}
      />
    </>
  );
};

export default Factions;
