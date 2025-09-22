import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { PLACES_DATA} from "./static";
import Style from "./style.module.css"

export default function Places() {
    return (
        <div className={Style.container} >
            {PLACES_DATA.map((place) => <Place {...place} />)}
        </div>
    )
}

function Place({section = "", description ="", imgUrl = "", title="", url=""}) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 40 }}
                image={imgUrl}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={url}>
                    <Button size="small">LET'S GO!</Button>
                </Link>

            </CardActions>
        </Card>
    )
}