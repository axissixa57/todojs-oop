// фигурные скобки для Model не нужны т.к. из model.js экспортируется по умолчанию
import Model from './model';
import View from './view';
import Controller from './controller';
import { save, load } from './helpers';
// load data from store
const state = load();
// если данных нет, присваиваем udef и в model.js срабатывает объявление массива по умолчанию
const model = new Model(state || undefined);
model.on('change', state => save(state));
const view = new View();
const controller = new Controller(model, view);