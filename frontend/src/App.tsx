import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
// import HomePage from "./app/home";
import theme from "./theme";
import Register from "./app/login";

function App() {

  return (
    <ChakraProvider theme={theme} >
      {/* <HomePage/> */}
      <Register />
    </ChakraProvider>
    
  );
}

export default App;
