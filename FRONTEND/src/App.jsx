import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./characters/Characters";
import Species from "./species/Species";
import Factions from "./factions/Factions";
import Roles from "./roles/Roles";
import NavigationHeader from './NavigationHeader/NavigationHeader'

function App() {
  return (
    <>
      <Router>
        <NavigationHeader />
        <div style={{ paddingTop: 50 }}> 
        <Routes>  
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
