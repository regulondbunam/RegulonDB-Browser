import {Link} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {useMediaQuery} from "react-responsive"

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function Links() {
    const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

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

    if(isMobile){

        return (
            <div style={{width: "100%"}} >
                <Stack direction={{xs:"row", md:"row"}} sx={{
                    display: "grid",
                    width: "100%",
                    maxWidth: "100%",
                    gridTemplateColumns:
                        `repeat(2, 1fr)`,

                }}>
                    {searchLinks.map((link, index) => {
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
            </div>
        )
    }
    return(
        <Stack direction={{xs:"row", md:"row"}} spacing={1}>
            {searchLinks.map((link) => {
                return (
                    <Item elevation={0} key={"cover_link_" + link.label}>
                        <Link to={link.link}
                              style={{
                                  color: "#ffffff", fontSize:"large", textDecoration: "link",
                              }}
                        >
                            {link.label}
                        </Link>
                    </Item>
                );
            })}
        </Stack>
    )
}