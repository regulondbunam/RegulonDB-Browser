// import { useSpring, animated } from "@react-spring/web";
import ecoliImgT3 from "./media/EcoliRegulonDBT3.webp";
import EcoliWall from "./media/coli.webp";
import UNAM_LOGO from "./media/unamLogo.png";
import Paper from "@mui/material/Paper";
import Search from "./search";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {Button} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const searchLinks = [
  {
    label: "Genes",
    link: "/gene",
  },
  {
    label: "Operon",
    link: "/operon",
  },
  {
    label: "Regulon",
    link: "/regulon",
  },
  {
    label: "Sigmulon",
    link: "/sigmulon",
  },
  {
    label: "GENSOR Unit",
    link: "/gu",
  },
  {
    label: "High Throughput",
    link: "/ht",
  },
];

export default function Cover() {
  return (
    <Paper
      elevation={0}
      square
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${EcoliWall})`,
        p: "2% 8% 2% 8%",
        animation: "moveBackground 120s linear infinite",
      }}
    >
        <style>
            {`
              @keyframes moveBackground {
                0% {
                  background-position: 0% 0%;
                }
                50% {
                  background-position: 100% 100%;
                }
                100% {
                  background-position: 0% 0%;
                }
              }
            `}
        </style>
        <img src={ecoliImgT3} alt="Ecoli RegulonDB" className="coverEcoliImg" />
      <Grid container>
        <Grid
            // UNAM LOGO
          item
          xs={1}
          sx={{
            // backgroundColor: "red", // DEBUG
            display: "flex",
            zIndex: 10,
            paddingBottom: "10px",
          }}
        >
            <img
                className={"UNAM_LOGO"}
                src={UNAM_LOGO}
                alt="logo unam"
                style={{
                    padding:"10%",
                    height: "100%",
                    width: "100%",
                }}
            />
        </Grid>
        <Grid
            // Title
          item
          xs={8}
          sx={{
            // backgroundColor: "blue", // DEBUG
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            zIndex: 10,
          }}
          className={"coverTitle"}
        >
          <Typography variant="h1Cover"  fontSize={{xs:"110%", md:"360%"}}>The RegulonDB Database</Typography>
          <Typography variant="h2Cover" >
            Escherichia coli K-12 Transcriptional Regulatory Network
          </Typography>
        </Grid>
        <Grid
            // Search bar
          item
          xs={12}
          sx={{
            alignItems: "center",
            zIndex: 10
          }}
          display={{xs:"none", md:"flex"}}
        >
          <div className="coverSearch">
            <Search />
          </div>
        </Grid>
        <Grid
            // Apps Links
          item
          xs={12}
          sx={{
            alignItems: "center",
            zIndex: 10,
          }}
          display={{xs:"none", md:"flex"}}
        >
          <Stack direction={{xs:"row", md:"row"}} spacing={1}>
            {searchLinks.map((link) => {
              return (
                <Item elevation={0} key={"cover_link_" + link.label}>
                  <Link to={link.link}
                    style={{
                      color: "#ffffff", fontSize:"large", fontWeight: "bold", textDecoration: "link",
                    }}
                  >
                    {link.label}
                  </Link>
                </Item>
              );
            })}
          </Stack>
        </Grid>
        <Grid
            // Apps Links mobile
            item
            xs={12}
            sx={{
                alignItems: "center",
                zIndex: 10
            }}
            display={{xs:"flex", md:"none"}}
        >
            <Stack direction={{xs:"row", md:"row"}} sx={{
                display: "grid",
                width: "100%",
                maxWidth: "100%",
                gridTemplateColumns:
                    `repeat(2, 1fr)`,

            }}>
                {searchLinks.map((link) => {
                    return (
                        <Item elevation={0} key={"cover_link_" + link.label}
                        >
                            <Button variant="contained" fullWidth
                                    component={Link} to={link.link}
                                    sx={{
                                        width: "100%",
                                        backgroundColor: "var(--color-blue2)"
                                    }}
                            >
                                <Typography
                                            sx={{
                                                color: "#fff",
                                                '@media (max-width: 400px)': {
                                                    fontWeight: "bold",
                                                    fontSize: "80%"
                                                }
                                            }}
                                >
                                    {link.label}
                                </Typography>
                            </Button>
                        </Item>
                    );
                })}
            </Stack>
        </Grid>
      </Grid>
      <br />
      
    </Paper>
  );
}
