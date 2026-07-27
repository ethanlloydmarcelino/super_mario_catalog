import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createFaction, updateFaction } from "../services/factionService";
import { useState, useEffect } from "react";

const FactionModal = ({ modalOpen, setModalOpen, selectedFaction }) => {
  const isCreate = selectedFaction.id === undefined;
  const [formData, setFormData] = useState({
    character_id: "",
    faction_name: "",
    description: "",
  });

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
      setModalOpen(false);
    } 
    catch (error) {
      console.error(error);
    }
  };
console.log("formData", formData);
console.log("selectedFaction", selectedFaction)
  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box sx={style}>
        <Typography>
          {isCreate ? "Creating Faction" : "Updating Faction"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Character_id"
            value={formData.character_id}
            onChange={(e) =>
              setFormData({ ...formData, character_id: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Faction_name"
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
