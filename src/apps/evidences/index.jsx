import { useMemo, useState, useRef } from "react";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";
import "react-complex-tree/lib/style-modern.css";
import evidencesData from "./evidencesDatamart_full.json";
import Node from "./node";
import { DataVerifier, Cover } from "../../components/ui-components";

function formatEvidenceData(evidences) {
  const items = {};
  const allChildren = new Set();
  const allParents = new Map();

  // Crear el nodo raíz
  items["root"] = {
    index: "root",
    children: [],
    data: "Evidences",
    isFolder: true
  };

  // Inicializar todos los nodos de evidencia
  evidences.forEach(e => {
    items[e._id] = {
      index: e._id,
      isFolder: false, // Se actualizará si tiene hijos
      children: [],
      data: e.name,
      details: { ...e, path: [] } // Agregar path vacío inicialmente
    };
  });

  // Construir relaciones padre-hijo correctamente
  evidences.forEach(e => {
    if (e.superClassOf && DataVerifier.isValidArray(e.superClassOf)) {
      e.superClassOf.forEach(childId => {
        if (childId !== e._id && items[childId]) {
          if (!items[e._id].children.includes(childId)) { // Evita duplicaciones
            items[e._id].children.push(childId);
            items[e._id].isFolder = true; // Asegurar que los padres sean expandibles
            allChildren.add(childId);
            allParents.set(childId, e._id); // Mapear hijo -> padre
          }
        }
      });
    }
  });

  // Asignar nodos sin padres al nodo raíz
  evidences.forEach(e => {
    if (!allChildren.has(e._id)) {
      items["root"].children.push(e._id);
    }
  });

  // Calcular la ruta de cada nodo incluyendo el nodo actual en negritas
  Object.keys(items).forEach(id => {
    if (id !== "root") {
      let path = [];
      let current = id;
      while (allParents.has(current)) {
        path.unshift(items[allParents.get(current)].data);
        current = allParents.get(current);
      }
      path.push(`<b>${items[id].data}</b>`); // Agregar el nodo actual en negritas
      items[id].details.path = path;
    }
  });

  return { items, allParents };
}

export default function EvidenceTree(params) {
  const evidences = evidencesData.evidencesDatamart;
  return (
    <div>
      <Cover>
        <h1>Evidences Tree</h1>
      </Cover>
      <BuildTree evidences={evidences} />
    </div>
  );
}

function BuildTree({ evidences }) {
  const [focusedItem, setFocusedItem] = useState(null);
  const [expandedItems, setExpandedItems] = useState(["root"]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const treeRef = useRef(null);
  const { items, allParents } = useMemo(() => formatEvidenceData(evidences), [evidences]);

  // Función para obtener la ruta de expansión hasta el nodo
  const getPathToRoot = (nodeId) => {
    let path = [];
    let current = nodeId;
    while (allParents.has(current)) {
      path.unshift(current);
      current = allParents.get(current);
    }
    if (current !== "root") path.unshift(current); // Asegurar incluir el nodo raíz
    return path;
  };

  // Manejar búsqueda
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    if (query.length >= 4) {
      const filtered = Object.values(items)
        .filter(item => item.data.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
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
    <div style={{ display: "grid", gridTemplateColumns: "30% 70%", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ padding: "10px", overflowY: "auto", maxHeight: "100vh", fontFamily: "Arial, sans-serif" }} ref={treeRef}>
        <input
          type="text"
          placeholder="Search evidence..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />
        {suggestions.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, background: "white", border: "1px solid #ccc" }}>
            {suggestions.map(item => (
              <li key={item.index} style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSelect(item)}>
                {item.data}
              </li>
            ))}
          </ul>
        )}
        <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
          <ControlledTreeEnvironment
            items={items}
            getItemTitle={(item) => item.data}
            viewState={{
              "tree-1": {
                focusedItem,
                expandedItems,
                selectedItems,
              },
            }}
            onFocusItem={(item) => setFocusedItem(item.index)}
            onExpandItem={(item) => setExpandedItems([...expandedItems, item.index])}
            onCollapseItem={(item) => setExpandedItems(expandedItems.filter(i => i !== item.index))}
            onSelectItems={(items) => setSelectedItems(items)}
          >
            <Tree treeId="tree-1" rootItem="root" treeLabel="Evidence Tree" />
          </ControlledTreeEnvironment>
        </div>
      </div>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {selectedItems.length > 0 && (
          <Node {...items[selectedItems[0]].details} />
        )}
      </div>
    </div>
  );
}