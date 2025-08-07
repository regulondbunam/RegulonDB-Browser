import dnaynPNG from "./resources/dnayn.png"
import dnaynOpenPNG from "./resources/dnaynOpen.png"
import dnaynLpng from "./resources/dnaynLconnector.png"
import dnaynRpng from "./resources/dnaynRconnector.png"
import tfPNG from "./resources/TF.png"
import rnapPNG from "./resources/RNAP.png"
import propoterPNG from "./resources/promoter.png"
import genePNG from "./resources/gene.png"
import terminatorPNG from "./resources/terminator.png"
import connectorPNG from "./resources/connector.png"
import {Fragment, useEffect, useRef, useState} from "react";

export default function Dna() {
    const [nDna, setNDna] = useState()
    const [conn, setConn] = useState(0)
    const refPal = useRef();
    useEffect(()=>{
        if (refPal.current){
            const width = refPal.current.getBoundingClientRect().width
            const nImg = Math.floor(width/50);
            const _conn = width-(nImg*50)
            setNDna(nImg-5)
            setConn(_conn-2)
        }
    },[])
    return(
        <div ref={refPal} style={{width: "100%", height: "80px", position: "relative"}} >
            {nDna && <Fragment>
                <div style={{position: "absolute", top: "0", left: "150px"}} >
                    <img src={propoterPNG} alt="transcription factor" style={{height: "60px"}} />
                </div>
                <div style={{position: "absolute", top: "13px", left: "125px"}} >
                    <img src={rnapPNG} alt="transcription factor" style={{height: "57px"}} />
                </div>
                <div style={{position: "absolute", top: "13px", left: "95px"}} >
                    <img src={tfPNG} alt="transcription factor" style={{height: "57px"}} />
                </div>
                <div style={{position: "absolute", top: "33px", left: "200px"}} >
                    <img src={genePNG} alt="transcription factor" style={{height: "48px"}} />
                </div>
                <div style={{position: "absolute", top: "33px", left: "450px"}} >
                    <img src={genePNG} alt="transcription factor" style={{height: "48px"}} />
                </div>
                <div style={{position: "absolute", top: "18px", left: "695px"}} >
                    <img src={terminatorPNG} alt="transcription factor" style={{height: "48px"}} />
                </div>
                <div  style={{position: "absolute", top: "44px", zIndex: -1}}>
                    <img src={dnaynLpng} alt="dna" style={{width: "50px", height: "auto"}} />
                    <img src={dnaynPNG} alt="dna" style={{width: "50px", height: "auto"}} />
                    <img src={dnaynPNG} alt="dna" style={{width: "50px", height: "auto"}} />
                    <img src={dnaynOpenPNG} alt="dna" style={{width: "50px", height: "auto"}} />
                    { Array.from({length:nDna}).map((n,i)=><img key={"dna-"+i} src={dnaynPNG} alt="dna" style={{width: "50px", height: "auto"}} />)}
                    <img src={dnaynRpng} alt="dna" style={{width: "50px", height: "auto"}} />
                    <img src={connectorPNG} alt="dna" style={{width: conn+"px", height: "auto", marginBottom: "10px"}} />
                </div>
            </Fragment>}
        </div>
    )
}