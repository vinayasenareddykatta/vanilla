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
        
        // Add value display
        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = value;
        bar.appendChild(valueDisplay);
        
        container.appendChild(bar);
    });
}

function updateStepInfo(message) {
    const stepInfo = document.getElementById('stepInfo');
    stepInfo.innerHTML = message;
}

async function selectionSort() {
    const bars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[i].classList.add('comparing');
        updateStepInfo(`
            Step ${i + 1}:<br>
            Current subarray position: ${i}<br>
            Current minimum value: ${array[minIndex]}<br>
            Searching for smaller elements...
        `);
        await delay(500);
        
        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add('comparing');
            updateStepInfo(`
                Step ${i + 1}:<br>
                Comparing elements:<br>
                Current minimum: ${array[minIndex]} at position ${minIndex}<br>
                Comparing with: ${array[j]} at position ${j}
            `);
            await delay(500);
            
            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove('minimum');
                minIndex = j;
                bars[minIndex].classList.add('minimum');
                updateStepInfo(`
                    Step ${i + 1}:<br>
                    Found new minimum:<br>
                    New minimum value: ${array[minIndex]} at position ${minIndex}
                `);
                await delay(500);
            }
            
            if (j !== minIndex) {
                bars[j].classList.remove('comparing');
            }
        }
        
        if (minIndex !== i) {
            updateStepInfo(`
                Step ${i + 1}:<br>
                Swapping elements:<br>
                Swapping ${array[i]} with ${array[minIndex]}
            `);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
            [bars[i].dataset.value, bars[minIndex].dataset.value] = [bars[minIndex].dataset.value, bars[i].dataset.value];
            
            // Update the displayed values
            bars[i].querySelector('span').textContent = array[i];
            bars[minIndex].querySelector('span').textContent = array[minIndex];
            
            await delay(500);
        }
        
        bars[i].classList.remove('comparing');
        bars[minIndex].classList.remove('minimum');
        bars[i].classList.add('sorted');
        updateStepInfo(`
            Step ${i + 1} completed:<br>
            Element ${array[i]} is now in its sorted position<br>
            Sorted elements: [${array.slice(0, i + 1).join(', ')}]<br>
            Remaining elements: [${array.slice(i + 1).join(', ')}]
        `);
        await delay(500);
    }
    
    bars[array.length - 1].classList.add('sorted');
    updateStepInfo(`
        Sorting completed!<br>
        Final sorted array: [${array.join(', ')}]
    `);
}

async function startSort() {
    initializeArray();
    if (array.length <= 1) {
        document.getElementById('message').textContent = 'Please enter at least 2 numbers';
        return;
    }
    document.getElementById('message').textContent = '';
    await selectionSort();
}

function reset() {
    array = [...defaultArray];
    document.getElementById('arrayInput').value = defaultArray.join(', ');
    document.getElementById('arrayContainer').innerHTML = '';
    document.getElementById('message').textContent = '';
    document.getElementById('stepInfo').innerHTML = '';
    displayArray();
}
