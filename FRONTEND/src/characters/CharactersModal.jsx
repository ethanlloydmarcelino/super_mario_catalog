import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  createCharacter,
  updateCharacter,
} from "../services/charactersService";

const CharacterModal = ({
  modalOpen,
  setModalOpen,
  selectedCharacter,
  setIsAdd,
}) => {
  const isCreate = selectedCharacter?.id === undefined;

  const [formData, setFormData] = useState({
    name: "",
    first_appearance: "",
    home_location: "",
    main_ability: "",
    is_playable: "",
    popularity_rating: "",
    notes: "",
  });

  useEffect(() => {
    setFormData({
      name: selectedCharacter?.name ?? "",
      first_appearance: selectedCharacter?.first_appearance ?? "",
      home_location: selectedCharacter?.home_location ?? "",
      main_ability: selectedCharacter?.main_ability ?? "",
      is_playable: selectedCharacter?.is_playable ?? "",
      popularity_rating: selectedCharacter?.popularity_rating ?? "",
      notes: selectedCharacter?.notes ?? "",
    });
  }, [selectedCharacter]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCreate) {
        await createCharacter(formData);
      } else {
        await updateCharacter(selectedCharacter.id, formData);
      }

      setIsAdd(true);
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {isCreate ? "Create Character" : "Update Character"}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
              pt: 1,
            }}
          >
            {/* Row 1 */}
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="First Appearance"
              name="first_appearance"
              value={formData.first_appearance}
              onChange={handleChange}
              fullWidth
            />

            {/* Row 2 */}
            <TextField
              label="Home Location"
              name="home_location"
              value={formData.home_location}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Main Ability"
              name="main_ability"
              value={formData.main_ability}
              onChange={handleChange}
              fullWidth
            />

            {/* Row 3 */}
            <TextField
              label="Is Playable"
              name="is_playable"
              value={formData.is_playable}
              onChange={handleChange}
              type="number"
              fullWidth
            />

            <TextField
              label="Popularity Rating"
              name="popularity_rating"
              value={formData.popularity_rating}
              type="number"
              onChange={handleChange}
              fullWidth
            />

            {/* Row 4 - Full width */}
            <TextField
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{
                gridColumn: {
                  xs: "1",
                  sm: "1 / -1",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleClose}
            color="inherit"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            {isCreate ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CharacterModal;