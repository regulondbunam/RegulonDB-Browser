import {FORMATS} from "./static";

export default function getFormat(rawData) {
  if (!rawData) return null;

  const lines = rawData.split("\n");

  for (const line of lines) {
    if (line.includes("##gff-version 3")) {
      return FORMATS.gff3;
    }
    if (line.includes("##FeatureMaps")) {
      return FORMATS.featureMaps;
    }
  }

  return null;
}