let resultElement = document.getElementById("result");
let formulaElement = document.getElementById("math-formula");
let currentInput = "";
let previousInput = "";
let operator = "";
const operators = ["÷", "×", "−", "+"];


const calcResult = (value) => {
    if (value === "%") {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (value === "CE") {
        currentInput = "";
        previousInput = "";
        operator = "";
        formulaElement.innerText = "";
    } else if (value === "C") {
        currentInput = "";
    } else if (value === "⌫") {
        currentInput = currentInput.slice(0, -1);
    } else if (value === "1/x") {
        currentInput = (1 / parseFloat(currentInput)).toString();
    } else if (value === "x²") {
        currentInput = (parseFloat(currentInput) ** 2).toString();
    } else if (value === "²√x") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    } else if (value === "+/-") {
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (operators.includes(value)) {
        if (currentInput === "") return;
        if (previousInput !== "") {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = "";
    } else if (value === "=") {
        if (previousInput !== "" && currentInput !== "") {
            calculate();
        }
    } else {
        currentInput += value;
    }

    resultElement.innerText = currentInput || "0";
    formulaElement.innerText = previousInput + " " + operator + " " + currentInput;
};

const calculate = () => {
    let expression = previousInput + "" + operator + "" + currentInput;
    expression = expression.replace("×", "*").replace("÷", "/").replace("−", "-");

    try {
        currentInput = eval(expression).toString();
        previousInput = "";
        operator = "";
    } catch (e) {
        currentInput = "Error";
    }
};

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        calcResult(button.innerText);
    });
});