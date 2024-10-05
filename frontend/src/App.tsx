import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import PlanTrip from "./pages/PlanTrip";
import TripsJournal from "./pages/TripsJournal";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='/plan' element={<PlanTrip />} />
          <Route path='/trips' element={<TripsJournal />} />
          <Route path='/trip/:tripName' element={<TripDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
