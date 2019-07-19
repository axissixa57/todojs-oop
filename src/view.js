import { createElement, EventEmitter } from './helpers.js' 
// отвечает за взаимодействие с html; возня с DOM
class View extends EventEmitter { // extends EventEmitter - наследование класса
    constructor() {
        //когда наследуется нужно обязательно вызвать этот метод, чтобы this правильно инициализировался, если не вызвать будет ошибка this is not defined
        super();
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('add-input');
        this.list = document.getElementById('todo-list');

        this.form.addEventListener('submit', this.handleAdd.bind(this)); // при нажатии на кнопку Добавить произойдёт функция handleAdd()
    }

    createElement(todo) {
        // присвается метод createElement из helpers
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked' : ''});
        const label = createElement('label', {className: 'title'}, todo.title);
        const editInput = createElement('input', {type: 'text', className: 'textfield'});
        const editButton = createElement('button', {className: 'edit'}, 'Изменить');
        const removeButton = createElement('button', {className: 'remove'}, 'Удалить');
        const item = createElement('li', {className: `todo-item${todo.completed ? ' completed' : ''}`, "data-id": todo.id }, checkbox, label, editInput, editButton, removeButton);

        return this.addEventListeners(item);
    }

    addEventListeners(listItem) {
        const checkbox = listItem.querySelector('.checkbox');
        const editButton = listItem.querySelector('button.edit');
        const removeButton = listItem.querySelector('button.remove');

        checkbox.addEventListener('change', this.handleToggle.bind(this));
        editButton.addEventListener('click', this.handleEdit.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return listItem;
    }

    handleAdd(event) {
        event.preventDefault(); // остановка данных на сервер

        if(!this.input.value) return alert('Необходимо ввести название задачи'); // если в поле inputa пустата выскачит alert();, !false = true

        const value = this.input.value; // получаем что пользователь ввёл

        // при получении значения тригерим событие add, на которое есть обработчик в controller.js 
        this.emit('add', value);
    }

    // с помощью деструктуризации вытащим свойство target
    handleToggle({ target }) { // target - это input type = checkbox элемент
        const listItem = target.parentNode; // кликая на checkbox, с помощью этой строки получаем доступ к родителю li
        const id = listItem.getAttribute('data-id'); // id задачи, которая будет в атрибуте data-id
        const completed = target.checked; // посмотрим, отмечен ли checkbox

        this.emit('toggle', { id, completed });
    }

    handleEdit({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title });
        } else {
            input.value = label.textContent; // из заголовка помещаем в поле
            editButton.textContent = 'Сохранить';
            listItem.classList.add('editing');
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');

        this.emit('remove', id);
    }
    
    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`) // data-id - это атрибут, кот. нужен для поиска определённого пункта
    }

    // метод принимает объект задачи из controllera - addTodo()
    addItem(todo) {
        const listItem = this.createElement(todo);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id);
        const checkbox = listItem.querySelector('.checkbox');

        checkbox.checked = todo.completed;

        if(todo.completed) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
    }

    // метод сработает когда объект задачи уже обновится в хранилище и этому методу будет передана задача с обновленным значением
    editItem(todo) {
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');

        label.textContent = todo.title
        editButton.textContent = 'Изменить';
        listItem.classList.remove('editing');
    }

    removeItem(id) {
        const listItem = this.findListItem(id);

        this.list.removeChild(listItem);
    }
}

export default View;