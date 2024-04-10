import React from "react";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';


const mirrorData = {
  id: "ligth_regulonDB",
  xs: 3,
  section: "tool",
  title: "Mirror sites ",
  description: `Our RegulonDB mirror sites in the cities of Cuernavaca Morelos and Querétaro. Additionally, you have the option to download and install a local instance of RegulonDB application on your computer.`,
  links: [
    {
      url: "https://regulondb.liigh.unam.mx",
      label: "RegulonDB LIIGH UNAM",
    },
    {
      url: "https://regulondb.ccg.unam.mx/",
      label: "RegulonDB CCG UNAM",
    },
    {
      url: "/manual/apiSoftware/docker",
      label: "RegulonDB Docker (local instance)",
    },
  ],
};

export default function Mirrors({ unTitle = false }) {
  return (
    <Card sx={{ minWidth: "300px", maxWidth: "700px" }} >
      {!unTitle && (
        <Typography variant="body1" >
          <b>{mirrorData.title}</b>
        </Typography>
      )}
      <div style={{ marginLeft: "10px" }}>
        <Typography variant="body2">{mirrorData.description} </Typography>
        {mirrorData.links.map((link, index) => {
          return (
            <Link key={"link_" + index} to={link.url}>
              <Typography color="secondary">{link.label}</Typography>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
