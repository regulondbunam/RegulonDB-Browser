import useFeatureVM from "../../../viewModel/canva/useTracksVM/useFeatureVM";

export default function Feature({ feature }) {
  const { color, height, top, width, right } = useFeatureVM(feature);

  if(right === null){return null}

  return (
    <div
      style={{
        position: "absolute",
        right: right + "px",
        top: top+"px",
        width: width + "px",
        height: height + "px",
        backgroundColor: color,
      }}
    />
  );
}
