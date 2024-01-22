let calculator_one = () => {
    
    let screen = document.querySelector('.output').innerText,

        buttons = document.querySelectorAll('.js-button'),
        buttonsList = Array.from(buttons);

    buttonsList.forEach( button => {
        button.addEventListener('click',(e) => {
            switch (e.target.innerHTML) {
                case 'AC':
                    screen = '';
                    break;

                case 'Del':
                    if(screen){
                        screen = screen.slice(0,-1);
                    }
                    break;

                case '=':
                    try{
                        screen = eval(screen);
                    }catch{
                        screen = 'Error!'
                    }
                    break;
    
                default:
                    screen += e.target.innerHTML;
            }

            console.log(screen);
        }); 
    });
},
calculator_two = () => {
    class Calculator{
        constructor(primary_screen, secondary_screen){
            this.primary_screen = primary_screen // => Big screen
            this.secondary_screen = secondary_screen // => Small screen
            this.clearAll()
        }

        // operations done by calculator

        clearAll(){
            this.primaryScreen_text = ''
            this.secondaryScreen_text = ''
            this.operation = undefined
        }

        delete(){
            this.primaryScreen_text = this.primaryScreen_text.toString().slice(0,-1)
        }

        typeNumber(number){
            if(number === '.' && this.primaryScreen_text.includes('.')){ return }

            this.primaryScreen_text = this.primaryScreen_text.toString() + number.toString()
        }

        choose_operation(operation){
            if(this.primaryScreen_text === '') return
            if(this.primaryScreen_text !== ''){
                this.calculation();
            }

            this.operation = operation
            this.secondaryScreen_text = this.primaryScreen_text
            this.primaryScreen_text = '' 
        }

        calculation(){
            let computation;
            const primaryScreen = parseFloat( this.primaryScreen_text),
                secondaryScreen = parseFloat(this.secondaryScreen_text)
            
            if(isNaN(primaryScreen) || isNaN(secondaryScreen))return

            switch(this.operation){
                case '+':
                    computation = primaryScreen + secondaryScreen
                    break;

                case '-':
                    computation = primaryScreen - secondaryScreen
                    break;

                case '*':
                    computation = primaryScreen * secondaryScreen
                    break;

                case '/':
                    computation = primaryScreen / secondaryScreen
                        break;

                default:
                    return
            }   

            this.primaryScreen_text = computation
            this.operation = undefined
            this.secondaryScreen_text = ''
        }

        getNumber(number){
            const stringNumber = number.toString(),
                wholeDigits = parseFloat(stringNumber.split('.')[0]),
                decimalDigits = stringNumber.split('.')[1];
            
            let wholeDigits_display;
            
            if (isNaN(wholeDigits)){
                wholeDigits_display = ''
            }else{
                wholeDigits_display = wholeDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                });
            }

            if(decimalDigits != null){
                return `${wholeDigits_display}.${decimalDigits}`
            }else{
                return wholeDigits_display
            }
        }

        displayUpdate(){
            this.primary_screen.innerText = this.getNumber(this.primaryScreen_text)

            if(this.operation != null){
                this.secondary_screen.innerText = `${this.getNumber(this.secondaryScreen_text)} ${this.operation}`
            }else{
                this.secondary_screen.innerText = ''
            }
        }
    }

    const numbersBtns = document.querySelectorAll('[data-numberBtn]'),
        operationsBtns = document.querySelectorAll('[data-operationBtn]'),
        deleteBtn = document.querySelector('[data-delete]'), 
        equalsBtn = document.querySelector('[data-equals]'), 
        clearAll_btn = document.querySelector('[data-clear-all]'), 
        primary_screen = document.querySelector('[data-pri-screen]'),  
        secondary_screen = document.querySelector('[data-sec-sceen]'),
        calculator = new Calculator(primary_screen,secondary_screen);

    numbersBtns.forEach(button => {
        button.addEventListener('click',() => {
            calculator.typeNumber(button.innerText)
            calculator.displayUpdate()
        });
    });

    operationsBtns.forEach(button => {
        button.addEventListener('click',() => {
            calculator.choose_operation(button.innerText)
            calculator.displayUpdate()
        });
    });

    equalsBtn.addEventListener('click',button => {
        calculator.calculation()
        calculator.displayUpdate()
    });

    clearAll_btn.addEventListener('click', button => {
        calculator.clearAll()
        calculator.displayUpdate()
    });

    deleteBtn.addEventListener('click', button => {
        calculator.delete()
        calculator.displayUpdate()
    });
},

screenOne = document.querySelector('[data-screen-one]'),
screenTwo = document.querySelector('[data-screen-two]');

// change_screen = (calcType) => {
//     let first_calculator = document.querySelector('.js-calc-one'),
//         second_calculator = document.querySelector('.js-calc-two');

//     if (calcType === "wds"){
//         // wds = web dev simplified calculator version
//         first_calculator.classList.add("active");
//         second_calculator.classList.remove("active");

//     } else if (calcType === "ja"){
//         // ja = javascript academy calculator version
//         first_calculator.classList.remove("active");
//         second_calculator.classList.add("active");

//     } else {
//         first_calculator.classList.remove("active");
//         second_calculator.classList.add("active");
//     }
// }

calculator_one();
calculator_two();

// screenTwo.addEventListener('click',change_screen('wds'));
// screenOne.addEventListener('click',change_screen('ja'));