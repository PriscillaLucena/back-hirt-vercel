import React from "react"
import { GlobalState } from "./Global/GlobalState";
import Router from "./Routes/Router";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalState>
        <Router />
      </GlobalState>
    // </ThemeProvider>
  );
}

export default App;
