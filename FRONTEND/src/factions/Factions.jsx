import { createFaction, getFactions } from "../services/factionService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import FactionModal from './FactionModal';
import { Button } from '@mui/material';

const Factions = () => {
  const [factions, setFactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState({character_id: '', faction_name: '', description: ''});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFactions(2);
        setFactions(data.factions);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "character_id", headerName: "Character_id", width: 100 },
    { field: "faction_name", headerName: "Faction Name", width: 200 },
    { field: "description", headerName: "Description", width: 400 }
  ];

  // console.log(factions);

  const createFaction = () => {
    setSelectedFaction({character_id: '', faction_name: '', description: ''})
    setModalOpen(true);
  }

  return (
    <>
      <h1>Factions</h1>
      <Button variant="contained" onClick={createFaction}>Add faction</Button>
      <DataGrid rows={factions} columns={columns}></DataGrid>
      <FactionModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedFaction={selectedFaction} 
      />
    </>
  );
};

export default Factions;
