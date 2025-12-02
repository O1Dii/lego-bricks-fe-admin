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
import {
  CART_PDF_SAVE,
  ITEMS_SAVE_ITEM,
  ORDERS_DELETE_ORDER_BY_ID,
  ORDERS_SAVE_AS_WANTED_LIST_BY_ORDER_ID,
  ORDERS_SAVE_COMMENT_BY_ORDER_ID
} from "../../constants/links";
import {SettingsContext} from "../../context/SettingsContext";


export default function OrderDetails() {
  const { orderId } = useParams();
  const {user} = useContext(UserContext)
  const {getOrderDetails, orderDetails} = useContext(OrdersContext);
  const {rub, byn} = useContext(SettingsContext);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // if (user.accessToken) {
      getOrderDetails(orderId);
    // }
  }, [orderId])

  useEffect(() => {
    setComment(orderDetails.comment);
  }, [orderDetails]);

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

  const onSaveCommentClick = () => {
    axios
      .post(ORDERS_SAVE_COMMENT_BY_ORDER_ID(orderId), {comment},{
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

  const saveAsWantedList = () => {
    axios
      .get(ORDERS_SAVE_AS_WANTED_LIST_BY_ORDER_ID(orderId), {
        responseType: 'blob'
      })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/xml' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'wanted_list.xml';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        setFailureSnackbarOpen(true);
      })
  }

  const saveAsPdf = (items) => {
    axios
      .post(CART_PDF_SAVE(), {items: items.map(item => ({id: item.id, quantity: item.quantity_in_order}))}, {
        responseType: 'blob'
      })
      .then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'order_details.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        setFailureSnackbarOpen(true);
      })
  }

  console.log(orderDetails)

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
          Операция прошла успешно!
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
              <Typography fontSize={20}>
                <strong>{Math.round(orderDetails.total_price * 100 + Number.EPSILON) / 100}$</strong>
              </Typography>
              <Typography fontSize={14} color={"#00000080"}>
                (~{
                  Math.round((parseFloat(orderDetails.total_price) * rub + Number.EPSILON) * 100) / 100
                } RUB, {
                  Math.round((parseFloat(orderDetails.total_price) * byn + Number.EPSILON) * 100) / 100
                } BYN)
              </Typography>
              <TextField label={'Комментарии'} onChange={(e) => setComment(e.target.value)} value={comment || ''}/>
              <CatalogTable items={orderDetails.items || []} withPagination={false} requireNavigate={false} urlBase={`/orders/${orderId}`} />
              <div><Button onClick={onSaveCommentClick}>Сохранить комментарий</Button></div>
              {orderDetails.status === 'исполнен' ? <></> :
                <div><Button onClick={onDeleteClick}>Завершить и удалить заказ</Button></div>
              }
              <div><Button onClick={saveAsWantedList}>Выгрузить в wanted list</Button></div>
              <div><Button onClick={() => saveAsPdf(orderDetails.items)}>Выгрузить в pdf</Button></div>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
