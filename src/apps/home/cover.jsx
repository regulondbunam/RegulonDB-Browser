import { useSpring, animated } from "@react-spring/web";
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
// import {Button} from "@mui/material";

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
      }}
    >
        <img src={ecoliImgT3} alt="Ecoli RegulonDB" className="coverEcoliImg" />
      <Grid container >
        <Grid
          item
          xs={1}
          sx={{
            display: "flex",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <div>
            <img
              src={UNAM_LOGO}
              alt="logo unam"
              style={{ height: "auto", width: "100%", maxWidth: "90px" }}
            />
          </div>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            zIndex: 10
          }}
        >
          <Typography variant="h1Cover">The RegulonDB Database</Typography>
          <Typography variant="h2Cover">
            Escherichia coli K-12 Transcriptional Regulatory Network
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <div className="coverSearch">
            <Search />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <Stack direction="row" spacing={1}>
            {searchLinks.map((link) => {
              return (
                <Item elevation={0} key={"cover_link_" + link.label}>
                    {/*<Button variant="contained" fullWidth*/}
                    {/*        component={Link} to={link.link}*/}
                    {/*>*/}
                    {/*    <Typography className={'CollectionButton'}>*/}
                    {/*        {link.label}*/}
                    {/*    </Typography>*/}
                    {/*</Button>*/}
                  <Link style={{ color: "#ffffff", fontSize:"large", fontWeight: "bold", textDecoration: "link" }} to={link.link}>
                    {link.label}
                  </Link>
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
