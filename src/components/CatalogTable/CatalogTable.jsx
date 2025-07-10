import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from "@mui/material";
import {Link, MemoryRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import PaginationItem from '@mui/material/PaginationItem';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import Pagination from '../Pagination/Pagination';
import {useContext, useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {ItemsContext} from "../../context/ItemsContext";

export default function CatalogTable({items, withPagination= true, requireNavigate = true, urlBase='catalog'}) {
  const navigate = useNavigate();
  const {perPage, setPerPage, pages} = useContext(ItemsContext);
  // end pagination

  const [data, setData] = useState([]);

  console.log(items);

  useEffect(() => {
    const currentData = items.map((product, index) => {
      return (
        <Paper sx={{
          width: {xs: "auto"},
          height: {xs: "auto"},
          padding: {xs: "5px", md: 0},
          margin: {xs: "10px auto", md: 0},
          backgroundColor: (index % 2 === 1) ? "" : "#f2f2f2",
          boxShadow: { md: "none", xs: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)" }
        }} onClick={() => {
          if (requireNavigate) {
            navigate(`/catalog/${product.id}`)
          }
        }}>
          <Grid container alignItems="center" spacing={2} sx={{marginTop: {xs: "15px", md: 'auto'}, marginBottom: "10px"}}>
            {/*<Grid xs={1} md={1}>*/}
            {/*  <Checkbox />*/}
            {/*</Grid>*/}
            <Grid sx={{display: "flex", alignItems: "center", justifyContent: {xs: "center"}}} xs={6} md={2}>
              <Box component="img" sx={{height: 90, objectFit: "cover", borderRadius: "10px"}} src={product.url} alt={""} />
            </Grid>
            <Grid xs={6} md={1}>
              {product.item_no}
            </Grid>
            <Grid xs={6} md={1}>
              {product.remarks}
            </Grid>
            <Grid xs={6} md={2}>
              {product.color}
            </Grid>
            <Grid xs={6} md={3}>
              {product.description}
            </Grid>
            <Grid xs={12} md={3}>
              <Stack>
                {product.quantity_in_order &&
                  <Typography>
                    Количество в заказе: {product.quantity_in_order}
                  </Typography>
                }
                <Typography>
                  Наличие: {product.quantity}
                </Typography>
                <Typography>
                  Цена: {product.price || product.unit_price}
                </Typography>
              </Stack>
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
            Нет добавленных товаров
          </strong>
        </Box>
      )
    }
  }, [items]);

  return (
    <div className="buyouts-table">
      <Box sx={{flexGrow: 1}}>
        {data && data.length &&
          <Grid sx={{display: {xs: "none", md: "flex"}, padding: "25px 0"}} container spacing={2}>
            {/*<Grid xs={1}>*/}
            {/*  <Checkbox />*/}
            {/*</Grid>*/}
            <Grid xs={2}>
              <strong>
                Изображение
              </strong>
            </Grid>
            <Grid xs={1}>
              <strong>
                Номер детали
              </strong>
            </Grid>
            <Grid xs={1}>
              <strong>
                Заметки
              </strong>
            </Grid>
            <Grid xs={2}>
              <strong>
                Цвет
              </strong>
            </Grid>
            <Grid xs={3}>
              <strong>
                Описание
              </strong>
            </Grid>
            <Grid xs={3}>
              <strong>
                Информация
              </strong>
            </Grid>
          </Grid>
        }
        {data}
      </Box>
      {items && withPagination &&
      <Pagination urlBase={urlBase} itemsLen={items.length} amountOfPages={pages} productsOnPage={perPage} setProductsOnPage={setPerPage}/>
      }
    </div>
  );
}
