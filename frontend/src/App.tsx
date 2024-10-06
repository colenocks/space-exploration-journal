import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PlanTrip from "./pages/PlanTrip";
import PlanetList from "./pages/PlanetList";
import PlanetDetails from "./pages/PlanetDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='/plan' element={<PlanTrip />} />
          <Route path='/planets' element={<PlanetList />} />
          <Route path='/planet/:id' element={<PlanetDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
