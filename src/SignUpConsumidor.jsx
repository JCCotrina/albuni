import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { DropzoneArea } from "material-ui-dropzone";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import "./App.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  container:{
    padding:"20",
    backgroundColor:"white",
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
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUpConsumidor() {
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [newUser, setUser] = React.useState({});
  const handleChange = (event) => {
    var name = event.target.name;
    var userdata={
      ...newUser
    }
    userdata[name]=event.target.value;
    setUser(userdata);
  };
  const handleTerminos = (event) =>{
    event.preventDefault();
    setChecked(event.target.checked);
  }
  const validateData = ()=>{
    let isValid = true;
    let isDataCompleted=true;
    for (const attribute of Object.getOwnPropertyNames(newUser)) {
      if(newUser[attribute].length===0){
        alert("Debes completar todos los campos");
        isValid = false;
        isDataCompleted = false;
        break;
      }
    }
    if(isDataCompleted){
      if(!checked){
        alert("Por favor acepte los terminos y condiciones");
        isValid = false;
      }
      if(newUser["contraseña"].length <8){
        alert("La contraseña debe tener mas de 8 caracteres");
        isValid = false;
      }
      if(newUser["contraseña"] !== newUser["confirmar_contraseña"]){
        alert("Las contraseñas deben coincidir")
        isValid = false;
      }
      
    }
    
    return isValid;
  }
  const handleSubmit=(event) => {
    event.preventDefault();
    if(validateData()){
      axios.post("/api/registrar-consumidor", newUser )
        .then(res => {
          if(res.data.unico === false){
            alert("El nombre de usuario ingresado ya existe");
          }else if(res.data.ok){
            alert("Usuario creado satisfactoriamente");
            history.push('/consumidor');
          }
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); 
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
  }
  return (
    <div component="main" maxWidth="xs" className={classes.container} >
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Subir
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose} aria-label="form-dialog-title">
        <DialogTitle id ="form-dialog-title">
          Subir Imagen
        </DialogTitle>
        <DialogContent>
          <TextField
                  autoComplete="Nombre"
                  name="nombre"
                  variant="outlined"
                  required
                  fullWidth
                  id="NombreConsumidor"
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
                onDrop={e => {
                  var promesa;
                  e.forEach(item =>
                    promesa=getBase64(item)
                  );
                  promesa.then(function(result) {
                    newUser.imagen=result;  
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
