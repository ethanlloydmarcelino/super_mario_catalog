export const getFactions = async () => {
    const response = await fetch('http://localhost:8000/super_mario_catalog/factions')
    const parsedResponse = await response.json()
    return parsedResponse;
}