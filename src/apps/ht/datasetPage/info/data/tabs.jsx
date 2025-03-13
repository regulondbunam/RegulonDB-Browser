import React, { useState, useEffect } from "react";
import { SpinnerCircle } from "../../../components/ui-components_old/ui_components";
import NormData from "./normalizedData/normData";

import GetAuthorData from "../../../webServices/authors/authorsData_dataset";
import GetPeaks from "../../../webServices/peaks/peaks_dataset";
import GetTFBS from "../../../webServices/tfbs/tfbs_dataset";
import GetTUs from "../../../webServices/transUnits/tu_dataset";
import GetTSS from "../../../webServices/tss/tss_dataset";
import GetTTS from "../../../webServices/tts/tts_dataset";
import Summary from "./summary";

import { Viewer } from "../igv/viewer";

export default function Tabs({ id_dataset, data }) {
  const [_openTab, set_openTab] = useState(0);
  const [_autorData, set_autorData] = useState();
  const [_datasetData, set_datasetData] = useState();
  const [_jsonTable, set_jsonTable] = useState();

  useEffect(() => {
    if (data?.collectionData.type === "GENE_EXPRESSION") {
      if (!_jsonTable) {
        try {
          fetch(
            `${process.env.REACT_APP_PROSSES_SERVICE}/${id_dataset}/ge/jsonTable`,
            { cache: "default" }
          )
            .then((response) => response.json())
            .then((data) => {
              set_jsonTable(data);
              set_datasetData(data);
            })
            .catch((error) => {
              console.error(error);
              set_jsonTable({ error: error });
              set_datasetData(1);
            });
        } catch (error) {
          console.error(error);
          set_jsonTable({ error: error });
        }
      }
    }
  }, [data, _jsonTable, id_dataset, set_jsonTable, set_datasetData]);

  if (
    (_datasetData || _datasetData === 1) &&
    (_autorData || _autorData === 1)
  ) {
    return (
      <div style={{ paddingTop: '20px' }}>
        <h1>IGV Browser</h1>
        <div>
          <Summary data={data} />
          <NormData
            datasetType={data?.collectionData.type}
            datasetData={_datasetData}
            jsonTable={_jsonTable}
          />
          <div id="igv-view">
            <Viewer
              id_dataset={data?._id}
              tfs={data?.objectsTested}
              datasetType={data?.collectionData.type}
            />
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <br />
      Looking for dataset data, please wait this may take some time
      <SpinnerCircle />
      <GetAuthorData
        id_dataset={id_dataset}
        resoultsData={(data) => {
          if (Array.isArray && data.length) {
            set_autorData(data);
          } else {
            set_autorData(1);
          }
        }}
      />
      {data?.collectionData.type === "TFBINDING" && (
        <GetTFBSData
          id_dataset={id_dataset}
          set_datasetData={(data) => {
            set_datasetData(data);
          }}
          setTab={(tab) => {
            set_openTab(tab);
          }}
        />
      )}
      {data?.collectionData.type === "TUS" && (
        <GetTUs
          id_dataset={id_dataset}
          resoultsData={(data) => {
            if (!data) {
              set_datasetData(1);
              set_openTab(1);
            } else {
              if (Array.isArray && data.length) {
                set_datasetData({ tusData: data });
              } else {
                set_datasetData(1);
                set_openTab(1);
              }
            }
          }}
        />
      )}
      {data?.collectionData.type === "TSS" && (
        <GetTSS
          id_dataset={id_dataset}
          resoultsData={(data) => {
            if (data) {
              if (Array.isArray && data.length) {
                set_datasetData({ tssData: data });
              } else {
                set_datasetData(1);
                set_openTab(1);
              }
            }
          }}
        />
      )}
      {data?.collectionData.type === "TTS" && (
        <GetTTS
          id_dataset={id_dataset}
          resoultsData={(data) => {
            if (!data) {
              set_datasetData(1);
              set_openTab(1);
            } else {
              if (Array.isArray && data.length) {
                set_datasetData({ ttsData: data });
                //
              } else {
                set_datasetData(1);
                set_openTab(1);
              }
            }
          }}
        />
      )}
    </div>
  );
}

function GetTFBSData({
  id_dataset,
  set_datasetData = () => {},
  setTab = () => {},
}) {
  const [_tfbsData, set_tfbsData] = useState();
  const [_peaksData, set_peaksData] = useState();

  useEffect(() => {
    if (_tfbsData && _peaksData) {
      if (_tfbsData === 1 && _peaksData === 1) {
        set_datasetData(1);
        setTab(1);
      } else {
        set_datasetData({
          peaksData: _peaksData,
          tfbsData: _tfbsData,
        });
      }
    }
  }, [_peaksData, _tfbsData, set_datasetData, setTab]);

  return (
    <div>
      <GetPeaks
        id_dataset={id_dataset}
        resoultsData={(data) => {
          if (Array.isArray && data.length) {
            set_peaksData(data);
          } else {
            set_peaksData(1);
          }
        }}
      />
      <GetTFBS
        id_dataset={id_dataset}
        resoultsData={(data) => {
          if (data) {
            if (Array.isArray && data.length) {
              set_tfbsData(data);
            } else {
              set_tfbsData(1);
            }
          } else {
            set_tfbsData(1);
          }
        }}
      />
    </div>
  );
}
