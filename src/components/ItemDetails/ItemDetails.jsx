import React, {useContext, useEffect, useState} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {ItemsContext} from '../../context/ItemsContext';
import Navigation from "../Navigation/Navigation";
import TextField from "@mui/material/TextField";
import {Alert, Button, Snackbar} from "@mui/material";
import {UserContext} from "../../context/UserContext";
import axios from "axios";
import {useParams} from "react-router-dom";
import {ITEMS_SAVE_ITEM} from "../../constants/links";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function ItemDetails() {
  const { productId } = useParams();
  const {user} = useContext(UserContext)
  const {getItemDetails, itemDetails, resetItemDetails, loading} = useContext(ItemsContext);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = useState(false);

  const [itemNo, setItemNo] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('');
  const [remarks, setRemarks] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');

  console.log(productId);

  useEffect(() => {
    if (productId === 'new') {
      resetItemDetails();
    } else {
      getItemDetails(productId);
    }
  }, [productId])

  useEffect(() => {
    setItemNo(itemDetails.item_no);
    setImageUrl(itemDetails.url);
    setColor(itemDetails.color);
    setRemarks(itemDetails.remarks);
    setDescription(itemDetails.description);
    setPrice(itemDetails.price);
    setQuantity(itemDetails.quantity);
    setCategory(itemDetails.category);
  }, [itemDetails])

  const onSaveClick = () => {
    console.log(color, remarks, description, price, quantity);
    axios
      .post(ITEMS_SAVE_ITEM(productId === 'new' ? 0 : productId), {
        item_no: itemNo, url: imageUrl, color, remarks, description, price, quantity, category
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
            <Box component="img" sx={{height: 90, objectFit: "cover", borderRadius: "10px"}} src={imageUrl} alt={""} />
            <TextField label={'ссылка на картинку'} value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2}>
              <TextField label={'номер детали'} value={itemNo || ''} onChange={e => setItemNo(e.target.value)}/>
              <TextField label={'цвет'} value={color || ''} onChange={e => setColor(e.target.value)}/>
              <TextField label={'пометки'} value={remarks || ''} onChange={e => setRemarks(e.target.value)}/>
              <TextField label={'описание'} value={description || ''} onChange={e => setDescription(e.target.value)}/>
              <TextField label={'цена'} type={'number'} value={price || ''} onChange={e => setPrice(e.target.value)}/>
              <TextField label={'количество'} type={'number'} value={quantity || ''} onChange={e => setQuantity(e.target.value)}/>
              <TextField label={'категория'} value={category || ''} onChange={e => setCategory(e.target.value)}/>
              <Typography align={"left"} gutterBottom>
                Категорию обязательно заполнять через ' / '
              </Typography>
              <Button onClick={onSaveClick}>Сохранить</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
