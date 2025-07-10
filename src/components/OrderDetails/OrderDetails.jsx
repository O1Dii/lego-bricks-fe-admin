import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Skeleton from "@mui/material/Skeleton";
import OrdersTable from "../OrdersTable/OrdersTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Button, CircularProgress, Snackbar} from "@mui/material";
import Navigation from "../Navigation/Navigation";
import {OrdersContext} from "../../context/OrdersContext";
import {UserContext} from "../../context/UserContext";
import TextField from "@mui/material/TextField";
import CatalogTable from "../CatalogTable/CatalogTable";
import Stack from "@mui/material/Stack";
import {useParams} from "react-router-dom";
import axios from "axios";
import {ITEMS_SAVE_ITEM, ORDERS_DELETE_ORDER_BY_ID} from "../../constants/links";


export default function OrderDetails() {
  const { orderId } = useParams();
  const {user} = useContext(UserContext)
  const {getOrderDetails, orderDetails} = useContext(OrdersContext);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = useState(false);

  useEffect(() => {
    // if (user.accessToken) {
      getOrderDetails(orderId);
    // }
  }, [orderId])

  const onDeleteClick = () => {
    axios
      .delete(ORDERS_DELETE_ORDER_BY_ID(orderId), {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
      .then(response => {
        setSuccessSnackbarOpen(true);
      })
      .catch(error => {
        setFailureSnackbarOpen(true);
      })
  }

  return (
    <>
      <Navigation>
      </Navigation>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSuccessSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Изменения успешно сохранены!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => setFailureSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setFailureSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Произошла ошибка!
        </Alert>
      </Snackbar>
      <Box className={"main-page-content"} sx={{margin: "40px"}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <TextField label={'Имя'} value={orderDetails.customer_name || ''}/>
              <TextField label={'Номер'} value={orderDetails.customer_telephone || ''}/>
              <TextField label={'Нужна ли доставка'} value={orderDetails.dostavka ? 'Да' : 'Нет'}/>
              <TextField label={'Общая сумма заказа'} value={orderDetails.total_price || ''}/>
                {/*TODO: here*/}
              <TextField label={'Комментарии'} value={'Пока не работает'}/>
              <CatalogTable items={orderDetails.items || []} withPagination={false} requireNavigate={false} urlBase={`/orders/${orderId}`} />
              <Button onClick={onDeleteClick}>Завершить и удалить заказ</Button>
              <Button>Выгрузить в xlsx (пока не работает)</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
