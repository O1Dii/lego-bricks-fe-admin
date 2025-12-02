import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import OrdersTable from "../OrdersTable/OrdersTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, CircularProgress} from "@mui/material";
import Navigation from "../Navigation/Navigation";
import {OrdersContext} from "../../context/OrdersContext";
import {UserContext} from "../../context/UserContext";
import Stack from "@mui/material/Stack";


export default function Orders() {
  const {user} = useContext(UserContext)
  const {orders, loadOrders} = useContext(OrdersContext);

  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    if (user.accessToken) {
      loadOrders(showDeleted);
    }
  }, [user.accessToken, showDeleted])

  return (
    <>
      <Navigation>
      </Navigation>
      <Box className={"main-page-content"}>
        <Grid container spacing={0}>
          <Grid item xs={12} sx={{padding: "20px"}}>
            <Stack direction={"row"} style={{justifyContent: "space-between"}}>
              <Typography variant="h4" align="left" gutterBottom>
                <strong>
                  Заказы
                </strong>
              </Typography>
              <Button onClick={() => setShowDeleted(!showDeleted)}>{showDeleted ? "Удалённые" : "Актуальные"}</Button>
            </Stack>
            <OrdersTable orders={orders.orders || []}/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
