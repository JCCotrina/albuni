import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { AppBar } from "@material-ui/core";
import { ThumbUp, ThumbDownAlt } from "@material-ui/icons";
//import axios from "axios";

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
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const getImage = function (card) {
  //return "https://picsum.photos/400?random=" + card;
  return "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg";
};

const cardsList = [
  {
    autor: "freider",
    descripcion: "Bienvenidos a esta increible aventura",
    foto: "https://picsum.photos/400?random=1",
    likes: "1239",
    dislikes: "12"
  },
  {
    autor: "freider",
    descripcion: "Bienvenidos a esta increible aventura",
    foto: "https://picsum.photos/400?random=2",
    likes: "1239",
    dislikes: "12"
  },
  {
    autor: "freider",
    descripcion: "Bienvenidos a esta increible aventura",
    foto: "https://picsum.photos/400?random=3",
    likes: "1239",
    dislikes: "12"
  },
  {
    autor: "freider",
    descripcion: "Bienvenidos a esta increible aventura",
    foto: "https://picsum.photos/400?random=4",
    likes: "1239",
    dislikes: "12"
  }
];

export default function Album() {
  var [cards,setCards] = useState(cardsList);
  /* useEffect(()=>{
    axios.get("/api/album" )
        .then(res => {
            console.log(res);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  },[]) */

  const classes = useStyles();
  const darLike = function (index) {
    //console.log (card);
    var newCards = [...cards];
    newCards[index].likes=String(parseInt(newCards[index].likes)+1);
    setCards(newCards)
    //let newLikes = likes;
    //newLikes[id - 1] += 1;
    //setCountLikes([...newLikes]);
  };
  const darDislike = function (index) {
    var newCards = [...cards];
    newCards[index].dislikes=String(parseInt(newCards[index].dislikes)+1);
    setCards(newCards)
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              ALBUNI
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Bienvenido a nuestra comunidad, en este espacio puedes compartir tus fotos. 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.foto}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Autor: {card.autor}
                    </Typography>
                    <Typography>
                      {card.descripcion}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      name="test"
                      size="small"
                      color="primary"
                      onClick={()=>darLike(i)}
                    >
                      <ThumbUp />
                    </Button>
                    <p>{card.likes}</p>
                    <Button
                      size="small"
                      color="primary"
                      onClick={()=>darDislike(i)}
                    >
                      <ThumbDownAlt />
                    </Button>
                    <p>{card.dislikes}</p>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
