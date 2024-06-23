import React, { useReducer } from "react";
import DrawingTraces, { CONTROLS_POSITIONS, FOCUS_TYPE } from "apps/DrawingTracesTool/Ecoli/DrawingTraces";
import { collectIds } from "ui-components/Web/Related";

const ACTIONS = {
  setPositions: 1
}

function reducer(state,action){
  switch (action.type) {
    case ACTIONS.setPositions:
      return {...state, left: action.leftEndPosition, right: action.rightEndPosition}
    default:
      return state
  }
}

/**
 * Initializes the state based on the provided parameters.
 *
 * @param {Object} params - The parameters object.
 * @param {number} params.leftEndPosition - The initial left end position.
 * @param {number} params.rightEndPosition - The initial right end position.
 * @param {string} params.id - The initial ID.
 * @param {Array<Object>} params.fragments - An array of fragment objects.
 * @param {number} params.fragments[].leftEndPosition - The left end position of a fragment.
 * @param {number} params.fragments[].rightEndPosition - The right end position of a fragment.
 * @param {string} params.fragments[].name - The name of a fragment.
 * @returns {Object} The initialized state.
 * @returns {number} return.left - The calculated left end position.
 * @returns {number} return.right - The calculated right end position.
 * @returns {Array<string>} return.ids - The array of IDs.
 */

function initState({operon}){
  let left = operon.operon.regulationPositions?.leftEndPosition
  let right = operon.operon.regulationPositions?.rightEndPosition
  let ids = collectIds(operon,[operon._id])
  return {
    left,
    right,
    ids
  }
}
//RDBECOLIGNC03792
export default function DrawTrace({ operon }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, {operon}, initState)
  return <DrawingTraces 
    height={150} 
    leftEndPosition={state.left} 
    rightEndPosition={state.right} 
    showTable={false} 
    focusElements={state.ids}
    focusType={FOCUS_TYPE.ONLY_FOCUS}
    controlsPosition={CONTROLS_POSITIONS.BOTTOM_RIGHT}
    />;
}
