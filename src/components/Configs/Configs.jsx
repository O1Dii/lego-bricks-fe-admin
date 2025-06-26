import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Navigation from "../Navigation/Navigation";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import {useContext, useState} from "react";
import {CONFIGS_SAVE_EXCHANGE_RATES} from "../../constants/links";
import axios from "axios";
import {UserContext} from "../../context/UserContext";


export default function Configs() {
  const {user} = useContext(UserContext)
  const [rusRub, setRusRub] = useState(0);
  const [belRub, setBelRub] = useState(0);

  const onSave = (e) => {
    e.preventDefault();
    axios
      .post(CONFIGS_SAVE_EXCHANGE_RATES(), {
        rusRub,
        belRub
      }, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        }
      })
      .then(response => {
        alert('Успешно!')
      })
      .catch(error => {
        alert('Ошибка')
      })
  }

  return (
    <>
      <Navigation>
      </Navigation>
      <Box className={"main-page-content"}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="h4" align="left" gutterBottom>
              <strong>
                Настройки
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component={"form"} onSubmit={onSave}>
              <TextField label="Курс российского рубля к доллару" value={rusRub} onChange={(e) => setRusRub(e.target.value)} />
              <TextField label="Курс белорусского рубля к доллару" value={belRub} onChange={(e) => setBelRub(e.target.value)} />
              <Button type={'submit'}>Сохранить</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
