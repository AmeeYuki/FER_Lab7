import "./App.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Contact from "./components/Contact";
import { Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.css";
import Detail from "./components/Detail";
import AddStaff from "./components/AddStaff";
import UpdateStaff from "./components/UpdateStaff";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/addNewStaff" element={<AddStaff />}></Route>
        <Route path="/updateStaff/:id" element={<UpdateStaff />}></Route>
      </Routes>
    </div>
  );
}

export default App;
