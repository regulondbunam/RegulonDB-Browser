export default function changeTitle (state,newTitle){
    return{...state, drawState:{...state.drawState, title: newTitle}}
}