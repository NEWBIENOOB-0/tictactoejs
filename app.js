const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGamBtn = document.querySelector("new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true, Count = 0;

const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8],
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6],
    [3, 4, 5], 
    [6, 7, 8]
  ];


  boxes.forEach((box) => box.addEventListener("click", () => {
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    box.disabled = true;
    if (++count === 9 && !checkWinner()) gameDraw();
  }));
  
  const gameDraw = () => showResult("Game was a Draw.");
  
  const disableBoxes = () => boxes.forEach((box) => (box.disabled = true));
  const enableBoxes = () => boxes.forEach((box) => (box.disabled = false));
  
  const showWinner = (winner) => showResult(`Congratulations, Winner is ${winner}`);
  
  const checkWinner = () => winPatterns.some(([a, b, c]) =>
    boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText
  );
  
  const showResult = (result) => {
    msg.innerText = result;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  
  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);