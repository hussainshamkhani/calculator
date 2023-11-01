import { useState } from 'react'
import { create, all } from 'mathjs';
import './App.css'

const math = create(all);


function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");

  const isOperator = (symbol:string) => {
    return /[*/+-]/.test(symbol);
  };

  const et = expression.trim();

  const buttonPress = (symbol: string) => {
    if (symbol === "clear"){
      setAnswer("");
      setExpression("0");
      return;
    } else if (symbol === "negative"){
      if (answer === "") return;
      if (answer === "0") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1): "-" + answer
      );
    } else if (symbol === "percent"){
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)){
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "="){
      calculate();
      setExpression("");

    } else if (symbol === "0"){
      if (expression === "0"){
        return;
      } else if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
       
    }  else if (symbol === ".") {
      // split by operators and get last number
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      // if last number already has a decimal, don't add another
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
  } else {
    if (expression.charAt(0) === "0"){
      setExpression(expression.slice(1) + symbol);
    } else {
      setExpression(expression + symbol);
    }
  }
  }
  
  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(math.evaluate(answer + newExpression) as string);
    } else {
      setAnswer(math.evaluate(newExpression) as string);
    }
    setExpression("");
  };
  

  return (
  <div id="calculator">
    <h1>Calculator</h1>
    <div id="display" style={{textAlign: "right"}}>
    <div id="answer">{answer}</div>
    <div id='expression'>{expression}</div>
    </div>
    <div id="buttons">
    <button className="light-gray" onClick={() => buttonPress("clear")} id="clear">AC</button>
    <button className="light-gray" onClick={() => buttonPress("negative")} id="negative">+/-</button>
    <button className="light-gray" onClick={() => buttonPress("percentage")} id="percentage">%</button>
    <button className="yellow" onClick={() => buttonPress("/")} id="divide">/</button>
    <button className="dark-gray" onClick={() => buttonPress("7")} id="seven">7</button>
    <button className="dark-gray" onClick={() => buttonPress("8")} id="eight">8</button>
    <button className="dark-gray" onClick={() => buttonPress("9")} id="nine">9</button>
    <button className="yellow" onClick={() => buttonPress("*")} id="multiply">x</button>
    <button className="dark-gray" onClick={() => buttonPress("4")} id="four">4</button>
    <button className="dark-gray" onClick={() => buttonPress("5")} id="five">5</button>
    <button className="dark-gray" onClick={() => buttonPress("6")} id="six">6</button>
    <button className="yellow" onClick={() => buttonPress("-")} id="subtract">-</button>
    <button className="dark-gray" onClick={() => buttonPress("1")} id="one">1</button>
    <button className="dark-gray" onClick={() => buttonPress("2")} id="two">2</button>
    <button className="dark-gray" onClick={() => buttonPress("3")} id="three">3</button>
    <button className="yellow" onClick={() => buttonPress("+")} id="add">+</button>
    <button className="dark-gray" onClick={() => buttonPress("0")} id="zero">0</button>
    <button className="dark-gray" onClick={() => buttonPress(".")} id="decimal">.</button>
    <button className="dark-gray" onClick={() => buttonPress("=")} id="equals">=</button>
    </div>
    </div>
  );
}


export default App;

