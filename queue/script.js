let queue = [];
const maxSize = 8;
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
    
    if (queue.length >= maxSize) {
        updateMessage('Queue is full!');
        return;
    }

    queue.push(value);
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
    if (queue.length === 0) {
        updateMessage('Queue is empty!');
        return;
    }

    const value = queue.shift();
    await visualizeDequeue();
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
        Queue size: ${queue.length}<br>
        Front element: ${queue.length > 0 ? queue[0] : 'none'}<br>
        Back element: ${queue.length > 0 ? queue[queue.length - 1] : 'none'}<br>
        Available space: ${maxSize - queue.length}
    `;
}

function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}

function reset() {
    queue = [];
    document.getElementById('queueContainer').innerHTML = '';
    updateInfo();
    updateMessage('Queue reset');
}
