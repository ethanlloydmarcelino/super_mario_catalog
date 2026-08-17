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

import { createRoles, updateRoles } from "../services/rolesService";
import { getAllCharacters } from "../services/charactersService";

const RolesModal = ({
  modalOpen,
  setModalOpen,
  selectedRoles,
  setIsAdd,
}) => {
  const isCreate = selectedRoles?.id === undefined;

  const [formData, setFormData] = useState({
    role_name: "",
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
      role_name: selectedRoles?.role_name || "",
      description: selectedRoles?.description || "",
    });
  }, [selectedRoles]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreate) {
        await createRoles(formData);
      } else {
        await updateRoles(selectedRoles.id, formData);
        console.log("update roles")
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
          {isCreate ? "Creating Roles" : "Updating Roles"}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {isCreate
              ? "Enter the role details below."
              : "Update the role details below."}
          </Typography>

          <TextField
            label="Role Name"
            value={formData.role_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                role_name: e.target.value,
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

export default RolesModal;