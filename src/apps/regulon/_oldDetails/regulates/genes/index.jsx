import React, { useMemo, useState } from "react";

function Genes({ genes, idPanel = "regulates_genes" }) {
  // Lista de genes ordenados
  const sortedGenes = useMemo(() => {
    return [...genes].map(g => g.name).sort((a, b) => a.localeCompare(b));
  }, [genes]);

  // Agrupar términos de ontología y ordenarlos
  const ontologyByCategory = useMemo(() => {
    const categories = {
      biologicalProcess: {},
      cellularComponent: {},
      molecularFunction: {},
    };

    genes.forEach(gene => {
      const ontology = gene.terms?.geneOntology;
      if (!ontology) return;

      Object.keys(categories).forEach(cat => {
        (ontology[cat] || []).forEach(term => {
          if (!categories[cat][term._id]) {
            categories[cat][term._id] = {
              ...term,
              genes: [],
            };
          }
          categories[cat][term._id].genes.push(gene.name);
        });
      });
    });

    // Ordenar cada categoría por número de genes (descendente)
    const sortedCategories = {};
    Object.keys(categories).forEach(cat => {
      sortedCategories[cat] = Object.values(categories[cat]).sort(
        (a, b) => b.genes.length - a.genes.length
      );
    });

    return sortedCategories;
  }, [genes]);

  // Estado para desplegar genes por término
  const [expandedTerm, setExpandedTerm] = useState({});
  // Estado para mostrar más términos por categoría
  const [showAllCategories, setShowAllCategories] = useState({});
  // Estado para mostrar más genes en la lista principal
  const [showAllGenes, setShowAllGenes] = useState(false);

  const toggleExpanded = (id) => {
    setExpandedTerm(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleShowAll = (cat) => {
    setShowAllCategories(prev => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const renderCategory = (title, catKey, terms) => {
    const showAll = showAllCategories[catKey];
    const visibleTerms = showAll ? terms : terms.slice(0, 5);

    return (
      <div style={{ marginBottom: "1rem" }}>
        <h4>{title}</h4>
        {visibleTerms.map(term => {
          const sortedGenesInTerm = [...term.genes].sort((a, b) => a.localeCompare(b));
          return (
            <p key={term._id}>
              {term.name}{" "}
              {expandedTerm[term._id] ? (
                <>
                  (
                  {sortedGenesInTerm.join(", ")}{" "}
                  <span
                    style={{ cursor: "pointer", color: "#72A7C7" }}
                    onClick={() => toggleExpanded(term._id)}
                  >
                    [hide]
                  </span>
                  )
                </>
              ) : (
                <>
                  (
                  <span
                    style={{ cursor: "pointer", color: "#72A7C7" }}
                    onClick={() => toggleExpanded(term._id)}
                  >
                    {term.genes.length}
                  </span>
                  )
                </>
              )}
            </p>
          );
        })}

        {terms.length > 5 && (
          <p>
            <span
              style={{ cursor: "pointer", color: "#72A7C7" }}
              onClick={() => toggleShowAll(catKey)}
            >
              {showAll ? "Hide" : "Read more >"}
            </span>
          </p>
        )}
      </div>
    );
  };

  return (
    <div id={idPanel} style={{ overflow: "auto" }}>
      {/* Lista principal de genes */}
      <div>
        <h3>
          Regulated Genes ({sortedGenes.length})
        </h3>
        <p>
          {showAllGenes
            ? sortedGenes.join(", ")
            : sortedGenes.slice(0, 100).join(", ")}
          {sortedGenes.length > 100 && (
            <>
              {" "}
              <span
                style={{ cursor: "pointer", color: "#72A7C7" }}
                onClick={() => setShowAllGenes(!showAllGenes)}
              >
                {showAllGenes ? "[hide]" : "... Show more"}
              </span>
            </>
          )}
        </p>
      </div>

      {/* Ontología */}
      <div>
        <h3>Regulated Gene Ontology</h3>
        {renderCategory("Biological Process", "biologicalProcess", ontologyByCategory.biologicalProcess)}
        {renderCategory("Cellular Component", "cellularComponent", ontologyByCategory.cellularComponent)}
        {renderCategory("Molecular Function", "molecularFunction", ontologyByCategory.molecularFunction)}
      </div>
    </div>
  );
}

export default Genes;
