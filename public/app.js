
const todoCount = document.getElementById('todo-count');
const completedCount = document.getElementById('complete-count');

let todos = [];

function renderTodoList() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    let totalTasks = todos.length;
    let completedTasks = todos.filter(todo => todo.completed).length;

    todoCount.innerHTML = totalTasks
    completedCount.innerHTML = totalTasks === 0 ? '0' : `${completedTasks} from ${totalTasks}`


    if (todos.length === 0) {
        todoList.innerHTML = `
<div id="empty" class="flex flex-col items-center gap-4 p-16 text-base text-gray-400">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
    stroke="currentColor" class="w-14 h-14">
    <path stroke-linecap="round" stroke-linejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
</svg>
<span class="flex flex-col items-center text-center text-gray-300">
    <span class="font-bold">Your List Is Empty</span>
    <span class="">Create tasks and organize your todo</span>
</span>
</div>
`;
    } else {

        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'text-sm p-4 flex justify-between rounded-lg border-gray-400 gap-3 bg-gray-500 items-start';

            // Checkbox
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'rounded-full mt-0.5 w-5 bg-gray-500 border-2 border-blue focus:ring-offset-0 focus:ring-blue focus:ring-offset-blue checked:bg-purple-dark checked:focus:ring-purple-dark checked:focus:ring-offset-purple-dark checked:hover:bg-purple checked:focus:bg-purple-dark h-5';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodoStatus(index));

            // Text
            const todoText = document.createElement('p');
            todoText.className = todo.completed ? 'line-through text-gray-300 w-full text-sm' : ' w-full text-sm';
            todoText.textContent = todo.text;

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
`;
            deleteButton.addEventListener('click', () => deleteTodo(index));

            listItem.appendChild(checkbox);
            listItem.appendChild(todoText);
            listItem.appendChild(deleteButton);

            todoList.appendChild(listItem);
        });

    }
}

function addTodo() {
    const newTodoInput = document.getElementById('taskInput');
    const text = newTodoInput.value.trim();

    if (text !== '') {
        todos.push({ text, completed: false });
        newTodoInput.value = '';
        renderTodoList();
    }
}

function toggleTodoStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodoList();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodoList();
}


document.getElementById('todoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo();
});

// Initial render
renderTodoList();