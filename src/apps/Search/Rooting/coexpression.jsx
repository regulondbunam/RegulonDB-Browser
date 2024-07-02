import { useEffect } from "react";
import { Cover } from "ui-components/Web/Cover";
import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGetGeneIdByNames from "./genesIdByName";



//araA araB araD AraC coexpression
export default function CoexpressionResults({ keyword = "" }) {
    const navigate = useNavigate();
    const geneList = keyword.split(" ");
    const { ids, noFound, loading } = useGetGeneIdByNames(geneList)

    useEffect(() => {
        if (ids && noFound.length === 0) {
            navigate(`/coexpression/${ids.map(id => "geneId" + id).join("&")}`)
        }
    }, [ids, noFound, navigate])


    if (loading) {
        return (
            <Cover state={"loading"} >
                <div style={{ marginLeft: "10%" }}>
                    <Typography variant="h1" color={"white"} >Redirect to coexpression dataset Tool</Typography>
                    <Typography variant="relevant" color={"white"} >Validating gene names ...</Typography>
                </div>
            </Cover>
        )
    }
    if (ids) {
        return (
            <div>
                <Cover state={noFound.length > 0 ? "error" : "done"} >
                    <div style={{ marginLeft: "10%" }}>
                        <Typography variant="h1" color={"white"} >Gene Found!!!</Typography>
                        {noFound.length === 0 ? (
                            <Typography variant="relevant" color={"white"} >Redirecting...</Typography>
                        ) : (
                            <Typography variant="relevant" color={"white"} >sorry but, some genes could not be found...</Typography>
                        )}
                    </div>
                </Cover>
                {noFound.length > 0 && (<div style={{ margin: "1%", display: "flex", justifyContent: "center" }}>
                    <Card sx={{ width: 275 }} >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Gene no found
                            </Typography>
                            <Typography variant="relevantB" component="div">
                                {noFound.join(", ")}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={() => {
                                    navigate(`/coexpression/${ids.map(id => "geneId" + id).join("&")}`)
                                }}
                                variant="contained" color="secondary" >Continue </Button>
                        </CardActions>
                    </Card>
                </div>)}

            </div>
        )
    }
    return null
}
