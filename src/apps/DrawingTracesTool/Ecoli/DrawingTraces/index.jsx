import React, { useReducer } from 'react'
import { useGetGeneticElements } from 'webServices/queries'
import { MOVE, REDUCER } from './static';


function reducer(state, action) {
    switch (action.type) {
        case REDUCER.MoveLeft:
            const moveL = Math.ceil((state.rightEndPosition - state.leftEndPosition)*MOVE)
            return {...state, rightEndPosition: state.rightEndPosition - moveL, leftEndPosition: state.leftEndPosition-moveL }
        case REDUCER.MoveRight:
            const moveR = 2
            break;
        case REDUCER.ZoomIn:

            break;
        case REDUCER.ZoomOut:

            break;
        case REDUCER.Reset:

            break;

        default:
            break;
    }
}


export default function DrawingTraces(props) {
    
    const [state, dispatch] = useReducer(reducer, { ...props })
    const { geneticElements, loading, error } = useGetGeneticElements({
        ...state
    })
    console.log(loading);
    console.log(state);
    console.log(geneticElements);
    return (
        <div>
            <button onClick={()=>{dispatch({type:REDUCER.MoveLeft})}}>LEft</button>
        </div>
    )
}
