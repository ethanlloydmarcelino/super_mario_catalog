export const getSpecies = async (character_id) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/characters/${character_id}/species`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const getAllSpecies = async () => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/species/`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const createSpecies = async (speciesData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/species/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(speciesData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const updateSpecies = async (speciesId, speciesData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/species/update/${speciesId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(speciesData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteSpecies = async (speciesId) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/species/delete/${speciesId}`,{
            method: 'DELETE'
        });
        return response.ok;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}