import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import axios from 'axios';
import { AppBar, Toolbar } from "@material-ui/core";
import CameraIcon from '@material-ui/icons/PhotoCamera';
import { useHistory } from "react-router-dom";
import Album from "./components/Album/Album";
import "./App.css";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  content: {
    margin: theme.spacing(0, 'auto',1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUpConsumidor() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [newUser, setUser] = React.useState({});
  const handleChange = (event) => {
    console.log(event.target.name);
    var name = event.target.name;
    var userdata={
      ...newUser
    }
    userdata[name]=event.target.value;
    setUser(userdata);
  };
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
        
    return isValid;
  }
  const handleSubmit=(event) => {
    event.preventDefault();
    alert(validateData());
    if(validateData()){
      axios.post("/api/registrar-consumidor", newUser )
        .then(res => { 
          if(res.data.ok){
            alert("Se pudo subir correctamente");
            setOpen(false);
          }
        })
        .catch(error => {
          alert('No se pudo subir la imagen');
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
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              ALBUNI
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Subir
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Album></Album>
      </div>
      <Dialog open={open} onClose={handleClose} aria-label="form-dialog-title">
         <DialogTitle id ="form-dialog-title" style={{textAlign:'center'}}>
           Subir Imagen
         </DialogTitle>
         <DialogContent dividers={true} >
           <TextField
                  autoComplete="Nombre"
                  name="nombre"
                  variant="outlined"
                  required
                  fullWidth
                  id="NombreConsumidor"
                  label="Nombre"
                  autoFocus
                  className={classes.content}
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
                className={classes.content}
                onChange={handleChange}
              />
            <DropzoneArea
                acceptedFiles={["image/*"]}
                dropzoneText={"Arrastre la imagen aqui"}
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
