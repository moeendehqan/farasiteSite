
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import ErrorPage from "./components/error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/404paage" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
