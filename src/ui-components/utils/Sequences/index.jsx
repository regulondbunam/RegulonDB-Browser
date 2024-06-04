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
