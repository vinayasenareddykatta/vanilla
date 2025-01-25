document.addEventListener("DOMContentLoaded", () => {
  const fibonacciContainer = document.getElementById("fibonacciContainer");
  const factorialContainer = document.getElementById("factorialContainer");
  const messageContainer = document.getElementById("messageContainer");
  const visualizeButton = document.getElementById("visualizeButton");
  const fibonacciInput = document.getElementById("fibonacciInput");
  const factorialInput = document.getElementById("factorialInput");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const memo = {};

  async function visualizeFactorial(n, isReturning = false) {
    if (memo[n] !== undefined) {
      return memo[n];
    }

    const element = document.createElement("div");
    element.className = "factorial-element";
    element.textContent = n;
    factorialContainer.appendChild(element);

    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = isReturning ? "" : "↓";
    element.appendChild(arrow);

    if (n <= 1) {
      element.classList.add("current-step");
      await sleep(500);
      element.classList.remove("current-step");
      console.log(1);
      arrow.textContent = "↑";
      return 1;
    }

    element.classList.add("current-step");
    await sleep(500);
    element.classList.remove("current-step");

    const result = n * (await visualizeFactorial(n - 1));

    element.textContent = `${n} * ${result / n} = ${result}`;
    arrow.textContent = "↑";
    element.classList.add("current-step");
    await sleep(500);
    element.classList.remove("current-step");
    console.log(result); // Print the output to the console

    memo[n] = result;
    return result;
  }

  visualizeButton.addEventListener("click", async () => {
    const n = parseInt(fibonacciInput.value);
    if (isNaN(n) || n < 0) {
      messageContainer.textContent =
        "Please enter a valid non-negative number.";
      return;
    }
    fibonacciContainer.innerHTML = "";
    messageContainer.textContent = `Calculating Fibonacci(${n})...`;
    await visualizeFibonacci(n);
  });

  visualizeButton.addEventListener("click", async () => {
    const n = parseInt(factorialInput.value);
    if (isNaN(n) || n < 0) {
      messageContainer.textContent =
        "Please enter a valid non-negative number.";
      return;
    }
    factorialContainer.innerHTML = "";
    messageContainer.textContent = `Calculating Factorial(${n})...`;
    const result = await visualizeFactorial(n);
    messageContainer.textContent = `Factorial(${n}) = ${result}`;
  });
});
