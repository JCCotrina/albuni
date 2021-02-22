import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";
import { AppBar, Toolbar } from "@material-ui/core";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Album from "./components/Album/Album";
import "./App.css";

const second = 2000;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20",
    backgroundColor: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpConsumidor() {
  var list_ip = ["http://192.168.0.24:", "http://192.168.0.19:"];

  const [API_BASE, setAPI] = React.useState(list_ip[0]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [newUser, setUser] = React.useState({});
  const handleChange = (event) => {
    var name = event.target.name;
    var userdata = {
      ...newUser,
    };
    userdata[name] = event.target.value;
    setUser(userdata);
  };
  const handleTerminos = (event) => {
    event.preventDefault();
    setChecked(event.target.checked);
  };
  const validateData = () => {
    let isValid = true;
    let isDataCompleted = true;
    for (const attribute of Object.getOwnPropertyNames(newUser)) {
      if (newUser[attribute].length === 0) {
        alert("Debes completar todos los campos");
        isValid = false;
        isDataCompleted = false;
        break;
      }
    }
    if (isDataCompleted) {
      if (!checked) {
        alert("Por favor acepte los terminos y condiciones");
        isValid = false;
      }
      if (newUser["contraseña"].length < 8) {
        alert("La contraseña debe tener mas de 8 caracteres");
        isValid = false;
      }
      if (newUser["contraseña"] !== newUser["confirmar_contraseña"]) {
        alert("Las contraseñas deben coincidir");
        isValid = false;
      }
    }
    return isValid;
  };

  setInterval(function () {
    list_ip.some((e) => {
      axios
        .post(`${e}${8001}/api/say-hello`, {})
        .then((res) => {
          if (res.data.ok) {
            console.log(e);
            console.log(res.data);
            setAPI(e);
            localStorage.setItem("ip", e);
            return true;
          }
        })
        .catch((error) => {
          console.log("ip", e);
        });
    });
  }, second);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateData()) {
      axios
        .post(`${API_BASE}${8002}/api/subir-foto`, newUser)
        .then((res) => {
          console.log();
          if (res.data.response.likes === 0) {
            alert("Se pudo subir correctamente");
            setOpen(false);
          }
        })
        .catch((error) => {
          alert("No se pudo subir la imagen");
          console.log(newUser);
        });
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  return (
    <div component="main" maxWidth="xs" className={classes.container}>
      <div>
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              ALBUNI
            </Typography>
            <Button
              variant="contained"
              color="secundarya"
              onClick={handleClickOpen}
              style={{ "margin-left": "auto" }}
            >
              Subir
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Album server={API_BASE}></Album>
      </div>
      <Dialog open={open} onClose={handleClose} aria-label="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>
          Subir Imagen
        </DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            autoComplete="Nombre"
            name="dueño"
            variant="outlined"
            required
            fullWidth
            id="dueño"
            label="Nombre"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            autoComplete="Descripción"
            name="descripcion"
            variant="outlined"
            required
            fullWidth
            id="Descripcion"
            label="Descripcion"
            autoFocus
            onChange={handleChange}
          />
          <DropzoneArea
            acceptedFiles={["image/*"]}
            dropzoneText={"Arrastre la foto de perfil"}
            onDrop={(e) => {
              var promesa;
              e.forEach((item) => (promesa = getBase64(item)));
              promesa.then(function (result) {
                newUser.imagen = result;
              });
            }}
          />
          <DialogActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
