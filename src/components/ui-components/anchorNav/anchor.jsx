
import Style from "./anchorNav.module.css"

export function Anchor({ id, label, select = false, setId = () => { } }) {
    return (
        <li id={id} onClick={() => { setId(id) }} className={`li ${select ? Style.liSelect : Style.li}`}  >
            {label}
        </li>
    )
}

export function AnchorBox({ idSelect, onChange, anchors = [], animate}) {

    return (
        <div id='anchors_box' style={{ display: "grid", gridTemplateColumns: "95% 5%", }}>
            <div>
                <ul style={{ fontSize: "14px", textAlign: "end", padding: "0" }} >
                    {anchors.map((anchor, index) => (
                        <Anchor key={"anchor_" + index + "_" + anchor.id}
                            id={anchor.id}
                            label={anchor.label}
                            select={idSelect === anchor.id}
                            setId={(id)=>{
                                onChange(id)
                            }}
                        />
                    ))}
                </ul>
            </div>
            {animate}
        </div>
    )
}