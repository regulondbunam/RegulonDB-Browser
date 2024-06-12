export default function FirstColumn({ rankingGenes, widthCell }) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${widthCell}px`,
          gridTemplateRows: `repeat(${rankingGenes.length}, 30px)`,
          rowGap: "2px",
          width: `${widthCell}px`,
          position: "sticky",
          left: 0,
          background: "#ffffff",
        }}
      >
        {rankingGenes.map((gene, index) => {
          return (
            <div
              key={"geneRanking_" + index + "_" + gene}
              className="cellFirstColumn"
            >
              <p>
                <b dangerouslySetInnerHTML={{ __html: gene }} />
              </p>
            </div>
          );
        })}
      </div>
    );
  }