const massive = require('massive');
const connectionString = 'postgres://uiqontad:6Uxv5nlruM1rtvcwwgh6UtzTHTpJQAR_@elmer.db.elephantsql.com:5432/uiqontad';

let db;
let messageString;

massive(connectionString)
    .then( dbInstance => {
        db = dbInstance;
        messageString = 'Connection to the database was successful.'
        // return db.feeling_init();
    })
    .catch ( err => {
        throw err
    });

    function getDb(){
        if(!db) {
            messageString = 'We have not connected to the database yet.';
            console.error(messageString);
            return messageString;
        }
        else {
            return db;
        }
    }

module.exports = getDb;