
import DrawingTracesTool from "../../../components/DrawingTracesTool";
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from "react";
import Table from "../table";
import {
  STATE_FORM,
} from "./definitions";

function DrawTrace({
  state = {...STATE_FORM},
}) {
  const [load, setLoad] = useState(false);
  const [geneticElements, setGeneticElements] = useState([])
  const objectType = []
  state.objectType.forEach(ge => {
    if (ge.isCheck) {
      objectType.push(ge.key)
    }
  });
  //console.log(objectType);
  return (
    <div>
      <div>{load && <LinearProgress />}</div>
      <div>
        <DrawingTracesTool
          id={"rdb_dti_001"}
          context={"dti"}
          height={200}
          leftEndPosition={+state.leftEndPosition}
          rightEndPosition={+state.rightEndPosition}
          strand={state.strand}
          covered={state.covered}
          objectType={objectType}
          getGeneticElements={(ge) => {
            setGeneticElements(ge);
          }}
          getStatus={(status) => {
            setLoad(status === "loading");
          }}
        />
      </div>
      <div>
      <Table geneticElements={geneticElements} />
      </div>
    </div>
  );
}

export default DrawTrace;
