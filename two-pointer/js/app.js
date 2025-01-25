const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];

function visualizeTwoPointer() {
    const targetSum = parseInt(document.getElementById('target-sum').value);
    const arrayContainer = document.getElementById('array-container');
    const messageContainer = document.getElementById('message-container');
    arrayContainer.innerHTML = '';
    messageContainer.innerHTML = '';

    let left = 0;
    let right = array.length - 1;

    function updateUI() {
        arrayContainer.innerHTML = '';
        array.forEach((num, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            if (index === left) {
                element.classList.add('left-pointer');
                element.innerHTML = `<span class="arrow">↓</span> ${num}`;
            } else if (index === right) {
                element.classList.add('right-pointer');
                element.innerHTML = `<span class="arrow">↓</span> ${num}`;
            } else {
                element.textContent = num;
            }
            arrayContainer.appendChild(element);
        });
    }

    function step() {
        if (left < right) {
            const sum = array[left] + array[right];
            updateUI();
            messageContainer.textContent = `Checking: ${array[left]} + ${array[right]} = ${sum}`;

            if (sum === targetSum) {
                setTimeout(() => {
                    messageContainer.textContent = `Success: Pair found - ${array[left]} + ${array[right]} = ${targetSum}`;
                }, 500);
                return;
            } else if (sum < targetSum) {
                left++;
            } else {
                right--;
            }

            setTimeout(step, 1000);
        } else {
            setTimeout(() => {
                messageContainer.textContent = 'Failure: No pair found';
            }, 500);
        }
    }

    step();
}
