import { getFactions } from "../services/factionService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Factions = () => {
  const [factions, setFactions] = useState([]);

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
    { field: "character_id", headerName: "Character_id", width: 150 },
    { field: "faction_name", headerName: "Faction Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 }
  ];

  console.log(factions);

  return (
    <>
      <h1>Factions</h1>
      <DataGrid rows={factions} columns={columns}></DataGrid>
    </>
  );
};

export default Factions;
