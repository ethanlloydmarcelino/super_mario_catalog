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