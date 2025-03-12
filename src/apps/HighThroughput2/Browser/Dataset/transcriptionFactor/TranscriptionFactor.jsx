import React from "react";
import { Link } from "react-router-dom";
import ExternalRef from "./externalRef";
import Note from "./note";

export function ObjectTested({ obj, i }) {
  return (
    <div>
      <Link to={`/regulon/${obj._id}`} className="inline-block w-fit">
        <h1 className="text-blue-600 font-bold hover:underline !inline">
          {obj.name}
        </h1>
      </Link>


      {obj.genes.length > 0 && linkGenes(obj.genes)}

      {obj.synonyms.length > 0 && (
        <div>
          <p>
            Synonyms:
            {obj.synonyms.join(", ")}
          </p>
        </div>
      )}
      {obj.externalCrossReferences.length > 0 && (
        <div>
          <p>External cross references:</p>
          <ExternalRef externalRef={obj.externalCrossReferences} />
        </div>
      )}
      {obj?.note && <Note note={obj.note} />}
      <hr />
    </div>
  );
}

export default function TranscriptionFactor({ objectsTested }) {
  return (
    <div style={{ marginLeft: "5%" }} id={`dataset_objTested`}>
      {objectsTested.map((obj, i) => (
        <ObjectTested obj={obj} i={i} key={obj.name + i} />
      ))}
    </div>
  );
}

function linkGenes(genes = []) {
  /*if (window.IN_URL.isEmbed) {
    return (
      <div>
        {genes.map((gen) => {
          return (
            <p key={gen._id} style={{ fontSize: "16px" }}>
              {gen.name}
            </p>
          );
        })}
      </div>
    );
  }*/
  return (
    <div>
      {genes.map((gen,i) => {
        return (
          <p key={gen._id+"_geneInTF_"+i} >Gene:{" "}
          <Link
            key={gen._id}
            style={{ fontSize: "16px" }}
            to={`/gene/${gen._id}`}
          >
            {gen.name}
          </Link>
          </p>
        );
      })}
    </div>
  );
}
