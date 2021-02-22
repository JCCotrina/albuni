import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, GridListTile } from "@material-ui/core/";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { AppBar } from "@material-ui/core";
import { ThumbUp, ThumbDownAlt } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const getImage = function (card) {
  //return "https://picsum.photos/400?random=" + card;
  return "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg";
};

const cardsList = [
  {
    id: "12344",
    dueño: "freider",
    descripcion: "Bienvenidos a esta increible aventura",
    imagen: "https://picsum.photos/400?random=1",
    likes: "1239",
    dislikes: "12",
  },
];

export default function Album(props) {
  var [cards, setCards] = useState(cardsList);
  var server2 = props.server;
  var [server, setServer] = useState(server2);
  useEffect(() => {
    setServer(server2);
  }, [server2]);
  console.log("holaaaa", server);
  useEffect(async () => {
    await axios
      .post(`${server}8003/api/get-fotos`)
      .then((res) => {
        console.log(res);
        let backCards = res.data.response;
        setCards(backCards);
        console.log(backCards);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const classes = useStyles();
  const darLike = function (index) {
    //console.log (card);
    var newCards = [...cards];
    newCards[index].likes = String(parseInt(newCards[index].likes) + 1);
    setCards(newCards);
    let payload = {
      action: "like",
      fotoId: cards[index]._id,
    };
    axios
      .post(`${server}8003/api/like`, payload)
      .then((res) => {
        console.log("like", res);
      })
      .catch((error) => {
        alert("Intentelo otra vez");
        console.error("There was an error!", error);
      });
    //let newLikes = likes;
    //newLikes[id - 1] += 1;
    //setCountLikes([...newLikes]);
  };
  const darDislike = function (index) {
    var newCards = [...cards];
    newCards[index].dislikes = String(parseInt(newCards[index].dislikes) + 1);
    setCards(newCards);
    let payload = {
      action: "dislike",
      fotoId: cards[index]._id,
    };
    axios
      .post(`${server}8003/api/like`, payload)
      .then((res) => {
        console.log("like", res);
      })
      .catch((error) => {
        alert("Intentelo otra vez");
        console.error("There was an error!", error);
      });
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
              "Lo más importante no es la cámara, sino el ojo." Alfred
              Eisenstaedt
            </Typography>
            {/* <div className={classes.heroButtons}>
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
                        </div> */}
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  {
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.imagen}
                      title="Image title"
                    />
                  }
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Autor: {card.dueño}
                    </Typography>
                    <Typography>{card.descripcion}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      name="test"
                      size="small"
                      color="primary"
                      onClick={() => darLike(i)}
                    >
                      <ThumbUp />
                    </Button>
                    <p>{card.likes}</p>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => darDislike(i)}
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
          Recuerda:
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          “La fotografía es, antes que nada, una manera de mirar. No es la
          mirada misma”. Susan Sontag
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
