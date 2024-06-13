import conf from "./conf.json";

/**
 * description
 * @param {object} component description
 * @return {object} informationNode description
 */
function generateInformationNode(component, nameReaction, position) {
  let positionY =
    component.function === "product" || component.name.includes("_Ext")
      ? position.y - conf.childNodeSpace
      : position.y + conf.childNodeSpace;
  return {
    data: {
      id: component.name,
      class:
        conf.nodeStyles[component.type] == null
          ? conf.nodeStyles["default"]
          : conf.nodeStyles[component.type],
      label: component.name,
      type: component.type,
      associatedReaction: [nameReaction],
      clonemarker: false, // whether the node has a clonemarker or not
      stateVariables: [], // an array of state variables
      unitsOfInformation: [], // an array of units of information
      function: component.function,
    },
    //agregar la posicion
    position: { x: position.x, y: positionY },
  };
}

export function generateNodes(component, components, infoReaction, position) {
  if (!component) {
    //Si no existe component se agrega el nodo de la reaccion
    return {
      data: {
        id: infoReaction.nameReaction,
        label: infoReaction.nameReaction,
        class: conf.nodeStyles["reactions"],
        type: infoReaction.type,
        associatedReaction: [infoReaction.nameReaction],
        clonemarker: false,
        stateVariables: [],
        unitsOfInformation: [],
      },
      position: { x: position.x, y: position.y },
    };
  } else if (component.type === "complex") {
    let complex = [];
    complex.push(
      generateInformationNode(component, infoReaction.nameReaction, position)
    );

    let namesSubNodos = component.name.split("-");
    components
      .filter((node) => namesSubNodos.includes(node.name))
      .forEach((subNode) => {
        const newObj = { ...subNode, name: "sub" + subNode.name };
        let nodo = generateInformationNode(
          newObj,
          infoReaction.nameReaction,
          position
        );
        nodo.data["parent"] = component.name;
        complex.push(nodo);
      });
    return complex;
  } else {
    // (component, nameReaction, position) {
    return generateInformationNode(
      component,
      infoReaction.nameReaction,
      position
    );
  }
}
