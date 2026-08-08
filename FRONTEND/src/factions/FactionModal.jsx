import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";

import { createFaction, updateFaction } from "../services/factionService";
import { getAllCharacters } from "../services/charactersService";

const FactionModal = ({
  modalOpen,
  setModalOpen,
  selectedFaction,
  setIsAdd,
}) => {
  const isCreate = selectedFaction?.id === undefined;

  const [formData, setFormData] = useState({
    character_id: "",
    faction_name: "",
    description: "",
  });

  const [characters, setCharacters] = useState([]);

  // Get all characters
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

  // Populate form when editing a faction
  useEffect(() => {
    setFormData({
      character_id: selectedFaction?.character_id || "",
      faction_name: selectedFaction?.faction_name || "",
      description: selectedFaction?.description || "",
    });
  }, [selectedFaction]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreate) {
        await createFaction(formData);
      } else {
        await updateFaction(selectedFaction.id, formData);
      }

      setIsAdd(true);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isCreate ? "Creating Faction" : "Updating Faction"}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {isCreate
              ? "Enter the faction details below."
              : "Update the faction details below."}
          </Typography>

          <TextField
            label="Character"
            value={formData.character_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                character_id: e.target.value,
              })
            }
            fullWidth
            select
            sx={{ mb: 2 }}
          >
            {characters.map((character) => (
              <MenuItem key={character.id} value={character.id}>
                {character.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Faction Name"
            value={formData.faction_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                faction_name: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {isCreate ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FactionModal;