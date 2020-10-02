const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'heditest'
});


/**
 * Execute a query to the database
 *
 * @param {string} sql
 * @param {Array} args
 * @return {Array} 
 */
async function query(sql, args) {
    try {
        const [results] = await pool.query(sql, args);
        return results;
    } catch (e) {
        console.log('Unable to process SQL request : ', sql, args, e);
        throw e;
    }
}

/**
 * Execute a query to the database
 *
 * @param {string} sql
 * @param {Array} args
 * @return {Array} 
 */
async function executeQuery(sql, args) {
    try {
        const [results] = await pool.executeS(sql, args);
        return results;
    } catch (e) {
        console.log('Unable to process SQL request : ', sql, args, e);
        throw e;
    }
}


module.exports = {
    query,
    executeQuery
}