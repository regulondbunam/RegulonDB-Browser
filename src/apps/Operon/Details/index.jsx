import React from 'react'
import { useGetOperonByID } from 'webServices/queries'
import { useGetIndexedReferences } from "ui-components/Web/Citations";
import Cover from './Cover';
import { Cover as CoverUi } from 'ui-components/Web/Cover';
import { DataVerifier } from 'ui-components/utils';
import { Typography } from '@mui/material';
import DrawTrace from './DrawTrace';
import AnchorNav from 'ui-components/Web/AnchorNav';
import Tabs from 'ui-components/Web/Tabs';
import RelatedList from 'ui-components/Web/Related';
import { AllCitations } from "ui-components/Web/Citations/AllCitations";
import TranscriptionUnit from './TU';



export default function Details({ id }) {
  const { operon, loading, error } = useGetOperonByID(id)
  const references = useGetIndexedReferences(operon?.allCitations)
  console.log(operon);
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
        <Typography variant="h1">
          Loading...
        </Typography>
      </CoverUi>
    )
  }
  if (operon) {
    return (
      <div>
        {DataVerifier.isValidObjectWith_id(operon?.operon) && <CoverUi><Cover {...operon.operon} /></CoverUi>}
        <DrawTrace operon={operon} />
        <Tabs tabSelect='tab01' tabs={[
          {
            id: "tab01",
            name: "TUs details",
            component: <TUsDetails operon={operon} references={references} />
          },
          {
            id: "tab02",
            name: "TUs graphics",
            component: <>02</>
          }
        ]} />
      </div>
    )
  }

  return null

}

function TUsDetails({ operon, references }) {
  console.log(operon);
  let tus = []
  if (DataVerifier.isValidArray(operon?.transcriptionUnits)) {
    operon.transcriptionUnits.forEach((tu, index) => {
      let promoterName = ""
      if (DataVerifier.isValidObject(tu.promoter)) {
        promoterName = " - " + tu.promoter.name
      }
      tus.push({
        id: tu._id + "_TUSection_" + index,
        title: tu.name+promoterName,
        visible:true,
        component: <TranscriptionUnit {...tu} pageReferences={references} regulationPositions={operon.operon.regulationPositions} />,
      },)
    });
  }
  return (
    <AnchorNav
      leftList={
        <RelatedList
          regulonDB_id={operon._id}
          leftEndPosition={operon.operon.regulationPositions?.leftEndPosition}
          rightEndPosition={operon.operon.regulationPositions?.rightEndPosition}
          organism={"ecoli"}
        />
      }
      title={operon.operon.name + " operon"}
      sections={[
        ...tus,
        {
          id: "section4",
          title: "All Citations",
          visible: DataVerifier.isValidArray(operon.allCitations),
          component: <AllCitations {...references} />,
        },
      ]}
    />
  )
}