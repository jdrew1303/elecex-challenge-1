const Promise = require('bluebird');
const sqlite = require('sqlite');
const path = require('path');

const dbFile = path.resolve(__dirname, 'database.sqlite');

module.exports = function () {
    return {
        getDbFilePath() {
            return dbFile;
        },
        init() {
            return sqlite.open(dbFile, { Promise })
                .then(db => db.migrate({ force: 'last' }));
        }
    };
};
