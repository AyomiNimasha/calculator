import { actions } from "./calculator"
export default function DigitButtons({dispactch,digit}){
    return(
        <button onClick={()=>dispactch({type:actions.add_digit,payload:{digit}})}>
            {digit}
        </button>
    )
}