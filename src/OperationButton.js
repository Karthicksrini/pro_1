import React from "react"

function NumButton({operation,dispatch}){
    return(
        <button onClick={()=>dispatch({type:"operation",payload:{operation}})}>
        {operation}
    </button>
    )
}

export default NumButton;