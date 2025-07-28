import TitleSection from "../components/TitleSection";
import Map from "./Map";
import Features from "./Features";

export default function DrawOptions({state, dispatch}){

    return(
        <div>
            <TitleSection title="Display Settings"/>
            <Map state={state} dispatch={dispatch} />
            <TitleSection title="Features Options"/>
            <Features state={state} dispatch={dispatch} />
            <TitleSection title="Annotation Options"/>
        </div>
    )
}