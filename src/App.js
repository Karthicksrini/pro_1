import React,{useReducer} from "react";
import "./App.css"
import NumButton from "./NumButton";
import OperationButton from "./OperationButton";


function App() {
  
  const reducer=((state,{type,payload})=>{
    switch(type){
      case "number":
        if(state.overwrite){
          return{
            ...state,
            CurrentOperand:payload.number,
            overwrite:false
          }
        }
        if(payload.number==="0" && state.CurrentOperand==="0") return state
        if(payload.number==="." && state.CurrentOperand.includes(".")) return state
        
        return{
          ...state,
          CurrentOperand:`${state.CurrentOperand||""}${payload.number}`,
        } 
      case "operation":
        if(state.CurrentOperand==null && state.prevOperand==null) return state
        
        if(state.CurrentOperand==null){
          return{
            ...state,
            operation:payload.operation,
          }
        }
        if(state.prevOperand==null){
          return{
            ...state,
            operation:payload.operation,
            prevOperand:state.CurrentOperand,
            CurrentOperand:null
          }
        }
        return{
          ...state,
          prevOperand:evaluate(state),
          operation:payload.operation,
          CurrentOperand:null
        }
      case "clear":
        return {}

      case "equal":
        if(state.operation==null||
          state.CurrentOperand==null||
          state.prevOperand==null) return state
        
       return{
        ...state,
        overwrite:true,
        CurrentOperand:evaluate(state),
        prevOperand:null,
        operation:null,
       
       }

       case "delete":
        if(state.overwrite){
          return{
            ...state,
            overwrite:false,
            CurrentOperand:null
          }
        }
        if(state.CurrentOperand===null) return state

        if(state.CurrentOperand.length===1){
          return {...state,CurrentOperand:null}
        }

        return{
          ...state,
          CurrentOperand:state.CurrentOperand.slice(0,-1)
        }

        default:
          return state;
    }

  })
  
  function evaluate({CurrentOperand,prevOperand,operation}){
    const prev=parseFloat(prevOperand)
    const current=parseFloat(CurrentOperand)
    if(isNaN(prev)||isNaN(current))return ""
    let computaion=""
    switch(operation){
      case "+":
        computaion=prev+current
        break;
      case "-":
        computaion=prev-current
        break;
      case "*":
        computaion=prev*current
        break;
      case "/":
        computaion=prev/current
        break;
      case "%":
        computaion=prev%current
        break;
      default:
        computaion=""
        break;
    }
    return computaion.toString();
  }

  const INTEGER_FORMATTER= new Intl.NumberFormat("en-us",{
    maximumFractionDigits:0
  })

  function formatOperand(operand){
    if(operand==null)return
    const [integer,decimal]=operand.split(".")
    if(decimal==null)return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }
  const [{prevOperand,operation,CurrentOperand},dispatch]=useReducer(reducer,{})
  return (
    <div className="App">
      <div className="box">
     <div className="calculator">
      
      <div className="sub_cal">{formatOperand(prevOperand)}{operation}</div>
      <div className="main_cal">{formatOperand(CurrentOperand)}
      </div>
      <div className="buttons">
      <button onClick={()=>dispatch({type:"clear"})} >Clear</button>
      <OperationButton operation="%" dispatch={dispatch}/>
      <button onClick={()=>dispatch({type:"delete"})}>Del</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <NumButton number="7" dispatch={dispatch}/>
      <NumButton number="8" dispatch={dispatch}/>
      <NumButton number="9" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <NumButton number="4" dispatch={dispatch}/>
      <NumButton number="5" dispatch={dispatch}/>
      <NumButton number="6" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <NumButton number="1" dispatch={dispatch}/>
      <NumButton number="2" dispatch={dispatch}/>
      <NumButton number="3" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <NumButton number="00" dispatch={dispatch}/>
      <NumButton number="0" dispatch={dispatch}/>
      <NumButton number="." dispatch={dispatch}/>
      <button onClick={()=>dispatch({type:"equal"})}>=</button>
      </div>

    

      </div>   
      </div>   

    </div>
  );
}

export default App;
