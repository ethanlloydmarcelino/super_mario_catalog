import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { createFaction, updateFaction } from "../services/factionService";
import { useState, useEffect } from "react";
import { getAllCharacters } from "../services/charactersService";

const FactionModal = ({ modalOpen, setModalOpen, selectedFaction, setIsAdd }) => {
  const isCreate = selectedFaction.id === undefined;
  const [formData, setFormData] = useState({
    character_id: "",
    faction_name: "",
    description: "",
  });
  const [characters, setCharacters] = useState([]);

  //Get all characters and character_id
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
    }, []);

  useEffect(() => {
    setFormData({
      character_id: selectedFaction.character_id || "",
      faction_name: selectedFaction.faction_name || "",
      description: selectedFaction.description || "",
    });
  }, [selectedFaction, setModalOpen]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    bgcolor: "white",
    width: 300,
    height: 300,
    transform: "translate(-50%, -50%)",
    p: 3,
    borderRadius: 1,
    boxShadow: 24,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCreate){
        await createFaction(formData);
      }
      else{
        await updateFaction(selectedFaction.id, formData);
      }
      setIsAdd(true);
      setModalOpen(false);
    } 
    catch (error) {
      console.error(error);
    }
  };
console.log("formData", formData);
console.log("selectedFaction", selectedFaction)
console.log("characters", characters)
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box sx={style}>
        <Typography>
          {isCreate ? "Creating Faction" : "Updating Faction"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Character"
            value={formData.character_id}
            onChange={(e) =>
              setFormData({ ...formData, character_id: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
            select
          >
           {
            characters.map((charac, index) => (
              <MenuItem key={index} value={charac.id}>{charac.name}</MenuItem>
            ))
           }
           
          </TextField>
          <TextField
            label="Faction Name"
            value={formData.faction_name}
            onChange={(e) =>
              setFormData({ ...formData, faction_name: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            {isCreate ? "Create" : "Update"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FactionModal;
