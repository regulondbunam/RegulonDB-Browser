import React from "react";
import imgDataset from "./media/datasetsExp.png";
import imgDataset1 from "./media/datasetsExp1.png";
import imgDataset2 from "./media/datasetsExp2.png";
import imgDataset3 from "./media/datasetsExp3.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PageMap from "./pageMap";
import { Summary, ReleaseInfo } from "./infoApp";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GRID_CONTENT = [
  {
    id: "High_Throughput",
    xs: 3,
    section: "HT Dataset Collection",
    title: "High Throughput",
    description: `Genomics has set the basis for a variety of methodologies that produce high-throughput datasets identifying the different players that define gene regulation, particularly regulation of transcription initiation and operon organization. 
    We report several collections of HT datasets that hold distinct types of objects (genomic features, TF binding sites, gene expression profiles) from distinct types of HT experiments (RNA-seq, ChIP-seq, gSELEX, DAP-seq, ChIP-exo). `,
    url: "/ht",
    imgUrl: imgDataset,
  },
  {
    id: "GENSOR Unit",
    xs: 3,
    section: "Browser",
    title: "GENSOR Unit (GUs)",
    description: `The ability of a cell to respond to changes inside the cell or in the environment initiates when the new signal or stimulus is sensed and transmitted through a series of molecular concatenated reactions, called signal transduction or transduction pathways. These events bring into action genetic switches that modify gene expression to produce the adequate response to the cell. We call these processes genetic Sensory Response Units, or Gensor Unit.`,
    url: "/gu",
    imgUrl: imgDataset1,
  },
  {
    id: "coexpression",
    xs: 3,
    section: "Dataset and Tool",
    title: "Gene Coexpression",
    description: `One of the extensive uses of HT technologies is for the development of global expression profiles. As mentioned before, dedicated databases with information on E. coli include COLOMBOS.
    To quantify coexpression for all combinations of gene pairs, we implemented a rank-based approach, using data available in COLOMBOS version 2.0, which contains expression profiles of 2470 different, contrasting conditions.`,
    url: "/coexpression",
    imgUrl: imgDataset2,
  },
  {
    id: "DTT",
    xs: 3,
    section: "Tool",
    title: "Drawing Traces Tool (DTT)",
    description: `Genetic elements drawing tool, utilizing information from RegulonDB or provided by the user. Features such as genes, promoters, operons, DNA binding sites, and any other genetic element have been designed for accurate representation.`,
    url: "/dtt",
    imgUrl: imgDataset3,
  },
  /*
  {
    id: "",
    xs: 6,
    section: "",
    title: "",
    description: "",
    url: "",
  },
  */
];

export function Body() {
  const carruselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 10000,
    cssEase: "linear",
    variableWidth: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 10000,
          cssEase: "linear",
          variableWidth: false,
        },
      }
    ],
  };

  const cardData = [<PageMap />, <ReleaseInfo />, <Summary />];

  return (
    <Box sx={{ flexGrow: 1, p: "10px 6% 10px 6%"}}>
      <div style={{ height: "180px", width: "100%" }}>
        <Slider {...carruselSettings}>
          {cardData.map((card, index) => (
            <div key={"card_" + index} style={{ width: 500, height: 175}}>
              <div style={{ width: 450, height: 175 }}>
                <Card style={{ width: 450, height: 170, paddingInline:5 }}>{card}</Card>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <br />
      <div>
        <Grid container spacing={1}>
          {GRID_CONTENT.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={"card_" + index + "_" + card.id}
            >
              <Card sx={{ minWidth: 275, minHeight: 450 }} elevation={3}>
                {card?.imgUrl && (
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "10.25%",
                    }}
                    image={card.imgUrl}
                  />
                )}
                <CardContent>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {card.section}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body1">{card.description}</Typography>
                </CardContent>
                <CardActions>
                  {card.url && (
                    <Link to={card.url}>
                      <Button color="secondary">let's go!</Button>
                    </Link>
                  )}
                  {card.links && (
                    <div>
                      {card.links.map((link) => (
                        <div key={link.url}>
                          <Link key={link.url} to={link.url}>
                            <Button color="secondary" size="small">
                              {link.label}
                            </Button>
                          </Link>
                          <br />
                        </div>
                      ))}
                    </div>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
