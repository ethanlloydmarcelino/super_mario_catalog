export const getAllCharacters = async () => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const createCharacter = async (characterData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const updateCharacter = async (characterId, characterData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/update/${characterId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteCharacter = async (characterId) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/delete/${characterId}`,{
            method: 'DELETE'
        });
        return response.ok;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}