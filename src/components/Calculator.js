import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('0');

    const handleClick = (value) => {
        if (value === '+/-') {
            // Toggle sign functionality
            setDisplay((prevDisplay) => (prevDisplay.charAt(0) === '-' ? prevDisplay.slice(1) : '-' + prevDisplay));
        } else {
            setDisplay((prevDisplay) => (prevDisplay === '0' ? value : prevDisplay + value));
        }
    };

    const calculateResult = () => {
        try {
            const sanitizedInput = display.replace(/÷/g, '/').replace(/x/g, '*');
            setDisplay(eval(sanitizedInput).toString());
        } catch (error) {
            setDisplay('Error');
        }
    };

    const clearDisplay = () => {
        setDisplay('0');
    };

    const buttons = [
        ['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '+/-', '%', '÷'],
        ['2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', 'x'],
        ['¹/ₓ', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-'],
        ['x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+'],
        ['Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '=']
    ];

    const getButtonClass = (button) => {
        if (['+', '-', 'x', '÷', '=', 'C', '+/-', '%'].includes(button)) {
            return 'button-operator';
        } else if (['mc', 'm+', 'm-', 'mr', '2ⁿᵈ', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '¹/ₓ', '²√x', '³√x', 'ʸ√x', 'ln', 'log₁₀', 'x!', 'sin', 'cos', 'tan', 'e', 'EE', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'].includes(button)) {
            return 'button-function';
        } else if (button === '0') {
            return 'button-number button-wide';
        } else {
            return 'button-number';
        }
    };

    return ( <
        div className = "calculator" >
        <
        div className = "display" > { display } < /div> <
        div className = "buttons" > {
            buttons.flat().map((button, index) => ( <
                button key = { index }
                className = { getButtonClass(button) }
                onClick = {
                    () => {
                        if (button === '=') {
                            calculateResult();
                        } else if (button === 'C') {
                            clearDisplay();
                        } else {
                            handleClick(button);
                        }
                    }
                } >
                { button } <
                /button>
            ))
        } <
        /div> <
        /div>
    );
};

export default Calculator;