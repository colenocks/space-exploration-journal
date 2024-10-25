import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PlanTrip from "./pages/PlanTrip";
import PlanetList from "./pages/PlanetList";
import PlanetDetails from "./pages/PlanetDetails";
import SpaceTripsChart from "./pages/SpaceTripsChart";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path='/plan' element={<PlanTrip />} />
        <Route path='/planets' element={<PlanetList />} />
        <Route path='/planets/:id' element={<PlanetDetails />} />
        <Route path='/charts' element={<SpaceTripsChart />} />
      </Route>
    </Routes>
  );
}

export default App;
