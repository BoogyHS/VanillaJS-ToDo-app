window.addEventListener('DOMContentLoaded', main);

function main() {
    document.getElementById('add')
        .addEventListener('click', addTask);
}

function addTask(e) {
    e.preventDefault();

    const task = document.getElementById('task').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    if (task !== '' && description !== '' && date !== '') {
        createTask(task, description, date);
        document.getElementById('task').value = '';
        document.getElementById('description').value = '';
        document.getElementById('date').value = '';
    }
}

function createElement(type, content, className) {
    let e = document.createElement(type);
    if (typeof content === "string" && content !== '') {
        e.innerHTML = content;
    }
    if (typeof content === "object") {
        e.appendChild(content);
    }
    if (className !== undefined) {
        e.className = className;
    }
    return e;
}

function createTask(task, description, date) {
    const openSection = document.getElementById('open');

    const article = createElement('article');
    const h3 = createElement('h3', task);
    const p1 = createElement('p', `Description: ${description}`);
    const p2 = createElement('p', `Due Date: ${date}`);
    const div = createElement('div', '', 'flex');

    const startBtn = createElement('button', 'Start', 'green');
    startBtn.addEventListener('click', start);

    const deleteBtn = createElement('button', 'Delete', 'red');
    deleteBtn.addEventListener('click', del);

    div.append(startBtn, deleteBtn);
    article.append(h3, p1, p2, div);
    openSection.appendChild(article);
}

function start(e) {
    e.target.className = 'orange';
    e.target.textContent = 'Finish';
    e.target.removeEventListener('click', start);
    e.target.addEventListener('click', finish);
    e.target.parentNode.appendChild(e.target.parentNode.children[0]);
    const destination = document.getElementById('in-progress');
    destination.appendChild(e.target.parentNode.parentNode);
}

function del(e) {
    e.target.parentNode.parentNode.remove();
}

function finish(e) {
    const destinationArr = document.getElementsByClassName('green');
    const destination = destinationArr[destinationArr.length - 1].parentNode.parentNode.children[1];
    destination.appendChild(e.target.parentNode.parentNode);
    e.target.parentNode.remove();
}
