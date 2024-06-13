const REACTION_TYPE = {
  transcription: "transcription",
  translation: "translation",
  state_transition: "state transition",
};

const COMPONENT_TYPE = {
  complex: "complex",
};

export function generateElements(nodes, reactions = [], width, height) {
  let elements = [];
  let components = [];
  reactions.forEach((reaction) => {
    if(!reaction){
      return
    }
    /**
     * Variable bandera para identificar si la reaccion tiene elementos que ya se encuentran identificados
     * @type {boolean}
     */
    let isRepeat = false;
    //=>IDENTIFICACION DE LA POSICION DE LA REACCION EN CAPA

    reaction.components.forEach((component) => {
      //Generando Nodos
      if (!components.includes(component.name)) {
        components.push(component.name);
        if (component.type === COMPONENT_TYPE.complex) {
          elements.push({
            data: {
              id: component.name,
              class: COMPONENT_TYPE.complex,
              label: component.name,
              type: component.type,
              associatedReaction: ["R" + reaction.number],
              clonemarker: false, // whether the node has a clonemarker or not
              stateVariables: [], // an array of state variables
              unitsOfInformation: [], // an array of units of information
              function: component.function,
              /*bbox: {
                  x: 1409.3416303507177,
                  y: 170.3243361927971,
                  w: 60,
                  h: 60,
                },*/
            },
          });
          let namesSubNodos = component.name.split("-");
          nodes
            .filter((node) => namesSubNodos.includes(node.name))
            .forEach((subNode) => {
              elements.push({
                data: {
                  id: component.name + "_SubNode" + subNode.name,
                  class:
                    subNode.type === "simple_molecule"
                      ? "simple chemical"
                      : subNode.type === "complex"
                      ? "complex"
                      : "macromolecule",
                  parent: component.name,
                  label: subNode.name,
                  type: subNode.type,
                  associatedReaction: ["R" + reaction.number],
                  clonemarker: false, // whether the node has a clonemarker or not
                  stateVariables: [], // an array of state variables
                  unitsOfInformation: [], // an array of units of information
                  function: subNode.function,
                  /*bbox: {
                    x: 1409.3416303507177,
                    y: 170.3243361927971,
                    w: 60,
                    h: 60,
                  },*/
                },
              });
            });
        }else{
          elements.push({
            data: {
              id: component.name,
              class:
                component.type === "simple_molecule"
                  ? "simple chemical"
                  : "macromolecule",
              label: component.name,
              type: component.type,
              associatedReaction: ["R" + reaction.number],
              clonemarker: false, // whether the node has a clonemarker or not
              stateVariables: [], // an array of state variables
              unitsOfInformation: [], // an array of units of information
              function: component.function,
              /*bbox: {
                x: 1409.3416303507177,
                y: 170.3243361927971,
                w: 60,
                h: 60,
              },*/
              function: component.function,
            },
          });
        }
      } else {
        elements
          .filter((element) => {
            return component.name === element.data.id;
          })[0]
          .data.associatedReaction.push("R" + reaction.number);
      }
      //proceso que genera las edges entre los 
      if (component.function === "product") {
        elements.push({
          data: {
            id: component.name + "RowR" + reaction.number,
            class: "production",
            associatedReaction: ["R" + reaction.number],
            cardinality: 0,
            source: "R" + reaction.number,
            target: component.name,
            bendPointPositions: [],
            portSource: "R" + reaction.number,
            portTarget: component.name,
            function: component.function,
          },
        });
      } else {
        elements.push({
          data: {
            id: component.name + "RowR" + reaction.number,
            class:
              component.type === "gene"
                ? "consumption"
                : component.function === "activator"
                ? "stimulation"
                : component.function === "catalyzer"
                ? "catalysis"
                : component.function === "product"
                ? "production"
                : component.function === "reactant"
                ? "consumption"
                : "necessary stimulation",
            associatedReaction: ["R" + reaction.number],
            source: component.name,
            target: "R" + reaction.number,
            bendPointPositions: [],
            portSource: component.name,
            portTarget: "R" + reaction.number,
            function: component.function,
          },
        });
        //NODO de reaccion
        elements.push({
          data: {
            id: "R" + reaction.number,
            label: "R" + reaction.number,
            class: "process",
            type: reaction.type,
            associatedReaction: ["R" + reaction.number],
            clonemarker: false,
            stateVariables: [],
            unitsOfInformation: [],
          },
        });
      }
    });
  });
  return elements
}
