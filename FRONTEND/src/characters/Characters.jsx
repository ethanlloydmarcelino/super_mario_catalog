import { getAllCharacters } from "../services/charactersService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CharactersModal from './CharactersModal';
import { Button } from '@mui/material';
import { deleteCharacter } from "../services/charactersService";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState({});
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCharacters();
        setCharacters(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setIsAdd(false);
  }, [isAdd]);

  const handleDelete = async (characterId) => {
    try {
      const success = await deleteCharacter(characterId);
      if (success){
        setCharacters(characters.filter(character => character.id !== characterId));
        console.log("Character deleted successfully");
      }
      else {
        console.error("Failed to delete character");
      }
    }
    catch (error) {
      console.error(error);
    }
  };
console.log("selectedCharacters", selectedCharacters)
  const columns = [
    { field: "name", headerName: "Name", width: 118 },
    { field: "first_appearance", headerName: "First Appearance", width: 200 },
    { field: "home_location", headerName: "Home Location", width: 230 },
    { field: "main_ability", headerName: "Main Ability", width: 260 },
    { field: "is_playable", headerName: "Is Playable", width: 100 },
    { field: "popularity_rating", headerName: "Popularity Rating", width: 150 },
    { field: "notes", headerName: "Notes", width: 430 },
    { field: "actions", headerName: "Actions", width: 300, renderCell: (params) => (
      <>
        <Button
          variant="outlined"
          onClick={() =>{
            setSelectedCharacters(params.row)
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

  console.log(selectedCharacters);

  const createCharacters = () => {
    setSelectedCharacters({})
    setModalOpen(true);
  }

  return (
    <>
      <h1>Characters</h1>
      <Button variant="contained" color="success" onClick={createCharacters}><AddIcon/> Add character</Button>
      <DataGrid rows={characters} columns={columns} ></DataGrid>
      <CharactersModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        selectedCharacter={selectedCharacters} 
        setIsAdd={setIsAdd}
      />
    </>
  );
};

export default Characters;
