// фигурные скобки для Model не нужны т.к. из model.js экспортируется по умолчанию
import Model from './model';
import View from './view';
import Controller from './controller';

const model = new Model();
const view = new View(); 
const controller = new Controller(model, view);