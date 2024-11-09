import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import theme from "./theme";
import Dashboard from "./app/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./app/register";
import Login from "./app/login";
import EmergencyPreview from "./app/emergency-preview";
import Profile from "./app/profile";

function App() {

  return (
    <ChakraProvider theme={theme} >
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emergencies/:id" element={<EmergencyPreview />} />
        <Route path="/users/:id" element={<Profile/>} />
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
    
  );
}

export default App;
