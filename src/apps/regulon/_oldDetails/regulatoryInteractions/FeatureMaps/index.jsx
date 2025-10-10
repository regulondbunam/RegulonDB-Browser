import { useMemo } from "react";
import DrawFeatureMap from "../../../../FeatureMaps/DrawFeatureMap";

export default function FeatureMap({
  type = "",
  regulatoryInteractions,
  allCitations,
  tfName,
}) {
  const data = useMemo(() => {
    return parseRItoRaw(regulatoryInteractions, type);
  }, [type, regulatoryInteractions]);
  const featureMapData = {
    title: `Feature Map ${tfName}`,
    options: {...defaultOptions, limits: {start: data.limitStart, end: data.limitEnd, origin: 0}},
    rawData: data.raw,
  };

  return <DrawFeatureMap featureMapData={featureMapData} />;
}

const STRAND_MAP = {
  "reverse": "R",
  "forward": "D"
}

const parseRItoRaw = (regulatoryInteractions = [], type) => {
  let raw = `#->${type}_name\ttype\tregulatory_interaction\tstrand\tleft-position\tright-position\tfunction\tconfidenceLevel`;
  let limitStart = 0;
  let limitEnd = 0;
  regulatoryInteractions.forEach((ri) => {
    const gene = Array.isArray(ri.regulatedGenes) ? ri.regulatedGenes[0] : "";
    const promoter = ri?.regulatedEntity?.name || "";
    const entityName = type === "gene" ? gene?.name || "-" : promoter;
    if (entityName === "") {
      return null;
    }
    const regulatoryInteraction = ri?.activeConformation?.name || "";
    const strand = STRAND_MAP[ri?.regulatoryBindingSites?.strand || "forward"] || "forward";
    const absolutePositions = {
      left: ri?.regulatoryBindingSites?.leftEndPosition || 0,
      right: ri?.regulatoryBindingSites?.rightEndPosition || 0,
    };
    if (absolutePositions.left === 0 || absolutePositions.right === 0) {
      return null;
    }
    const distanceTo =
      type === gene ? ri?.distanceToFirstGene || 0 : ri?.distanceToPromoter;
    if (!distanceTo || distanceTo === 0) {
      return null;
    }
    const size = Math.round((absolutePositions.right - absolutePositions.left)/2);
    const relativePositions = {
      left: distanceTo - size,
      right: distanceTo + size,
    }

    if (relativePositions.left < limitStart) {
      limitStart = relativePositions.left;
    }
    if (relativePositions.right > limitEnd) {
      limitEnd = relativePositions.right;
    }
    const riFunction = ri?.regulatoryBindingSites?.function || "unknown";
    raw += `\n${entityName}\t${type}\t${regulatoryInteraction}\t${strand}\t${relativePositions.left}\t${relativePositions.right}\t${riFunction}\t${ri?.confidenceLevel || 0}`;
  });
  return { raw, limitEnd, limitStart };
};

const defaultOptions = {
  "measure": 100,
  "limits": {
    "start": -1000,
    "end": 200,
    "origin": 0
  },
  "trackHeight": 50,
  "colors": {
    "background": "#ffffff",
    "tracks": "#c6fffb"
  },
  "handleAnnotation": null
}
