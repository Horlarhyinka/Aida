import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import HomePage from "./app/home";

function App() {

  return (
    <ChakraProvider>
      <HomePage/>
    </ChakraProvider>
    
  );
}

export default App;
