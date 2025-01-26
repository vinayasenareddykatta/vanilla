class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.container = document.getElementById('listContainer');
    }

    add(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.display();
    }

    removeFirst() {
        if (!this.head) {
            updateMessage('List is empty!');
            return;
        }
        this.head = this.head.next;
        this.display();
    }

    removeLast() {
        if (!this.head) {
            updateMessage('List is empty!');
            return;
        }
        if (!this.head.next) {
            this.head = null;
        } else {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
        }
        this.display();
    }

    removeCustom(value) {
        if (!this.head) {
            updateMessage('List is empty!');
            return;
        }
        if (this.head.value === value) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            while (current.next && current.next.value !== value) {
                current = current.next;
            }
            if (current.next) {
                current.next = current.next.next;
            } else {
                updateMessage('Value not found!');
                return;
            }
        }
        this.display();
    }

    search(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) {
                this.highlightNode(current.value);
                updateMessage(`Value ${value} found!`);
                return;
            }
            current = current.next;
        }
        updateMessage(`Value ${value} not found!`);
    }

    sort() {
        if (!this.head || !this.head.next) return;

        let sorted = null;
        let current = this.head;

        while (current) {
            let next = current.next;
            if (!sorted || sorted.value >= current.value) {
                current.next = sorted;
                sorted = current;
            } else {
                let temp = sorted;
                while (temp.next && temp.next.value < current.value) {
                    temp = temp.next;
                }
                current.next = temp.next;
                temp.next = current;
            }
            current = next;
        }
        this.head = sorted;
        this.display();
    }

    display() {
        this.container.innerHTML = '';
        let current = this.head;
        while (current) {
            const element = document.createElement('div');
            element.className = 'list-element';
            element.textContent = current.value;
            this.container.appendChild(element);
            current = current.next;
        }
    }

    highlightNode(value) {
        const elements = document.getElementsByClassName('list-element');
        for (let element of elements) {
            if (element.textContent == value) {
                element.classList.add('searching');
                setTimeout(() => {
                    element.classList.remove('searching');
                }, 1000);
                break;
            }
        }
    }
}

const list = new LinkedList();

document.getElementById('addBtn').addEventListener('click', () => {
    const input = document.getElementById('elementInput');
    if (input.value.trim()) {
        list.add(input.value);
        input.value = '';
    }
});

document.getElementById('removeFirstBtn').addEventListener('click', () => {
    list.removeFirst();
});

document.getElementById('removeLastBtn').addEventListener('click', () => {
    list.removeLast();
});

document.getElementById('removeCustomBtn').addEventListener('click', () => {
    const input = document.getElementById('customNodeInput');
    if (input.value.trim()) {
        list.removeCustom(input.value);
        input.value = '';
    }
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const input = document.getElementById('searchInput');
    if (input.value.trim()) {
        list.search(input.value);
        input.value = '';
    }
});

document.getElementById('sortBtn').addEventListener('click', () => {
    list.sort();
});

document.getElementById('resetBtn').addEventListener('click', () => {
    list.head = null;
    list.display();
    updateMessage('List reset');
});

function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}
