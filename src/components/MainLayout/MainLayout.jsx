import React from "react";
import {Outlet} from 'react-router-dom';
import Box from "@mui/material/Box";
import ItemsContextProvider from "../../context/ItemsContext";
import OrdersContextProvider from "../../context/OrdersContext";

function MainLayout() {
  return (
    <div className="App">
        <ItemsContextProvider>
          <OrdersContextProvider>
            <Box sx={{display: 'flex'}}>
              <Box sx={{width: "100%"}}>
                <Outlet />
              </Box>
            </Box>
          </OrdersContextProvider>
        </ItemsContextProvider>
    </div>
  );
}

export default MainLayout;
