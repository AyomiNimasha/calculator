import { useReducer } from "react";
import "../index.css";

function result(operation, prevw, currentt) {
  let prev = parseFloat(prevw);
  let current = parseFloat(currentt);
  let results = 0;

  if (operation === "+") {
    results = prev + current;
  }
  if (operation === "-") {
    results = prev - current;
  }
  if (operation === "*") {
    results = prev * current;
  }
  if (operation === "/") {
    results = prev / current;
  }
  return results;
}

export const actions = {
  add_digit: "add-digit",
  choose_operation: "choose operations",
  clear: "clear",
  delete_digit: "delete-digit",
  evaluate: "evaluate",
};
function reducer(state, { type, payload }) {
  console.log(type);
  switch (type){
    case "evaluate":
      if (state.currentOpperand && state.previousOperand && state.operation) {
        return {
          ...state,
          previousOperand: "",
          operation: "",
          currentOpperand: result(
            state.operation,
            state.previousOperand,
            state.currentOpperand
          ),
        };
      } else {
        return {
          ...state,
        };       
    }
    case "clear":
      return {
        ...state,
        currentOpperand: "",
        previousOperand: "",
        operation: "",
      };
      case "delete":
      if (state.currentOpperand.length >= 1) {
        return {
          ...state,
          currentOpperand: state.currentOpperand.slice(0, -1),
        };
      } else {
        return {
          ...state,
        };
      }
      case "add_digit":
      console.log(state.currentOpperand);
      return {
        ...state,
        currentOpperand:
          state.currentOpperand === ""
            ? state.currentOpperand + payload
            : state.currentOpperand + payload,
      };
      case "add_Zero":
        return {
          ...state,
          currentOpperand:
            state.currentOpperand === "0"
              ? state.currentOpperand
              : state.currentOpperand + payload,
        };
        case "decimal_point":
      return {
        ...state,
        currentOpperand: state.currentOpperand.includes(".")
          ? state.currentOpperand
          : state.currentOpperand + payload,
      };
      case "operation":
      let prev = parseFloat(state.previousOperand);
      let current = parseFloat(state.currentOpperand);
      if (payload === "-" && state.previousOperand == "") {
        console.log("aaaaaaa");
        return {
          ...state,
          previousOperand: "",
          currentOpperand: payload,
        };
      }
      if (state.previousOperand && state.currentOpperand && state.operation) {
        console.log("lalal");
        switch (state.operation) {
          case "+":
            return {
              previousOperand: prev + current,
              operation: payload,
              currentOpperand: "",
            };
            case "-":
            return {
              previousOperand: prev - current,
              operation: payload,
              currentOpperand: "",
            };
            case "*":
            return {
              previousOperand: prev * current,
              operation: payload,
              currentOpperand: "",
            };
            case "/":
              return {
                previousOperand: prev / current,
                operation: payload,
                currentOpperand: "",
              };
          }}
          else if (state.previousOperand) {
            console.log("kkkkkk");
            return {
              ...state,
              operation: payload,
              currentOpperand: "",
            };
          } else if (state.currentOpperand && state.currentOpperand != "-") {
            console.log("object");
            return {
              ...state,
              previousOperand: state.currentOpperand,
              operation: payload,
              currentOpperand: "",
            };
          } else {
            console.log("qqqq");
            return {
              ...state,
            };
          }
    
        default:
          return { ...state };

}
const Calculator = () => {
  const [{ currentOpperand, previousOperand, operation }, dispatch] =
    useReducer(reducer, { currentOpperand: "" });
  return (
    <div className="container">
      <div className="display">
        <div>
          {previousOperand}
          {operation}
        </div>
        <div>{currentOpperand}</div>
      </div>
      <div className="cal--button">
        <div className="row row--1">
          <div
            className="btn"
            onClick={() => dispatch({ type: "clear", payload: "" })}
          >
            AC
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "delete", payload: "" })}
          >
            DEL
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "operation", payload: "/" })}
          >
            /
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "operation", payload: "*" })}
          >
            *
          </div>
        </div>
        <div className="row row--2">
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "7" })}
          >
            7
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "8" })}
          >
            8
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "9" })}
          >
            9
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "operation", payload: "-" })}
          >
            -
          </div>
        </div>
        <div className="row row--3">
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "4" })}
          >
            4
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "5" })}
          >
            5
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "6" })}
          >
            6
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "operation", payload: "+" })}
          >
            +
          </div>
        </div>
        <div className="row row--4">
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "1" })}
          >
            1
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "2" })}
          >
            2
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_digit", payload: "3" })}
          >
            3
          </div>
          <div className="btn" onClick={() => dispatch({ type: "evaluate" })}>
            =
          </div>
        </div>
        <div className="row row--5">
          <div
            className="btn"
            onClick={() => dispatch({ type: "add_Zero", payload: "0" })}
          >
            0
          </div>
          <div
            className="btn"
            onClick={() => dispatch({ type: "decimal_point", payload: "." })}
          >
            .
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calculator;

