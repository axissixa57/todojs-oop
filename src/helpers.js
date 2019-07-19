function createElement(tag, props, ...children) {
    const element = document.createElement(tag);
    // props - объект из ключей-значений
    // каждый DOM-элемент - это такой же объект со свойствами в которые можно записать значения, например type='', class=''
    Object.keys(props).forEach(key => {
        if(key.startsWith('data-')) {
            element.setAttribute(key, props[key])
        } else {
            element[key] = props[key];
        }
    });
    // children - хранит в себе оставшиеся параметры, а благодаря ... мы их компануем в массив
    children.forEach(child => {
        if (typeof child === 'string') {
            // создаём DOM-узел из string в object
            // т.к. appendChild() принимает только объект, кот. является узлом (строку не добавит)
            child = document.createTextNode(child); // typeof child - 'object'
        }

        element.appendChild(child);
    });

    return element;
}

// createElement('input', {type: 'text', className: 'textfield'}, '123');
// Console: <input type="text" class="textfield">123</input>

//этот класс является реализацией pub-sub(публикация и подписка, издатель - подписчик)
class EventEmitter {
    constructor() {
        // создание списка событий
        // будет содержать ключ - событие, значение - массив, в которой ф-ция
        this.events = {};
    }

    //метод on используется для подписки на событие
    //принимает тип события, на кот. нужно подписаться
    //callback - ф-ция обработчик
    //когда мы первый раз вызываем событие у нас будет пустой объект, и нам нужно проверить:
    on(type, callback) {
        // если доступ к свойству что-то вернёт, то мы присылаем обратно этот this.events[type] в противном случае пустой массив
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }
    // при триггере этой ф-ции будет передаваться значение, кот пойдёт в ф-цию, что была добавлена в on(), arg - и есть это значение 
    emit(type, arg) {
        if(this.events[type]) {
            this.events[type].forEach(callback => callback(arg));
        }
    }
}

function save(data) {
    const string = JSON.stringify(data);
    localStorage.setItem('todos', string);
}

function load() {
    const string = localStorage.getItem('todos');
    const data = JSON.parse(string);

    return data;
}

export { createElement, EventEmitter, save, load };