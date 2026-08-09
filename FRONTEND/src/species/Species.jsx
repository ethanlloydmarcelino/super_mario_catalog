import { getAllSpecies } from "../services/speciesService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import SpeciesModal from './SpeciesModal';
import { Button } from '@mui/material';
import { deleteSpecies } from "../services/speciesService";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Species = () => {
  const [species, setSpecies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSpecies();
        setSpecies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsAdd(false);
  }, [isAdd]);

  const handleDelete = async (speciesId) => {
    try {
      const success = await deleteSpecies(speciesId);
      if (success){
        setSpecies(species.filter(species => species.id !== speciesId));
        console.log("Species deleted successfully");
      }
      else {
        console.error("Failed to delete species");
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "character_id", headerName: "Character_id", width: 100 },
    { field: "species_name", headerName: "Species Name", width: 200 },
    { field: "description", headerName: "Description", width: 430 },
    { field: "actions", headerName: "Actions", width: 300, renderCell: (params) => (
      <>
        <Button
          variant="outlined"
          onClick={() =>{
            setSelectedSpecies(params.row)
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

  const createSpecies = () => {
    setSelectedSpecies({})
    setModalOpen(true);
  }
console.log(selectedSpecies)
  return (
    <>
      <h1>Species</h1>
      <Button variant="contained" color="success" onClick={createSpecies}><AddIcon/> Add species</Button>
      <DataGrid rows={species} columns={columns} autosizeOnMount ></DataGrid>
      <SpeciesModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedSpecies={selectedSpecies} 
        setIsAdd={setIsAdd}
      />
    </>
  );
};

export default Species;
