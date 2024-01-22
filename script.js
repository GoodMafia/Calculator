class Calculator {
    constructor() {
      this.clear();
    }

    clear() {
      this.currentInput = '0';
      this.previousInput = '';
      this.operation = null;
      this.updateDisplay();
    }

    appendDigit(digit) {
      this.currentInput = (this.currentInput === '0') ? digit.toString() : this.currentInput + digit.toString();
      this.updateDisplay();
    }

    setOperation(operator) {
      if (this.currentInput !== '0') {
        this.previousInput = this.currentInput;
        this.currentInput = '0';
        this.operation = operator;
        this.updateDisplay();
      }
    }

    calculate() {
      if (this.previousInput !== '' && this.operation !== null) {
        const num1 = parseFloat(this.previousInput);
        const num2 = parseFloat(this.currentInput);

        const operations = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          '*': (a, b) => a * b,
          '/': (a, b) => a / b,
        };

        const operationFunc = operations[this.operation];
        if (operationFunc) {
          const result = operationFunc(num1, num2); 
          this.currentInput = result.toString();
          this.previousInput = '';
          this.operation = null;
          this.updateDisplay();
        }
      }
    }

    handleButtonClick(event) {
      const buttonValue = event.target.innerText;

      if (!isNaN(buttonValue)) {
        this.appendDigit(parseInt(buttonValue));
      } else if ('+-*/'.includes(buttonValue)) {
        this.setOperation(buttonValue);
      } else if (buttonValue === '=') {
        this.calculate();
      } else if (buttonValue === 'C') {
        this.clear();
      }
    }

    updateDisplay() {
      document.getElementById('display').value = this.currentInput;
    }
  }

  const calculator = new Calculator();