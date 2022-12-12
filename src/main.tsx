import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {GameContextProvider} from "./context/GameContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
