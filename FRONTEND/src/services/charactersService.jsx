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
