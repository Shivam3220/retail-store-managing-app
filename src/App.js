import './App.css';

import Navbar from "./components/Navbar"
import Form from "./components/Form"
import Bill from "./components/Bill"
import Mystate from "./context/myState" 

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditStock from './components/EditStock';

function App() {


  return (
    <>
      <Mystate>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="*" element={<><Bill /><Form /></>} />
            <Route exact path="/edit" element={<EditStock/>} />
          </Routes>

        </Router>

      </Mystate>
    </>
  );
}

export default App;
