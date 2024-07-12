import React, { useMemo } from "react";
import FilterTable from "../FilterTable";
import { Typography } from "@mui/material";
import { DataVerifier } from "ui-components/utils";
import { HeaderLabel } from "./components";
import { Link } from "react-router-dom";
import SequenceTrack from "../SequenceTrack";
import { confidenceLevelLabel } from "ui-components/utils";
import { ParagraphCitations, CITATION_SIZE } from "../Citations";

export default function RegulatoryInteractions({
  isRegulators = false,
  references,
  regulatoryInteractions = [],
}) {
  const table = useMemo(() => {
    let columns = [];
    let data = [];
    if (isRegulators) {
      columns = columns.concat([
        {
          key: "regulatorName",
          label: (
            <HeaderLabel
              label="RegulonName"
              subLabel="function: repressor(-), activator(+), dual(+-))"
            />
          ),
          width: 250,
          height: 50,
        },
        {
          key: "centralPosition",
          label: <HeaderLabel label={"Relative\ncentral position"} />,
        },
      ])
    } else {
      columns = columns.concat([
        {
          key: "conformation",
          label: "Active Conformation",
          width: 250,
        },
        { key: "fun", label: "Function" },
        { key: "entity", label: "Regulated Entity Name" },
        { key: "entityType", label: "Regulated Entity Type" },
        { key: "toGene", label: (
          <HeaderLabel
            label="Distance to"
            subLabel="GENE"
          />
        ), height: 50,},
        { key: "toPromoter", label: (
          <HeaderLabel
            label="Distance to"
            subLabel="PROMOTER"
          />
        ), height: 50,},
        { key: "genes", label: "RegulatedGenes" },
        { key: "strand", label: "Strand" },
      ])
    }
    columns = columns.concat([
      { key: "leftPos", label: <HeaderLabel label={"LeftEndPosition"} /> },
      { key: "rightPos", label: <HeaderLabel label={"RightEndPosition"} /> },
      {
        key: "sequence",
        label: <HeaderLabel label={"Sequence"} />,
        width: 400,
      },
      {
        key: "confidenceLevel",
        label: (
          <HeaderLabel
            label="Confidence Level"
            subLabel="C: Confirmed, S: Strong, W Weak"
          />
        ),
      },
      {
        key: "references",
        label: (
          <HeaderLabel
            label="References"
            subLabel="[Publication | Evidences]"
          />
        ),
      },
    ]);
    if (DataVerifier.isValidArray(regulatoryInteractions)) {
      regulatoryInteractions.forEach((regulatoryInteraction) => {
        let site
        if (regulatoryInteraction?.regulatorySite) {
          site = regulatoryInteraction.regulatorySite
        }
        if (regulatoryInteraction?.regulatoryBindingSites) {
          site = regulatoryInteraction.regulatoryBindingSites
        }

        let row = {};
        if (isRegulators) {
          if (
            DataVerifier.isValidObjectWith_id(regulatoryInteraction?.regulator)
          ) {
            const regulator = regulatoryInteraction?.regulator;
            row["regulatorName"] = (
              <Link
                to={"/regulon/" + regulator._id}
                value={`${regulator.name}${rFun(regulator.function)}`}
              >
                <RegulatorFunction
                  name={regulator.name}
                  regFunction={regulator.function}
                />
              </Link>
            );
          }
        } else {
          const conformation = DataVerifier.isValidObjectWith_id(regulatoryInteraction?.activeConformation)
            ? regulatoryInteraction?.activeConformation
            : { name: "", type: "" }
          const entity = DataVerifier.isValidObjectWith_id(regulatoryInteraction?.regulatedEntity)
            ? regulatoryInteraction?.regulatedEntity
            : { name: "", type: "" }
          const genes = DataVerifier.isValidArray(regulatoryInteraction?.regulatedGenes)
            ? regulatoryInteraction.regulatedGenes
            : []
          row = {
            conformation: conformation.name,
            fun: DataVerifier.isValidString(regulatoryInteraction?.function) ? regulatoryInteraction.function : "",
            entity: entity.name,
            entityType: entity.type,
            toGene: DataVerifier.isValidNumber(regulatoryInteraction?.distanceToFirstGene) ? regulatoryInteraction.distanceToFirstGene : "",
            toPromoter: DataVerifier.isValidNumber(regulatoryInteraction?.distanceToPromoter) ? regulatoryInteraction.distanceToPromoter : "",
            genes: <Typography value={genes.map(fun => fun.name).join("; ")} sx={{ whiteSpace: "nowrap" }} >
                    {genes.map(gene=>{
                        return (
                            <Link style={{marginLeft: "5px",  }} value={gene.name} key={`gene_${gene._id}_InRI_${regulatoryInteraction._id}`} to={"/gene/" + gene._id}>
                                    <span dangerouslySetInnerHTML={{ __html: gene.name }} />
                            </Link>
                        )
                    })}
                </Typography>,
            strand: DataVerifier.isValidString(site?.strand) ? site.strand : "",
          }
        }

        data.push({
          ...row,
          centralPosition: regulatoryInteraction.relativeCenterPosition,
          leftPos: site?.leftEndPosition,
          rightPos: site?.rightEndPosition,
          sequence: (
            <SequenceTrack
              value={site?.sequence}
              sequence={site?.sequence}
              width="400px"
            />
          ),
          confidenceLevel: (
            <div
              value={regulatoryInteraction.confidenceLevel}
              dangerouslySetInnerHTML={{
                __html: confidenceLevelLabel(
                  regulatoryInteraction.confidenceLevel,
                ),
              }}
            />
          ),
          references: (
            <ParagraphCitations
              value=""
              references={references}
              citations={regulatoryInteraction.citations}
              citationSize={CITATION_SIZE.ONLY_INDEX}
            />
          ),
        });
      });
    }
    return { data: data, columns };
  }, [regulatoryInteractions, isRegulators, references]);

  return (
    <FilterTable
      {...table}
      selection="row"
      tableName={`${regulatoryInteractions.length} regulatory interactions`}
      titleVariant="relevant"
    />
  );
}

export const rFun = (f) => {
  const rf = {
    repressor: "-",
    activator: "+",
    dual: "+-",
  };
  return rf[f] ? rf[f] : "";
};

export const spanColor = (f) => {
  const rf = {
    repressor: "#FF0000",
    activator: "#14A054",
    dual: "#0000FF",
  };
  return rf[f] ? rf[f] : "";
};

function RegulatorFunction({ name = "", regFunction }) {
  return (
    <span style={{ color: spanColor(regFunction) }}>
      {name}
      {rFun(regFunction)}
    </span>
  );
}

export function getRISbyRBS(regulatorBindingSites = []) {
  if (!DataVerifier.isValidArray(regulatorBindingSites)) {
    return [];
  }
  let regulatoryInteractions = [];
  regulatorBindingSites.forEach((rbs) => {
    if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
      rbs.regulatoryInteractions.forEach((ri) => {
        regulatoryInteractions.push({
          regulator: { ...rbs.regulator, function: rbs.function },
          ...ri,
        });
      });
    }
  });
  return regulatoryInteractions;
}
