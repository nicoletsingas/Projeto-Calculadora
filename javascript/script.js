const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons-container button");

class calculator{
    constructor(previousOperationText, currentOperationText){
            this.previousOperationText = previousOperationText;
            this.currentOperationText = currentOperationText;
            this.currentOperation= "";
    };

    //add digit to calculator screen
    addDigit(digit){
        //check if current operation already has a dot
        if (digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    };

    //process all calculator operations
    processOperations(operation){
        //check if current is empty
        if (this.currentOperationText.innerText === "" && operation !== "C"){
            //change ooperation
            if (this.previousOperationText.innerText !== ""){
                this.changeOperation(operation);
            }
            return;
        }

        //get current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    //change values of operation screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null){

        console.log(operationValue, operation, current, previous);

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            //check if value is zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            //add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        };
    };
    //change math operation
    changeOperation(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)){
            return;
        };
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    };

    processDelOperator(){ //delete the last digit
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){ //clear current operation
        this.currentOperationText.innerText = "";
    };

    processClearAllOperation(){ //clear all operations
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    };

    processEqualOperator(){ //equal operator
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperations(operation);
    };
};

const calc = new calculator(previousOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener("click", (e) =>{

        const value = e.target.innerText;
        if(+value >= 0 || value === "."){
            calc.addDigit(value);
        } else{
            calc.processOperations(value);
        }

    });
});