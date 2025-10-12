import membraneElement from "./membraneElement";

function nodesId(width){
  return {
    a:{
      id: 'membrane-a',
      position: { x: -20, y: 20 },
    },
    aa:{
      id: 'membrane-aa',
      position: { x: width+20, y: 20 },
    },
    b:{
      id: 'membrane-b',
      position: { x: -20, y: 40 },
    },
    bb:{
      id: 'membrane-bb',
      position: { x: width+20, y: 40 },
    }
  };
};

export default function implementMembrane(cy,width){
  const meds = nodesId(width)
  const elements = membraneElement(nodesId(width));
  cy.add(elements);

  const  updateFixedNode = ()=>{
    Object.keys(meds).forEach(key=>{
      const node = meds[key];
      const pan = cy.pan();
      const z = cy.zoom();
      const x = (node.position.x - pan.x)/z;
      const n = cy.$(`#${node.id}`);
      if(node.position.y > 0){
        cy.batch(() => {
          n.position({ x: x, y: node.position.y})
          n.style({
            width:  10 / z,
            height: 10 / z,
          });
        })
      }
    })
  }

  cy.on('zoom pan resize', updateFixedNode);
  cy.one('ready', updateFixedNode);
  cy.on('layoutstop', updateFixedNode);

}

