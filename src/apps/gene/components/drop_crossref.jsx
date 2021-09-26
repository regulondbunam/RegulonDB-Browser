import React from "react";

const references = ["ECOCYC", "ecocyc", "REFSEQ", "refseq", "UniProt"];

export default function DropRef(id, externalCrossReferences = []) {
  console.log(externalCrossReferences);
  try {
    if (externalCrossReferences !== []) {
      return (
        <table>
          <tbody>
            <tr>
              <td>{id}(RegulonDB)</td>
            </tr>
            {externalCrossReferences.map((ref, i) => {
              if (
                references.find(
                  (element) => element === ref?.externalCrossReferenceName
                )
              ) {
                return (
                  <tr key={`${i}_${ref?.externalCrossReferenceId}`}>
                    <td>
                      <a
                        href={`${ref?.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{`${ref?.objectId}(${ref?.externalCrossReferenceName})`}</a>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      );
    }
  } catch (error) {}

  return <></>;
}

/*
externalCrossReferenceId: "RDBECOLIER00047"
externalCrossReferenceName: "STRING"
objectId: "511145.b2437"
url: "http://string-db.org/network/A"
*/
