const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

const WINNING_COMBINATIONS = //all possible winning combinations
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn; //variable for checking whose turn it is

startGame();

restartButton.addEventListener("click", startGame); //restarting a game

function startGame()
{
    circleTurn = false; //first turn is X

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS); //we remove all Xs and Os
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick); //also we remove the event listener, so after restart we have a fresh new game
        cell.addEventListener("click", handleClick, { once: true }); //only trigger this event listener once
    });

    setBoardHoverClass(); //setting the hover on the start of the game

    winningMessageElement.classList.remove("show"); //when we end a game we remove the winning message
}

function handleClick(e)
{
    const cell = e.target; //the cell we clicked on
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; //checking if it is X or O class
    placeMark(cell, currentClass); //we place X or O

    if(checkWin(currentClass))
    {
        endGame(false); //not the draw, but someone won
    }
    else if(isDraw()) //if true
    {
        endGame(true); //draw because it is true
    }
    else
    {
        swapTurns(); //switching between X and O
        setBoardHoverClass(); //to show our correct hover state we made in css
    }
}

function endGame(draw) //checking the scenarios for end of the game
{
    if(draw) //if true
    {
        winningMessageTextElement.innerText = "Draw!"; //if it is a draw
    }
    else //if false
    {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`; //checking who won based on whose turn it is
    }
    winningMessageElement.classList.add("show"); //shows the message on screen
}

function isDraw()
{
    return [...cellElements].every(cell => { //destructuring cellElements and checking if every cell has either a X or O inside and returning true if it does
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) //adding the X or O
{
    cell.classList.add(currentClass)
}

function swapTurns()
{
    circleTurn = !circleTurn; //take circle turn and set it to the opposite of it
}

function setBoardHoverClass() //setting hover based on whose turn it is
{
    board.classList.remove(X_CLASS); //we remove both classes
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) //checking whose turn it is
    {
        board.classList.add(CIRCLE_CLASS);
    }
    else
    {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination => { //returns true if any of our combinations match the WINNING_COMBINATIONS
        return combination.every(index => { //if every element has the same class(x or o)
            return cellElements[index].classList.contains(currentClass); //checking if same class is inside all of the 3 cells by index
        })
    });
}