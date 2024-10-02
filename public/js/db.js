// db.js
const mysql = require('mysql');

// MySQLデータベースへの接続設定
const connection = mysql.createConnection({
    host: 'localhost', // MySQLサーバーのホスト名
    user: 'root', // MySQLのユーザー名
    password: 'rootroot', // MySQLのパスワード
    database: 'sampple_db' // 使用するデータベース名名前は任せます
});

// データベースへの接続
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
