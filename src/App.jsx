import React from "react";
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';

import MainLayout from "./components/MainLayout/MainLayout";

import CssBaseline from "@mui/material/CssBaseline";

import "./styles/index.scss";
import {StylesProvider} from "@mui/styles";
import Catalog from "./components/Catalog/Catalog";
import Orders from "./components/Orders/Orders";
import Configs from "./components/Configs/Configs";
import Login from "./components/Login/Login";
import UserContextProvider from "./context/UserContext";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import SettingsContextProvider from "./context/SettingsContext";

// const theme = createTheme({
//   palette: {
//     secondary: {
//       main: '#E33E7F'
//     }
//   }
// });

function App() {
  return (
    <div className="App">
      <CssBaseline/>

      {/*<MuiThemeProvider theme={theme}>*/}
      <StylesProvider injectFirst>
        <Router>
          <UserContextProvider>
          <SettingsContextProvider>
            <Routes>
              <Route path="/admin/*" element={<Login/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route element={<MainLayout/>}>
                <Route exact path="/" element={<Navigate to="/catalog" replace/>}/>
                <Route path="/catalog" element={<Catalog/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/configs" element={<Configs/>}/>
                <Route path="/catalog/:productId?" element={<ItemDetails/>}/>
                <Route path="/orders/:orderId?" element={<OrderDetails/>}/>
              </Route>
            </Routes>
          </SettingsContextProvider>
          </UserContextProvider>
        </Router>
      </StylesProvider>
      {/*</MuiThemeProvider>*/}
    </div>
  );
}

export default App;
