import React from "react"

function NumButton({number,dispatch}){
    return(
        <button onClick={()=>dispatch({type:"number",payload:{number}})}>
        {number}
    </button>
    )
}

export default NumButton;