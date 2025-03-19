import { useMemo, useState, useRef } from "react";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import ontologyData from "./ontologyTree.json";
import Term from "./term";
import { Cover } from "../../components/ui-components";

function formatOntologyData(ontology) {
  if (!ontology || !Array.isArray(ontology)) return { items: {}, allParents: new Map() };
  
  const items = {};
  const allChildren = new Set();
  const allParents = new Map();

  // Crear el nodo raíz
  items["root"] = {
    index: "root",
    children: [],
    data: "Ontology Terms",
    isFolder: true
  };

  // Inicializar nodos
  ontology.forEach(term => {
    if (!term._id || !term.name) return;
    items[term._id] = {
      index: term._id,
      isFolder: false, // Se actualizará si tiene hijos
      children: [],
      data: term.name,
      details: { ...term, path: [] }
    };
  });

  // Asignar relaciones padre-hijo correctamente
  ontology.forEach(term => {
    if (Array.isArray(term.subclasses)) {
      term.subclasses.forEach(childId => {
        if (items[childId]) {
          items[term._id].children.push(childId);
          items[term._id].isFolder = true;
          allChildren.add(childId);
          allParents.set(childId, term._id);
        }
      });
    }
  });

  // Determinar los nodos raíz (sin `subclassOf` o sin padres en el dataset)
  ontology.forEach(term => {
    if (!Array.isArray(term.subclassOf) || term.subclassOf.every(parentId => !items[parentId])) {
      if (items[term._id].children.length > 0) {
      items["root"].children.push(term._id);
    }
    }
  });

  // Calcular la ruta de cada nodo
  Object.keys(items).forEach(id => {
    if (id !== "root") {
      let path = [];
      let current = id;
      while (allParents.has(current)) {
        path.unshift(items[allParents.get(current)].data);
        current = allParents.get(current);
      }
      path.push(`<b>${items[id].data}</b>`);
      items[id].details.path = path;
    }
  });

  return { items, allParents };
}

export default function OntologyBrowser(params) {
  const ontology = ontologyData.collectionData?.filter(term => term.ontologyId === "RDBONTOLMCO00001") || [];
  if (!ontology || ontology.length === 0) {
    return <div style={{ padding: "20px", textAlign: "center" }}>No ontology data available.</div>;
  }
  return (
    <div>
      <Cover>
        <h1>Ontology Tree Browser</h1>
      </Cover>
      <TreeOntology terms={ontology} />
    </div>
  );
}

function TreeOntology({ terms }) {
  const [focusedItem, setFocusedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState(["root"]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const treeRef = useRef(null);
  const { items, allParents } = useMemo(() => formatOntologyData(terms), [terms]);

  // Función para obtener la ruta de expansión hasta el nodo
  const getPathToRoot = (nodeId) => {
    let path = [];
    let current = nodeId;
    while (allParents.has(current)) {
      path.unshift(current);
      current = allParents.get(current);
    }
    if (current !== "root") path.unshift(current);
    return path;
  };

  // Manejar búsqueda
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.length >= 3) {
      const filtered = Object.values(items)
        .filter(item => item.data.toLowerCase().includes(query.toLowerCase()))
        ;
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Seleccionar elemento de búsqueda y expandir ruta
  const handleSelect = (item) => {
    const pathToRoot = getPathToRoot(item.index);
    setExpandedItems([...new Set([...expandedItems, ...pathToRoot])]);
    setFocusedItem(item.index);
    setSelectedItems([item.index]);
    setSearchTerm("");
    setSuggestions([]);
    
    // Hacer scroll al nodo seleccionado
    setTimeout(() => {
      if (treeRef.current) {
        const element = document.querySelector(`[data-rct-item-id='${item.index}']`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 200);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "30% 70%", height: "100vh" }}>
      <div style={{ position: "relative", padding: "10px", maxHeight: "100vh" }}>
        <div style={{ position: "sticky", top: 0, background: "white", zIndex: 10, paddingBottom: "5px" }}>
          <input
            type="text"
            placeholder="Search term..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
          />
          {suggestions.length > 0 && (
            <ul style={{ listStyle: "none", padding: 0, background: "white", border: "1px solid #ccc", maxHeight: "200px", overflowY: "auto" }}>
              {suggestions.map(item => (
                <li key={item.index} style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSelect(item)}>
                  {item.data}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ overflowY: "auto", maxHeight: "90vh" }} ref={treeRef}>
          <ControlledTreeEnvironment
            items={items}
            getItemTitle={(item) => item.data}
            viewState={{ "tree-1": { focusedItem, expandedItems, selectedItems } }}
            onFocusItem={(item) => setFocusedItem(item.index)}
            onExpandItem={(item) => setExpandedItems([...expandedItems, item.index])}
            onCollapseItem={(item) => setExpandedItems(expandedItems.filter(i => i !== item.index))}
            onSelectItems={(items) => setSelectedItems(items)}
          >
            <Tree treeId="tree-1" rootItem="root" treeLabel="Ontology Tree" />
          </ControlledTreeEnvironment>
        </div>
      </div>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "auto" }}>
        {selectedItems.length > 0 && <Term {...items[selectedItems[0]].details} />}
      </div>
    </div>
  );
}
