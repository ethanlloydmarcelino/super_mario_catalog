import { Modal, Box, Typography, TextField } from '@mui/material'
import { createFaction, updateFaction } from "../services/factionService";
import { useState, useEffect } from "react";

const FactionModal = ({modalOpen, setModalOpen, selectedFaction}) => {
  const isCreate = selectedFaction.id === undefined;
  const [formData, setFormData] = useState({ character_id: "", faction_name: "", description: "" });

  useEffect(() => {
    setFormData({ character_id: selectedFaction.character_id || "", faction_name: selectedFaction.faction_name || "", description: selectedFaction.description || ""});
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
    boxShadow: 24
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <Typography>{isCreate ? "Creating Faction" : "Updating Faction"}</Typography>
          <form>
            <TextField
              label="Character_id"
              value={formData.character_id}
            ></TextField>
          </form>
        </Box>
    </Modal>
  )
}

export default FactionModal