import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from "./home/Home";
import Trip from "./trip/Trip";


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/trip"} element={<Trip />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;

