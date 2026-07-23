export const getFactions = async (character_id) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/${character_id}/factions`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const createFaction = async (character_id, factionData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/${character_id}/factions/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(factionData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const updateFaction = async (factionId, character_id, factionData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/${character_id}/factions/update/${factionId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(factionData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteFaction = async (factionId, character_id) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/${character_id}/factions/delete/${factionId}`,{
            method: 'DELETE'
        });
        return response.ok;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}