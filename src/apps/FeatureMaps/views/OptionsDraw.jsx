import MapOptions from "./components/Map";
import LabelOptions from "./components/Label";
import TitleSection from "./components/TitleSection";
import React from "react";

export default function OptionsDraw(){

  return( <div>
    <TitleSection title="Map Options" help="help-text-dataset-title" />
    <MapOptions />
    <TitleSection title="Features Options" help="help-text-dataset-title" />
    <LabelOptions />
  </div>)
}