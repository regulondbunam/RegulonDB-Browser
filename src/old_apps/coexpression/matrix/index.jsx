import React from 'react'
import Grid from './grid';
import "./matrix.css"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export default function Matrix({genesInformation,matrices, addMatrix}) {

  //console.log(genesInformation);

  const rankValues = [
    { rgbColor: "rgb(0, 242, 60)", rank: "1-43" },
    { rgbColor: "rgb(0, 217, 54)", rank: "44-173" },
    { rgbColor: "rgb(0, 178, 45)", rank: "174-389" },
    { rgbColor: "rgb(0, 102, 26)", rank: "390-691" },
    { rgbColor: "rgb(32, 64, 0)", rank: "692-1080" },
    { rgbColor: "rgb(102, 0, 0)", rank: "1081-1555" },
    { rgbColor: "rgb(140, 0, 0)", rank: "1556-2117" },
    { rgbColor: "rgb(178, 0, 0)", rank: "2118-2765" },
    { rgbColor: "rgb(217, 0, 0)", rank: "2766-3499" },
    { rgbColor: "rgb(255, 0, 0)", rank: "3500-4320" }
];

  return (
    <div id="matrixDescription">
        <div style={{ margin: "10px 0 10px 5px", display: "flex" }}>
        <div style={{display: "flex", alignItems: "center"}} >
          <HelpOutlineIcon sx={{color: "blue"}} fontSize="large" />
        </div>
        <div>
          <p>This section targets matrixHeatMap...". The table can be sorted by any of the features by clicking on the name of the column associated with the feature.</p>
        </div>
      </div>
        <h2>Color range</h2>
        <p>
            The coexpression strength of a gene pair is given by the SCR (Spearman Correlation Rank, user guide). Each coexpression block is colored by a logarithmic color-scale (see legend). The highest value (high coexpression) is SCR=1 and the lowest value (no coexpression) is SCR=4320.
        </p>
        <br />
        <br />
        <div>
            <table>
                <thead><tr><th colSpan={5}>High Coexpression</th><th colSpan={5} style={{ textAlign: "right" }}>No Coexpression</th></tr></thead>
                <tbody>
                    <tr>
                        {rankValues.map((value, index) => { return <td key={"cellRgbColor" + value.rgbColor + index} style={{ backgroundColor: value.rgbColor, height: "18px" }} /> })}
                    </tr>
                    <tr>
                        {rankValues.map((value, index) => { return <td key={"cellRank" + value.rank + index} style={{ height: "18px", textAlign: "center" }} >{value.rank}</td> })}
                    </tr>
                </tbody>
            </table>
        </div>
        <br />
        <h2>Coexpression Matrix</h2>
        <div>
            <Grid genesInformation={genesInformation} matrices={matrices} addMatrix={addMatrix} />
        </div>
    </div>
  )
}
