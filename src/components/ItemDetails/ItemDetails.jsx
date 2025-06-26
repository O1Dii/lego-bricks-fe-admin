import React, {useContext} from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {ItemsContext} from '../../context/ItemsContext';
import Navigation from "../Navigation/Navigation";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

export default function ItemDetails() {
  const {getItemDetails, loading} = useContext(ItemsContext);

  return (
    <>
      <Navigation>
      </Navigation>
      <Box className={"main-page-content"}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField label={'состояние'}/>
            <TextField label={'цвет'}/>
            <TextField label={'цена'}/>
            <TextField label={'количество на складе'}/>
            <TextField label={'картинка'}/>
            <Button>Сохранить</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
