import React, { ReactNode } from 'react';

interface displayState {
    display: string;
    clearOnPress: boolean;
}

const keyWords = ['+', '-', '*', '/']

class Calculator extends React.Component<{}, displayState> {
    constructor(props: any) {
        super(props)
        this.state = {
            display: '0',
            clearOnPress: false
        }
        this.clear = this.clear.bind(this);
        this.addToDisplay = this.addToDisplay.bind(this);
        this.calculate = this.calculate.bind(this);
    }
    clear() {
        this.setState({
            display: '0'
        })
    }
    addToDisplay(event: any) {
        let clearDisplay = this.state.clearOnPress
        let display = undefined;
        // Should the display be cleared after calculating a value?
        if (clearDisplay) {
            this.setState({
                clearOnPress: false
            })
            display = '0'
        } else {
            display = this.state.display;
        }
        let buttonText = event.target.innerText;
        // If last character is a operation, then don't add another operation
        if ((keyWords.includes(display[display.length - 1]) && display[display.length - 1] == '.' && keyWords.includes(buttonText)) || (keyWords.includes(buttonText) && display === '0')) {
            return false
        }
        /* A decimal should only be placed if:
        - The decimal is placed after one number
        5.5 + 6       
        */
        // 10.5-5.
        // 10.5-5..
        // 10.5-.
        /*
        When can you NOT add a decimal?
        - If a decimal is before it
        - If a operation is before it
        */
        let testDecimal = display + '.';
        let decimalsCounted = 0;
        for (var i = testDecimal.length - 1; i >= 0; i--) {
            // console.log(display[i]);
            if (testDecimal[i] == '.') {
                decimalsCounted++
            } else if (keyWords.includes(testDecimal[i])) {
                break;
            }
        }
        console.log(decimalsCounted);
        if (decimalsCounted > 1 && buttonText == '.') {
            return false
        }
        // If display is zero
        if (display === '0') {
            this.setState({
                display: buttonText
            })
        } else {
            // If display can be concatenated
            this.setState({
                display: this.state.display.concat(buttonText)
            })
        }
    }
    calculate() {
        let display = this.state.display.split('');
        let splitPart = '';
        let numbers = []
        let operations = []
        for (var i = 0; i < display.length; i++) {
            if (keyWords.includes(display[i])) {
                operations.push(display[i])
                numbers.push(splitPart)
                splitPart = ''
            } else {
                splitPart = splitPart + display[i]
                if (i == display.length - 1) {
                    numbers.push(splitPart)
                }
                console.log(splitPart);
            }
        }
        console.log(numbers, operations);
        let operationCount = 0;
        let total = 0;
        for (var i = 0; i < numbers.length; i++) {
            let currentOperation = operations[operationCount];
            if (currentOperation == '+') {
                if (operationCount == 0) {
                    total += (Number(numbers[i]) + Number(numbers[i + 1]))
                } else {
                    total += Number(numbers[i + 1])
                }
            }
            if (currentOperation == '-') {
                if (operationCount == 0) {
                    total += (Number(numbers[i]) - Number(numbers[i + 1]))
                } else {
                    total -= Number(numbers[i + 1])
                }
            }
            if (currentOperation == '*') {
                if (operationCount == 0) {
                    total += (Number(numbers[i]) * Number(numbers[i + 1]))
                } else {
                    total *= Number(numbers[i + 1])
                }
            }
            if (currentOperation == '/') {
                if (operationCount == 0) {
                    total += (Number(numbers[i]) / Number(numbers[i + 1]))
                } else {
                    total /= Number(numbers[i + 1])
                }
            }
            operationCount++
        }
        console.log(total);
        this.setState({
            display: String(total),
            clearOnPress: true
        })
    }
    render() {
        let displayVal = this.state.display;
        return (
            <div id="calculator">
                <div id="display">
                    {displayVal}
                </div>
                <button onClick={this.clear} id="clear">AC</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="zero">0</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="one">1</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="two">2</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="three">3</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="four">4</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="five">5</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="six">6</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="seven">7</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="eight">8</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="number" id="nine">9</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="operation" id="add">+</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="operation" id="subtract">-</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="operation" id="multiply">*</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="operation" id="divide">/</button>
                <button onClick={(event) => { this.addToDisplay(event) }} className="operation" id="decimal">.</button>
                <button onClick={this.calculate} id="equals">=</button>
            </div>
        )
    }
}

export default Calculator;