import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./screens/auth/Login";

 const App = () => {

    return (
        <div className="overflow-x-hidden">
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
