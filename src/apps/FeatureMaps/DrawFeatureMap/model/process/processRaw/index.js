import getFormat from "../getFormat";
import { FORMATS } from "../static";
import tracksFromFeatureMap from "./tracksFromFeatureMap";
import tracksFromUnknow from "./tracksFromUnknow";

export default async function processRaw(rawData) {
  //identificar el formato de datos
  const format = getFormat(rawData);
  switch (format) {
    case FORMATS.gff3:
      console.log("gff3 - no soportado");
      return null
    case FORMATS.featureMaps:
      return tracksFromFeatureMap(rawData);
    default:
      return tracksFromUnknow(rawData);
  }
}
