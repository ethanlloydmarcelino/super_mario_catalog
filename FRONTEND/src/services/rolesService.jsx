export const getAllRoles = async () => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/roles/`);
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

