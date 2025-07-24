import TitleSection from "../components/TitleSection";
import Map from "./Map";

export default function DrawOptions({state, dispatch}){

    return(
        <div>
            <TitleSection title="Display Settings"/>
            <Map state={state} dispatch={dispatch} />
            <TitleSection title="Track Options"/>
            <TitleSection title="Features Options"/>
            <TitleSection title="Annotation Options"/>
        </div>
    )
}