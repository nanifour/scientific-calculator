//can also return undefined (if needed: especially in math when dividing by 0)

//Select input elements
const input_element = document.querySelector('.input');
const output_op_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

//variables
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL";
let data = {
    operation : [],
    formula : []
}
let answer = 0;

// CALCULATOR BUTTONS
let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "←",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];

//Create Calulator Buttons
function createCalcButtons(){
    const btns_per_row = 8;
    let added_btns = 0;

    //fors eahc btn
    calculator_buttons.forEach( button => {
        //check if the row is emepty
        if (added_btns % btns_per_row == 0){
            //push new row into input element
            input_element.innerHTML += `<div class="row"></div>`;
        }
        //select last row to add 
        const row = document.querySelector(".row:last-child");
        
        row.innerHTML += `<button id="${button.name}">
                                ${button.symbol}
                          </button>`;
           
        //increment added buttons by 1
        added_btns++;
    })
}

//call create function button
createCalcButtons();

//Toggle between Radian and Degree
let RADIAN = true;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active-angle");

//angle function
function angleToggler(){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}


//calc button event listeners to listen for a click
input_element.addEventListener("click", event => {

    const target_btn = event.target;

    //loop over array to check what btn was clicked
    calculator_buttons.forEach( button => {
        if(button.name == target_btn.id) calculator(button);
    })
})

//Calculator function
function calculator(button){
    //functions for different buttons
    if(button.type == "operator"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if(button.type == "number"){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if(button.type == "trigo_function"){

        data.operation.push(button.symbol + "(");
        data.formula.push( button.formula );

    }
    else if(button.type == "math_function"){
        let symbol, formula;

        //if it is a factorial, fix symbol
        if(button.name == "factorial"){
            symbol = "!";
            formula = button.formula;

            data.operation.push(symbol);
            data.operation.push(formula);
        }
        else if(button.name == "power"){  //fix power button symbol & formula
            symbol = "ˆ(";
            formula = button.formula;

            data.operation.push(symbol);
            data.operation.push(formula);
        }
        else if(button.name == "square"){  //fix square button to include the 2
            symbol = "ˆ(";
            formula = button.formula;

            data.operation.push(symbol);
            data.operation.push(formula);            
            
            data.operation.push( "2)" );
            data.formula.push( "2)" );
            
        }
        else {
            //add parenthesis
            symbol = button.symbol + "(";
            formula = button.formula + "(";

            data.operation.push(symbol);
            data.operation.push(formula);
        }

    }
    else if(button.type == "key"){
        //clear screen key
        if(button.name == "clear"){
            data.operation = [];
            data.formula = [];

            updateResultOperation(0); 
        }
        else if(button.name == "delete"){  //delete key
            //remove last element of array
            data.operation.pop();  
            data.formula.pop();
        }
        //Radian and Degree toggle 
        else if( button.name == "rad"){
            RADIAN = true;
            //call toggle function
            angleToggler();
        }
        else if( button.name == "deg"){
            RADIAN = false;
            //call toggle function
            angleToggler();
        } 
    }
    else if(button.type == "calculate"){
        //join formula
        formula_str = data.formula.join('');
        
        let result;

        //check if there is an error in the input
        try{
            result = eval(formula_str);
        }
        catch( error ){
            if( error instanceof SyntaxError){
                result = "Syntax Error"
                updateResultOperation(result)
                return;
            }
        }

        //save result of input for the answer btn
        ans = result;
        data.operation = [result];
        data.formula = [result];

            //update result screen
        updateResultOperation(result);
    }
    //update output screen
    updateOutputOperation( data.operation.join('') );

}

//update operation screen 
function updateOutputOperation(operation){
    //change ouput inner html
    output_op_element.innerHTML = operation;
}
//update result screen
function updateResultOperation(result){
    //change result inner html
    output_result_element.innerHTML = result;
}


//Trigonometric Function
function trigo(callback, angle){
    //convert to radian if its not already in radian
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle);
}

//Inverse Trigonometric Function
function inv_trigo(callback, value){
    //copy angle
    let angle = callback(value);
    
    //check if its not in RADIAN 
    if(!RADIAN){
        angle = angle * 180/Math.PI;  //180/pi
    }
    //convert toggler to angle 
   return angle;
}

//Factorial Function
function factorial( number ){
    if( number % 1 != 0 ) return gamma( number + 1 );
    //if num =0 or 1 return 1
    if ( number === 0 || number ===1 ) return 1;

    let result = 1;
    for( let i = 1; i <= number; i++){  //start at 1 becuase multiples of 0 = 0
        result *= i;
        //if result is close to infinity, use infinity
        if( result === Infinity) return Infinity;

    }
    return result;
}


// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}


