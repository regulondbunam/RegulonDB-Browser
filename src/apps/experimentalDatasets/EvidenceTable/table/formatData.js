import { DataVerifier } from "../../../../components/ui-components";

function evidenceCalc(evidence = "") {
  if (/c/.test(evidence.toLowerCase())) {
    return "C";
  }
  if (/s/.test(evidence.toLowerCase())) {
    return "S";
  }
  if (/w/.test(evidence.toLowerCase())) {
    return "W";
  }
  return "";
}

export default function formatData(content = "", evidenceOptions) {
  let data = [];
  let columns = [];

  const evidenceConfig = {
    tfrsEvidence: { type: "standard" },
    riEvidence: { type: "standard" },
    pmEvidence: { type: "standard" },
    addEvidence: { type: "additive" },
    confidenceLevel: { type: "confidence" },
  };

  const evidences = {};
  Object.keys(evidenceConfig).forEach((key) => {
    evidences[key] = { _nColumn: -1 };
  });

  if (!DataVerifier.isValidString(content)) return { columns, data };

  const rawContent = content.split("\n");
  if (!DataVerifier.isValidArray(rawContent)) return { columns, data };

  rawContent.forEach((line, i) => {
    const cells = line.split("\t");

    if (i === 0) {
      cells.forEach((cell, ci) => {
        const indx = ci + 1;

        columns.push({
          id: cell,
          header: cell,
          filter: "fuzzyText",
          accessorKey: "column_" + indx,
        });

        Object.keys(evidenceConfig).forEach((key) => {
          if (new RegExp(key).test(cell)) {
            evidences[key]._nColumn = ci;
          }
        });
      });

      return;
    }

    let confidenceAccumulator = "";

    const processed = {};

    Object.keys(evidenceConfig).forEach((key) => {
      const colIndex = evidences[key]._nColumn;
      const config = evidenceConfig[key];

      if (colIndex < 0) {
        processed[key] = "";
        return;
      }

      const value = cells[colIndex];

      if (!DataVerifier.isValidString(value)) {
        processed[key] = "";
        return;
      }

      if (config.type === "standard") {
        const { selected } = evidenceOptions;
        const result = [];

        value.split(";").forEach((item) => {
          const [code, val] = item.split(":");

          if (selected?.[code]) {
            result.push(item);
            confidenceAccumulator += val || "";
          }
        });

        processed[key] = result.join(";");
      }

      if (config.type === "additive") {
        const { remove } = evidenceOptions;
        const result = [];

        value.split(";").forEach((item) => {
          let valid = true;

          const match = item.match(/\(([^)]+)\)/);
          if (match) {
            const codes = match[1].split("/");

            for (let c of codes) {
              if (remove?.hasOwnProperty(c)) {
                valid = false;
                break;
              }
            }
          }

          if (valid) {
            result.push(item);
            const [, val] = item.split(":");
            confidenceAccumulator += val || "";
          }
        });

        processed[key] = result.join(";");
      }

      // --- CONFIDENCE ---
      if (config.type === "confidence") {
        processed[key] = "";
      }
    });

    const row = {};

    cells.forEach((cell, ci) => {
      const indx = ci + 1;

      let assigned = false;

      Object.keys(evidenceConfig).forEach((key) => {
        if (ci === evidences[key]._nColumn) {
          if (evidenceConfig[key].type === "confidence") {
            row["column_" + indx] = evidenceCalc(confidenceAccumulator);
          } else {
            row["column_" + indx] = processed[key];
          }
          assigned = true;
        }
      });

      if (!assigned) {
        row["column_" + indx] = cell;
      }
    });

    data.push(row);
  });

  return { columns, data };
}

/*
1)tuId	2)tuName	3)operonName	4)tuGenes	5)pmName	6)tuEvidence	7)addEvidence	8)confidenceLevel 
RDBECOLITUC03781	spy	spy	spy;	spyp	[EXP-IDA-TRANSCRIPT-LEN-DETERMINATION:S][EXP-IDA-BOUNDARIES-DEFINED:W]		S 
RDBECOLITUC03782	ycaC	ycaC	ycaC;		[COMP-AINF-SINGLE-DIRECTON:W]		W 
*/

/*
 */
