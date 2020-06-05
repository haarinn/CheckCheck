const mysql = require('promise-mysql');

const dbConfig = {
    host: 'localhost',
    port: ,
    user: '',
    password: '',
    database: '', //db schema이름
}

module.exports = mysql.createPool(dbConfig);
console.log('모듈 익스포트 완료');
