import { TRACK_TEMPLATE, FEATURE_TEMPLATE } from "./trackTemplate";
import safeID from "../safeID";
import {stringToNumber, getRandomBrightColorHex} from "../utils"

const COLUMNS_TEMPLATE = {
  MAP_NAME: 0,
  FEATURE_TYPE: 1,
  IDENTIFIER: 2,
  STRAND: 3,
  START: 4,
  END: 5,
  SEQUENCE: 6,
  SCORE: 7,
};

export default function tracksFromUnknow(rawFM) {
  if (!rawFM) return {};
  let columns = [];
  const tracks = {};
  const annotations = {
    columnSelect: COLUMNS_TEMPLATE.IDENTIFIER,
    labels: {}
  };
  const columnMapping = {
    0: "trackName",
    1: "type",
    2: "label",
    3: "strand",
    4: "relativeStartPosition",
    5: "relativeEndPosition",
    6: "sequence",
    7: "score",
  };
  const lines = rawFM.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.trim().startsWith("#")) {
      if (line.trim().startsWith('#->')){
        const cells = line.split(/\t/);
        cells[0] = cells[0].slice(3)
        columns = [...cells]
        continue;
      }else{
        columns = [...COLUMNS_TEMPLATE]
        continue;
      }
    }
    const cell = line.split("\t");
    const trackName = cell[COLUMNS_TEMPLATE.MAP_NAME]?.trim();
    if (!trackName) continue;

    const featureID = safeID(
      `${cell[COLUMNS_TEMPLATE.IDENTIFIER]}_${trackName}_${cell[COLUMNS_TEMPLATE.START]}_${cell[COLUMNS_TEMPLATE.END]}_${cell[COLUMNS_TEMPLATE.STRAND]}`
    );

    annotations.labels[cell[annotations.columnSelect]] = getRandomBrightColorHex()

    const feature = {
      ...FEATURE_TEMPLATE,
      _id: featureID,
      type: cell[COLUMNS_TEMPLATE.FEATURE_TYPE],
      strand: cell[COLUMNS_TEMPLATE.STRAND],
      relativeStartPosition: stringToNumber(cell[COLUMNS_TEMPLATE.START]),
      relativeEndPosition: stringToNumber(cell[COLUMNS_TEMPLATE.END]),
      sequence: cell[COLUMNS_TEMPLATE.SEQUENCE],
      score: cell[COLUMNS_TEMPLATE.SCORE],
      label: cell[COLUMNS_TEMPLATE.IDENTIFIER],
      attributes: {},
      leftEndPosition: 0,
      rightEndPosition: 0,
      trackName: trackName,
    };

    if (!tracks[trackName]) {
      tracks[trackName] = {
        ...TRACK_TEMPLATE,
        _id: trackName,
        name: trackName,
        leftEndPosition: 0,
        rightEndPosition: 0,
        source: [],
        features: {},
      };
    }

    tracks[trackName].features[featureID] = feature;
  }

  return { tracks, columns, annotations, columnMapping };
}
