import Format from "./Format";
import { Typography } from "@mui/material";
import "./secuence.css";

export function FastaSequence({
  id = "rdb_p_sequence",
  sequence,
  color = false,
  title = "",
  countItems = false,
  charactersPerLine = 60,
}) {
  let formatSequence = new Format(sequence, title, { countItems: countItems });
  return (
    <Typography variant="sequence" >
      <span
        id={id}
        dangerouslySetInnerHTML={{
          __html: formatSequence.getFastaFormat({
            color: color,
            charactersPerLine: charactersPerLine,
          }),
        }}
      />
    </Typography>
  );
}

export function ProteinSequence({
  id = "rdb_protein_sequence",
  sequence,
  color = false,
  title = "",
  countItems = false,
  viewMotifs = false,
  motifs,
  fontSize ="12px"
}) {
  let formatSequence = new Format(sequence, title, { countItems: countItems });
  return (
    <Typography variant="sequence" fontSize={fontSize} >
      <span
        id={id}
        style={{whiteSpace: "nowrap"}}
        dangerouslySetInnerHTML={{
          __html: formatSequence.getProteinFormat({ color: color, motifs: viewMotifs ? motifs : [] }),
        }}
      />
    </Typography>
  );
}

export function GenebankSequence({
  id = "rdb_p_sequence",
  sequence,
  color = false,
  title = "",
  countItems = false,
}) {
  let formatSequence = new Format(sequence, title, { countItems: countItems });
  return (
    <Typography variant="sequence" >
      <span
        id={id}
        dangerouslySetInnerHTML={{
          __html: formatSequence.getGenebankFormat({ color: color }),
        }}
      />
    </Typography>
  );
}
