export default function Measures({
    measure,
    scale,
    widthMap,
    heightTrack = 50,
    originPoint,
}) {
    const lineHeight = (heightTrack / 2)
    const lineUnderStyle = {
        height: lineHeight + "px",
        width: "1px",
        backgroundColor: "grey",
        position: "absolute",
        left: 0,
        top: (heightTrack / 2) - (lineHeight / 2),
    }
    const lines = new Array(Math.trunc(originPoint / measure / scale) + 1).fill(10)
    return (
        <>
            {lines.map((n, i) => {
                const left = originPoint - (measure * i) * scale
                const backgroundColor = originPoint-(widthMap) <= left ? "black" : "gray"
                if (measure > 40 || (measure * i) % 50 === 0) {
                    return <div key={"measureUnder_" + i} 
                                style={{ ...lineUnderStyle,
                                        left: left - 0.5,
                                        width: "2px",
                                        backgroundColor:  backgroundColor,
                                    }} />
                }
                return <div key={"measureUnder_" + i} style={{ ...lineUnderStyle, left: left,backgroundColor:  backgroundColor, }} />
            })}
        </>
    )
}