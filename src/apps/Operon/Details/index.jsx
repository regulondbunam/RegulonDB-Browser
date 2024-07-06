import React, { useMemo } from "react";
import { useGetOperonByID } from "webServices/queries";
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import Cover from "./Cover";
import { Cover as CoverUi } from "ui-components/Web/Cover";
import { DataVerifier } from "ui-components/utils";
import { Typography } from "@mui/material";
import DrawTrace from "./DrawTrace";
import Tabs from "ui-components/Web/Tabs";
import { AllCitations } from "ui-components/Web/Citations/AllCitations";
import TranscriptionUnit from "./TU";
import Drawers from "apps/Drawers";
import LeftPanel from "./PanelLeft";
import { DrawTU } from "./TU";

export default function Details({ id }) {
  const { operon, loading, error } = useGetOperonByID(id);
  const references = useGetIndexedReferences(operon?.allCitations);
  //console.log(operon);
  if (error) {
    return (
      <div>
        <CoverUi
          state={loading ? "loading" : "error"}
          message={error && "Error to load gene list"}
        >
          <Typography variant="h1" sx={{ ml: "10%" }}>
            ERROR: {id} not found{" "}
          </Typography>
        </CoverUi>
      </div>
    );
  }
  if (loading) {
    return (
      <CoverUi>
        <Typography variant="h1">Loading...</Typography>
      </CoverUi>
    );
  }
  if (operon) {
    return (
      <div>
        {DataVerifier.isValidObjectWith_id(operon?.operon) && (
          <CoverUi>
            <Cover {...operon.operon} />
          </CoverUi>
        )}
        <DrawTrace operon={operon} />
        <TUsDetails operon={operon} references={references} />
      </div>
    );
  }

  return null;
}

function TUsDetails({ operon, references }) {
  const sections = useMemo(() => {
    let _sections = [];
    if (DataVerifier.isValidArray(operon?.transcriptionUnits)) {
      operon.transcriptionUnits.forEach((tu, index) => {
        let promoterName = "";
        if (DataVerifier.isValidObject(tu.promoter)) {
          promoterName = " - " + tu.promoter.name;
        }
        _sections.push({
          id: tu._id + "_TUSection_" + index,
          title: tu.name + promoterName,
          tu: tu,
          component: TranscriptionUnit,
        });
      });
    }
    return _sections;
  }, [operon]);

  return (
    <div style={{ display: "flex" }}>
      <Drawers
        open
        title={operon.operon.name + " operon"}
        drawers={[<LeftPanel operon={operon} />]}
        setDrawer={0}
      />
      <div style={{ width: "100%" }}>
        <Tabs
          render
          tabSelect="tab01"
          tabs={[
            {
              id: "tab01",
              name: "TUs details",
              component: (
                <>
                  {sections.map((section) => {
                    const TU = section.component;
                    return (
                      <div key={section.id}>
                        <TU
                          {...section.tu}
                          pageReferences={references}
                          regulationPositions={
                            operon.operon.regulationPositions
                          }
                          strand={operon.operon.strand}
                        />
                      </div>
                    );
                  })}
                </>
              ),
            },
            {
              id: "tab02",
              name: "TUs graphics",
              component: (
                <>
                  {sections.map((section) => {
                    const tu = section.tu;
                    return (
                      <div key={section.id}>
                        <DrawTU
                          id={
                            "dttOperon_onlyGraph" +
                            tu._id +
                            "_" +
                            tu?.promoter?._id +
                            "_"
                          }
                          height={150}
                          genes={tu?.genes}
                          promoter={tu?.promoter}
                          regulatorBindingSites={tu?.regulatorBindingSites}
                          terminators={tu?.terminators}
                          regulationPositions={
                            operon.operon.regulationPositions
                          }
                        />
                      </div>
                    );
                  })}
                </>
              ),
            },
          ]}
        />
        <AllCitations {...references} />
      </div>
    </div>
  );
}

/*

 (
            <
              {...tu}
              pageReferences={references}
              regulationPositions={operon.operon.regulationPositions}
              strand={operon.operon.strand}
            />
          )
* */
