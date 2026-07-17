import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./characters/Characters";
import Species from "./species/Species";
import Factions from "./factions/Factions";
import Roles from "./roles/Roles";

function App() {
  return (
    <>
      <Router>
        <h1>Vite + React</h1>
        <NavigationHeader />

        <Routes>
          <Route path="/characters" element={<Characters />} />
          <Route path="/species" element={<Species />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
