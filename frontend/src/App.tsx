import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Page1 from "./components/Page1";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path='page1' element={<Page1 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
