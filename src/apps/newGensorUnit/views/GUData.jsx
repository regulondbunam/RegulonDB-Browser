import useGUData from "../viewmodel/useGUData";

export default function GUData({guId}){

  const {loading, error, cyContainer} = useGUData(guId);

  return(
    <div>
      Hola
      <div ref={cyContainer} style={{width: "500px", height: "500px", backgroundColor: "whitesmoke"}}   >

      </div>
    </div>
  )
}