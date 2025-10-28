/*
* import useGUData from "../viewmodel/useGUData";

export default function GUData({ guId }) {
  const {
    loading,
    graphLoading,
    error,
    dimensions,
    cyContainer,
    refContainer,
    handTest
  } = useGUData(guId);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error to load graph data...</div>;

  return (
    <div style={{ height: "100vh", width: "100%", display: "grid", gridTemplateColumns: "20% 80%" }} >
      <div>Lateral Bar</div>
      <div
        ref={refContainer}
        style={{ height: "100%", width: "100%" }}
      >
        <div
          ref={cyContainer}
          style={{
            width: dimensions.width + "px",
            height: dimensions.height + "px",
            backgroundColor: "whitesmoke",
          }}
        />
        {graphLoading && (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.58)",
                position: "absolute",
                top: 0,
              }}
            />
            <div
              style={{
                backgroundColor: "rgba(12,106,135,0.87)",
                position: "absolute",
                top: "225px",
                height: "50px",
                width: "100%",
                zIndex: 99,
              }}
            >
              "loading"
            </div>
          </>
        )}
      </div>
    </div>
  );
}

*
* */