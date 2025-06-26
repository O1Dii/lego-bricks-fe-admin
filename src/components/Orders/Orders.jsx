import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import OrdersTable from "../OrdersTable/OrdersTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";
import Navigation from "../Navigation/Navigation";
import {OrdersContext} from "../../context/OrdersContext";
import {UserContext} from "../../context/UserContext";


export default function Orders() {
  const {user} = useContext(UserContext)
  const {orders, loadOrders} = useContext(OrdersContext);

  useEffect(() => {
    // if (user.accessToken) {
      loadOrders();
    // }
  }, [user.accessToken])

  return (
    <>
      <Navigation>
      </Navigation>
      <Box className={"main-page-content"}>
        <Grid container spacing={0}>
          <Grid item xs={12} sx={{padding: "20px"}}>
            <Typography variant="h4" align="left" gutterBottom>
              <strong>
                Заказы
              </strong>
            </Typography>
            <OrdersTable orders={orders}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
