const path = require('path');

module.exports = {
    // входная точка
    entry: './src/index.js', // указывает на файл-индекс из папки src

    // выходная точка
    output: {
        path: path.resolve(__dirname, 'public/js'), // указывает куда нужно поместить файл index.js - public/js/
        filename: 'app.js',
        publicPath: '/js'
    }, 

    devServer: {
        contentBase: path.join(__dirname, 'public'), // говорим web-серверу где находится папка public, чтобы он знал откуда брать файлы
    },

    // этой строкой говорим webpack, что мы хотим чтобы генерировались "файлы карт" (source map), 
    // webpack будет говорить где мы допустили ошибку(строку и колонку)
    devtool: 'cheap-eval-source-map' // remove for build mode
};

// файл-конфигурации, webpack нужен для того чтобы иметь возможность писать код в разных файлах и не возиться с тегами script на страницах .html
// после запуска npm start, app.js не появится т.к. webpack держит его в памяти, смысл в том чтобы webpack мог следить за файлами и не записывать на диск при изменении т.к. это ресурсоёмкая операция,
// если нам понадобится файл, чтобы загрузить на хостинг вводится команда $ npm run buid - webpack создаст сборку и сохранит её на диск