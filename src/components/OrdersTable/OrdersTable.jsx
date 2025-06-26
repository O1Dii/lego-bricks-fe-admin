import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import Pagination from '../Pagination/Pagination';
import {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";

export default function OrdersTable({orders}) {
  const navigate = useNavigate();
  const [productsOnPage, setProductsOnPage] = useState(10);
  // end pagination

  const [data, setData] = useState([]);

  useEffect(() => {
    const currentData = orders.map((order, index) => {
      const priceSum = (order?.items || []).reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + price * quantity;
      }, 0);
      return (
        <Paper sx={{
          width: {xs: "auto"},
          height: {xs: "auto"},
          padding: {xs: "5px", md: 0},
          margin: {xs: "10px auto", md: 0},
          backgroundColor: (index % 2 === 1) ? "" : "#f2f2f2",
          boxShadow: { md: "none", xs: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)" }
        }} onClick={() => {
          navigate(`/orders/${order.id}`)
        }}>
          <Grid container alignItems="center" spacing={2} sx={{marginTop: {xs: "15px", md: 'auto'}, marginBottom: "10px"}}>
            <Grid xs={6} md={3}>
              {order.email}
            </Grid>
            <Grid xs={6} md={3}>
              {order.phone}
            </Grid>
            <Grid xs={6} md={3}>
              {order.address}
            </Grid>
            <Grid xs={6} md={3}>
              {priceSum}
            </Grid>
          </Grid>
        </Paper>
      )
    })

    if(currentData && currentData.length) {
      setData(currentData);
    } else {
      setData(
        <Box sx={{backgroundColor: "lightgrey", padding: "15px", borderRadius: "5px"}}>
          <strong>
            Нет заказов
          </strong>
        </Box>
      )
    }
  }, [orders]);

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        {data && data.length &&
          <Grid sx={{display: {xs: "none", md: "flex"}, padding: "25px 0"}} container spacing={2}>
            <Grid xs={3}>
              <strong>
                Email
              </strong>
            </Grid>
            <Grid xs={3}>
              <strong>
                Номер телефона
              </strong>
            </Grid>
            <Grid xs={3}>
              <strong>
                Адрес
              </strong>
            </Grid>
            <Grid xs={3}>
              <strong>
                Сумма заказа
              </strong>
            </Grid>
          </Grid>
        }
        {data}
      </Box>
      {orders &&
      <Pagination urlBase="cart" itemsLen={orders.length} productsOnPage={productsOnPage} setProductsOnPage={setProductsOnPage}/>
      }
    </div>
  );
}
