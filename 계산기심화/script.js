// ----------------------
// 기존 계산기 로직
// ----------------------
const buttonAll = document.querySelectorAll(".button");
const display = document.querySelector(".display-container");

let firstOperand = null;
let operator = null;
let newOperand = false; // 연산자 클릭 후 새 숫자 입력 플래그

function calculate(firstOperand, operator, secondOperand) {
  let result;
  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      result = firstOperand / secondOperand;
      break;
  }
  return result;
}

buttonAll.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("operator")) {
      if (!newOperand) {
        firstOperand = parseFloat(display.textContent);
      }
      operator = button.textContent;
      newOperand = true;
    }

    if (button.classList.contains("number")) {
      if (newOperand) {
        display.textContent = button.textContent;
        newOperand = false;
      } else {
        display.textContent =
          display.textContent === "0"
            ? button.textContent
            : display.textContent + button.textContent;
      }
    }

    if (button.textContent === "=") {
      const secondOperand = parseFloat(display.textContent);
      const result = calculate(firstOperand, operator, secondOperand);
      display.textContent = result;
      newOperand = true;
    }
  });
});

// ----------------------
// 상어 이미지 전환 로직
// ----------------------
const rows = document.querySelectorAll(".button-row");

rows.forEach((row) => {
  const character = row.querySelector(".character");
  if (!character) return; // 상어가 없는 행은 건너뜀

  // data-color 속성으로 색상 정보 가져오기
  const color = row.getAttribute("data-color");
  if (color === "none") return; // 상어가 필요 없는 행은 무시

  const walkClass = "walk-" + color;
  const stopClass = "stop-" + color;

  const rowButtons = row.querySelectorAll(".button");
  rowButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 1) 상어를 '멈춘 상어'로 전환 및 애니메이션 중단
      character.classList.remove(walkClass);
      character.classList.add(stopClass);
      character.style.animation = "none";

      // 2) 2초 후 다시 '걸어다니는 상어'로 복귀
      setTimeout(() => {
        character.classList.remove(stopClass);
        character.classList.add(walkClass);
        character.style.animation = "rowWalk 4s linear infinite";
      }, 2000);
    });
  });
});
