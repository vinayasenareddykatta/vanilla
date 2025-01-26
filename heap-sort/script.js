let array = [];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const defaultArray = [64, 34, 25, 12, 22, 11, 90];

document.getElementById('startBtn').addEventListener('click', startSort);
document.getElementById('resetBtn').addEventListener('click', reset);

function initializeArray() {
    const input = document.getElementById('arrayInput').value;
    if (!input.trim()) {
        array = [...defaultArray];
        document.getElementById('arrayInput').value = defaultArray.join(', ');
    } else {
        array = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        if (array.length === 0) {
            array = [...defaultArray];
            document.getElementById('arrayInput').value = defaultArray.join(', ');
        }
    }
    displayArray();
}

function displayArray() {
    const container = document.getElementById('arrayContainer');
    container.innerHTML = '';
    const maxValue = Math.max(...array);

    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${(value / maxValue) * 280}px`;
        bar.setAttribute('data-value', value);
        
        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = value;
        bar.appendChild(valueDisplay);
        
        container.appendChild(bar);
    });
}

async function heapSort() {
    const n = array.length;
    const bars = document.getElementsByClassName('array-bar');

    // Build max heap
    updateStepInfo('Phase 1: Building max heap...');
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        updateStepInfo(`Extracting maximum element: ${array[0]}`);
        [array[0], array[i]] = [array[i], array[0]];
        await updateBars(0, i);
        bars[i].classList.add('sorted');
        await heapify(i, 0);
    }
    bars[0].classList.add('sorted');
    updateStepInfo('Heap Sort completed!');
}

async function heapify(n, i) {
    const bars = document.getElementsByClassName('array-bar');
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    bars[i].classList.add('heapify');
    await delay(300);

    if (left < n) {
        bars[left].classList.add('comparing');
        await delay(300);
        if (array[left] > array[largest]) {
            largest = left;
        }
        bars[left].classList.remove('comparing');
    }

    if (right < n) {
        bars[right].classList.add('comparing');
        await delay(300);
        if (array[right] > array[largest]) {
            largest = right;
        }
        bars[right].classList.remove('comparing');
    }

    if (largest !== i) {
        updateStepInfo(`Swapping ${array[i]} with ${array[largest]}`);
        [array[i], array[largest]] = [array[largest], array[i]];
        await updateBars(i, largest);
        await heapify(n, largest);
    }
    bars[i].classList.remove('heapify');
}

async function updateBars(i, j) {
    const bars = document.getElementsByClassName('array-bar');
    [bars[i].style.height, bars[j].style.height] = 
        [bars[j].style.height, bars[i].style.height];
    [bars[i].dataset.value, bars[j].dataset.value] = 
        [bars[j].dataset.value, bars[i].dataset.value];
    
    bars[i].querySelector('span').textContent = array[i];
    bars[j].querySelector('span').textContent = array[j];
    
    await delay(300);
}

function updateStepInfo(message) {
    document.getElementById('stepInfo').innerHTML = message;
}

async function startSort() {
    initializeArray();
    if (array.length <= 1) {
        document.getElementById('message').textContent = 'Please enter at least 2 numbers';
        return;
    }
    document.getElementById('message').textContent = '';
    await heapSort();
}

function reset() {
    array = [...defaultArray];
    document.getElementById('arrayInput').value = defaultArray.join(', ');
    document.getElementById('arrayContainer').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('stepInfo').innerHTML = '';
    displayArray();
}
