let circularQueue = [];
const maxSize = 8;
let front = -1;
let rear = -1;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

document.getElementById('enqueueBtn').addEventListener('click', enqueue);
document.getElementById('dequeueBtn').addEventListener('click', dequeue);
document.getElementById('resetBtn').addEventListener('click', reset);

async function enqueue() {
    const input = document.getElementById('elementInput');
    const value = input.value.trim();
    
    if (!value) {
        updateMessage('Please enter a value');
        return;
    }
    
    if ((rear + 1) % maxSize === front) {
        updateMessage('Circular Queue is full!');
        return;
    }

    if (front === -1) front = 0;
    rear = (rear + 1) % maxSize;
    circularQueue[rear] = value;
    input.value = '';
    await visualizeEnqueue(value);
    updateInfo();
}

async function visualizeEnqueue(value) {
    const container = document.getElementById('queueContainer');
    const element = document.createElement('div');
    element.className = 'queue-element new-element';
    element.textContent = value;
    container.appendChild(element);
    
    updateMessage(`Enqueuing element: ${value}`);
    await delay(500);
    element.classList.remove('new-element');
}

async function dequeue() {
    if (front === -1) {
        updateMessage('Circular Queue is empty!');
        return;
    }

    const value = circularQueue[front];
    await visualizeDequeue();
    if (front === rear) {
        front = -1;
        rear = -1;
    } else {
        front = (front + 1) % maxSize;
    }
    updateInfo();
    updateMessage(`Dequeued element: ${value}`);
}

async function visualizeDequeue() {
    const container = document.getElementById('queueContainer');
    const element = container.firstChild;
    element.classList.add('removing');
    await delay(500);
    container.removeChild(element);
}

function updateInfo() {
    const info = document.getElementById('queueInfo');
    info.innerHTML = `
        Circular Queue size: ${(rear - front + maxSize) % maxSize + 1}<br>
        Front element: ${front !== -1 ? circularQueue[front] : 'none'}<br>
        Rear element: ${rear !== -1 ? circularQueue[rear] : 'none'}<br>
        Available space: ${maxSize - ((rear - front + maxSize) % maxSize + 1)}
    `;
}

function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}

function reset() {
    circularQueue = [];
    front = -1;
    rear = -1;
    document.getElementById('queueContainer').innerHTML = '';
    updateInfo();
    updateMessage('Circular Queue reset');
}
