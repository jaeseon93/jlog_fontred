import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from "./home/Home";
import Trip from "./trip/Trip";
import Plant from "./plant/Plant";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/trip"} element={<Trip />} />
            <Route path={"/plant"} element={<Plant />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

