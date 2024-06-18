import React, { useReducer } from "react";
import DrawingTraces, { CONTROLS_POSITIONS } from "apps/DrawingTracesTool/Ecoli/DrawingTraces";
import { DataVerifier } from "ui-components/utils";

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

function initState({leftEndPosition, rightEndPosition, id, fragments}){
  let left = leftEndPosition
  let right = rightEndPosition
  let ids = [id]
  if (DataVerifier.isValidArray(fragments)) {
    left = fragments.reduce((fragmentA, fragmentB) =>
      fragmentA.leftEndPosition < fragmentB.leftEndPosition
        ? fragmentA.leftEndPosition
        : fragmentB.leftEndPosition
    ) - 500;
    right = fragments.reduce((fragmentA, fragmentB) =>
      fragmentA.rightEndPosition > fragmentB.rightEndPosition
        ? fragmentA.rightEndPosition
        : fragmentB.rightEndPosition
    ) + 500;
    ids = fragments.map(fragment=>`${id}_${fragment.name}`)
  }
  return {
    left,
    right,
    ids
  }
}

export default function DrawTrace({ leftEndPosition, rightEndPosition, id, fragments }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer, {leftEndPosition,rightEndPosition,id,fragments}, initState)
  return <DrawingTraces 
    height={150} 
    leftEndPosition={state.left} 
    rightEndPosition={state.right} 
    showTable={false} 
    focusElements={state.ids} 
    controlsPosition={CONTROLS_POSITIONS.BOTTOM_RIGHT}
    />;
}
