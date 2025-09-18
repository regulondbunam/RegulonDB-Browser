export default function Label({track}){
    const {name} = track;
    return (
        <div style={{position: "absolute", top: 0, left: 0}} >
            {name}
        </div>
    )
}