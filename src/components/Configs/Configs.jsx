import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navigation from "../Navigation/Navigation";
import TextField from "@mui/material/TextField";
import {Alert, Button, Snackbar} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {CONFIGS_GET_EXCHANGE_RATES, CONFIGS_SAVE_EXCHANGE_RATES} from "../../constants/links";
import axios from "axios";
import {UserContext} from "../../context/UserContext";
import Stack from "@mui/material/Stack";


export default function Configs() {
  const {user, logout} = useContext(UserContext)
  // TODO: change to true
  const [loading, setLoading] = useState(false);
  const [rusRub, setRusRub] = useState(0);
  const [belRub, setBelRub] = useState(0);
  const [min, setMin] = useState(0);

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [failureSnackbarOpen, setFailureSnackbarOpen] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(CONFIGS_GET_EXCHANGE_RATES())
      .then(response => {
        setLoading(false);
        setBelRub(response.data.byn)
        setRusRub(response.data.rub)
        setMin(response.data.min)
      })
      .catch(error => {
        setLoading(false);
      })
  }, [])

  const onSave = (e) => {
    e.preventDefault();
    axios
      .post(CONFIGS_SAVE_EXCHANGE_RATES(), {
        rub: rusRub,
        byn: belRub,
        min
      }, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
      .then(response => {
        setSuccessSnackbarOpen(true)
      })
      .catch(error => {
        setFailureSnackbarOpen(true);
      })
  }

  const handleExitClick = () => {
    logout();
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
      <Box className={"main-page-content"}>
        <Grid container spacing={0} sx={{padding: "20px"}}>
          <Grid item xs={12}>
            <Typography variant="h4" align="left" gutterBottom>
              <strong>
                Настройки
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component={"form"} onSubmit={onSave}>
              <Stack spacing={2}>
                <TextField label="Курс российского рубля к доллару" type={'number'} step="any" value={rusRub || ''} onChange={(e) => setRusRub(e.target.value)} />
                <TextField label="Курс белорусского рубля к доллару" type={'number'} step="any" value={belRub || ''} onChange={(e) => setBelRub(e.target.value)} />
                <TextField label="Минимальная цена заказа" type={'number'} step="any" value={min || ''} onChange={(e) => setMin(e.target.value)} />
                <Button type={'submit'} disabled={!(rusRub && belRub && min)}>Сохранить</Button>
              </Stack>
            </Box>
            <Button onClick={handleExitClick}>Выйти из аккаунта</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
