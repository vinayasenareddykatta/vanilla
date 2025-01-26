document.addEventListener('DOMContentLoaded', () => {
    const arrayInput = document.getElementById('arrayInput');
    const targetInput = document.getElementById('targetInput');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const arrayContainer = document.getElementById('arrayContainer');
    const messageElement = document.getElementById('message');

    let timeouts = [];

    function sleep(ms) {
        return new Promise(resolve => {
            const timeout = setTimeout(resolve, ms);
            timeouts.push(timeout);
        });
    }

    function resetSearch() {
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts = [];
        arrayContainer.innerHTML = '';
        messageElement.textContent = '';
    }

    function createArrayElements(arr) {
        arrayContainer.innerHTML = '';
        arr.forEach((num, index) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            element.id = `element-${index}`;
            arrayContainer.appendChild(element);
        });
    }

    async function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            // Reset all elements
            document.querySelectorAll('.array-element').forEach(el => {
                el.className = 'array-element';
            });

            // Highlight current range
            for (let i = left; i <= right; i++) {
                document.getElementById(`element-${i}`).classList.add('active');
            }

            const mid = Math.floor((left + right) / 2);
            const midElement = document.getElementById(`element-${mid}`);
            midElement.classList.add('mid');

            messageElement.textContent = `Checking middle element: ${arr[mid]}`;
            await sleep(1000);

            if (arr[mid] === target) {
                midElement.classList.remove('mid');
                midElement.classList.add('found');
                messageElement.textContent = `Found ${target} at index ${mid}!`;
                return;
            }

            if (arr[mid] > target) {
                right = mid - 1;
                messageElement.textContent = `${arr[mid]} > ${target}, searching left half`;
            } else {
                left = mid + 1;
                messageElement.textContent = `${arr[mid]} < ${target}, searching right half`;
            }
            await sleep(1000);
        }

        messageElement.textContent = `${target} not found in the array`;
        document.querySelectorAll('.array-element').forEach(el => {
            el.classList.add('not-found');
        });
    }

    startBtn.addEventListener('click', async () => {
        resetSearch();
        const inputArray = arrayInput.value.split(',').map(num => parseInt(num.trim()));
        const target = parseInt(targetInput.value);

        if (inputArray.some(isNaN) || isNaN(target)) {
            messageElement.textContent = 'Please enter valid numbers';
            return;
        }

        // Sort the array for binary search
        const sortedArray = [...inputArray].sort((a, b) => a - b);
        createArrayElements(sortedArray);
        await binarySearch(sortedArray, target);
    });

    resetBtn.addEventListener('click', resetSearch);
});
