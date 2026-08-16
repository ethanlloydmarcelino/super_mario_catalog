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

export const createRoles = async (rolesData) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/roles/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rolesData)
        });
        const parsedResponse = await response.json();
        return parsedResponse;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

// export const updateSpecies = async (speciesId, speciesData) => {
//     try {
//         const response = await fetch(`http://localhost:8000/catalog/species/update/${speciesId}`,{
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(speciesData)
//         });
//         const parsedResponse = await response.json();
//         return parsedResponse;
//     }
//     catch (error) {
//         console.error(error);
//         return null;
//     }
// }

export const deleteRoles = async (rolesId) => {
    try {
        const response = await fetch(`http://localhost:8000/catalog/roles/delete/${rolesId}`,{
            method: 'DELETE'
        });
        return response.ok;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}