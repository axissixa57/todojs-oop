import { EventEmitter } from './helpers';

class Model extends EventEmitter {
    constructor(state = []) { // state - данные
        super();
        this.state = state;
    }
    //создаём методы, кот. меняют состояние(state)
    getItem(id) {
        return this.state.find(item => item.id == id)
    }
    // принимает объект из controllera из addTodo() пушим в массив и возвращаем то что пришло
    addItem(item) {
        this.state.push(item);
        this.emit('change', this.state);
        return item;
    }

    updateItem(id, data) {
        const item = this.getItem(id);
        Object.keys(data).forEach(prop => item[prop] = data[prop]);
        this.emit('change', this.state);
        return item;
    }

    removeItem(id) {
        const index = this.state.findIndex(item => item.id == id);

        if (index > -1) {
            this.state.splice(index, 1);
            this.emit('change', this.state);
        }
    }
}

export default Model;