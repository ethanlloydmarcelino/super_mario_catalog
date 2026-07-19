import { AppBar, Button, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavigationHeader = () => {
    const navigate = useNavigate();

    return (
        <>
            <AppBar postition="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Button onClick={() => {navigate("/characters")}} variant="outlined" color="white">Characters</Button>
                    <Button onClick={() => {navigate("/species")}} color="white">Species</Button>
                    <Button onClick={() => {navigate("/factions")}} variant="outlined" color="white">Factions</Button>
                    <Button onClick={() => {navigate("/roles")}} color="white">Roles</Button>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavigationHeader;
