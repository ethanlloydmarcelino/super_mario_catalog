import { getFactions } from "../services/factionService";
import { useEffect, useState } from "react";

const Factions = () => {
    const [factions, setFactions] = useState([]);

    useEffect(() => {
        async function fetchData () {
             try {
            const data = await getFactions();
            setFactions(data);
            } 
            catch (error){
                console.error(error);
            }
        }
        fetchData(); 
    }, [])

    console.log(factions)

    return <h1>Factions</h1>;
};

export default Factions;
