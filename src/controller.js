class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        //нам нужно подписаться на обновление представления, допустим у представления есть форма и когда что-то происходит в форме, нужно как-то сообщить котроллеру(Controller), что пользователь нажал на кнопку добавить(с введенным значением в поле) поэтому нужно как-то сообщить контроллеру что произошло это событие
        //т.к. view(представление) ничего не знает не про model(модель) и представление, ответственность за это лежит за контроллером
        // для этого контроллер подпишется на событие о представлении
        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));
    }

    // принимает заголовок задачи
    addTodo(title) {
        // добавляем в массив находящиейся в model.js - объект и затем его же возвращаем
        const todo = this.model.addItem({
            id: Date.now(), // каждую секунду будет новое значение от текущего года и даты отнимет 1 янв 1970 г. - это быстрый способ получить уникальное значение
            title, // = title : title,
            completed: false
        });

        this.view.addItem(todo);
    }

    toggleTodo({id, completed}) {
        const todo = this.model.updateItem(id, { completed });

        this.view.toggleItem(todo);
    }

    editTodo({ id, title }) {
        const todo = this.model.updateItem(id, { title });

        this.view.editItem(todo);
    }

    removeTodo(id) {
        this.model.removeItem(id);
        this.view.removeItem(id);
    }
}

export default Controller;

// представление > контроллер > модель > контроллер > представление