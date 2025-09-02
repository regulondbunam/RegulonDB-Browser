import getFormat from "../getFormat";
import { FORMATS } from "../static";
import tracksFromFeatureMap from "./tracksFromFeatureMap";

export default function createTracks(rawData) {
  //identificar el formato de datos
  const format = getFormat(rawData);
  switch (format) {
    case FORMATS.gff3:
      console.log("gff3 - no soportado")
      break;
    case FORMATS.featureMaps:
    default:
      return tracksFromFeatureMap(rawData)
  }
}
