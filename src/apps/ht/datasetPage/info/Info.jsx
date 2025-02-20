import React, { useState, useEffect } from "react";
import GetInfoDataset from "../../webServices/dataset/dataset_info";
import { SpinnerCircle } from "../../components/ui-components_old/ui_components";
import Maininfo from "./mainInfo/Maininfo";
import TranscriptionFactor from "./transcriptionFactor/TranscriptionFactor";
import GrowthConditions from "./growthConditions/growthConditions";
import NLPgc from "./nlpGrowthConditions/NLPgc";
import Tabs from "./data/tabs";
import Related from "./related/Related";
import txtTemplate from "./template.txt";
import { Button } from "@mui/material";
import ParseJSONtoTemplate from "../../../../components/transformJSON";

export default function Info({ datasetId }) {
  const [_datasetId, set_datasetId] = useState(datasetId);
  const [_dataset, set_dataset] = useState();
  const [_state, set_state] = useState("done");


  useEffect(() => {
    let title = "High Throughput Collection";
    if (_dataset) {
      if (_dataset?.sample?.title === "obtener de GEO") {
        title = _dataset?._id;
      } else {
        title = _dataset?.sample?.title;
      }

      //console.log(_data)
    }
    const COVER = document.getElementById("title-cover-ht");
    if (COVER) {
      const COVER_REACTION = new CustomEvent("coverR", {
        bubbles: true,
        detail: {
          state: _state,
          title: title,
        },
      });
      COVER.dispatchEvent(COVER_REACTION);
    }
  }, [_state, _dataset]);
  //console.log(_dataset)
  if (_state === "error") {
    return <div>dataset error</div>;
  }
  if (!_dataset) {
    return (
      <div>
        <GetInfoDataset
          datasetId={_datasetId}
          resoultsData={(dataset) => {
            set_dataset(dataset);
          }}
          status={(state) => {
            set_state(state);
          }}
        />
        <SpinnerCircle />
      </div>
    );
  }
  if (!_dataset?._id) {
    return <div>dataset no existe</div>;
  }

  return (
    <div>
      <article>
        <h2>DATASET</h2>
        <Maininfo
          _id={_dataset?._id}
          sample={_dataset?.sample}
          datasetType={_dataset?.datasetType}
          sourceSerie={_dataset?.sourceSerie}
          publications={_dataset?.publications}
        />
        {_dataset?.datasetType === "TFBINDING" && (
          <div>
            <h2>TRANSCRIPTION FACTOR</h2>
            <TranscriptionFactor objectsTested={_dataset?.objectsTested} />
          </div>
        )}
        <GrowthConditions growthCondition={_dataset?.growthConditions} />
        <NLPgc datasetId={_dataset?._id} />
        <Tabs id_dataset={_dataset?._id} data={_dataset} />
        {_dataset?.datasetType === "TFBINDING" && (
          <Related
            datasetId={_dataset?._id}
            objectTested={_dataset?.objectsTested}
            onSelectDatasetId={(DatasetId) => {
              set_datasetId(DatasetId);
              set_dataset(undefined);
              //window.history.pushState(null, null, `/ht/dataset/TFBINDING/datasetId=${DatasetId}`)
            }}
          />
        )}
        <br />
      </article>
      <div>
        {/*
        <Button
          variant="outlined"
          onClick={() => {
            if (_dataset) {
              fetch(txtTemplate)
                .then((r) => r.text())
                .then((textTemplate) => {
                  try {
                    const parse = new ParseJSONtoTemplate(_dataset, textTemplate);
                    const text = parse.getCompileText();
                    // Crea un elemento <a>
                    const element = document.createElement("a");

                    // Crea un archivo Blob con el texto y el tipo MIME correcto
                    const file = new Blob([text], { type: "text/plain" });

                    // Establece la URL del archivo Blob como el href del elemento <a>
                    element.href = URL.createObjectURL(file);

                    // Establece el nombre del archivo para la descarga
                    element.download = "dataset_" + datasetId;

                    // Añade el elemento <a> al DOM
                    document.body.appendChild(element);

                    // Programa un clic en el elemento <a> para iniciar la descarga
                    element.click();

                    // Elimina el elemento <a> del DOM
                    document.body.removeChild(element);
                  } catch (error) {
                    console.error(error);
                  }
                });
            }
          }}
        >
          Download Dataset Info
        </Button>
       */ }
      </div>
    </div>
  );
}
