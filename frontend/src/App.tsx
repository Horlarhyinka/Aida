import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import theme from "./theme";
import Dashboard from "./app/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./app/login";
import Register from "./app/register";
import EmergencyPreview from "./app/emergency-preview";
import Profile from "./app/profile";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <ChakraProvider theme={theme} >
      <BrowserRouter>
      <Toaster />
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
