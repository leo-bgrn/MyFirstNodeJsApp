const db = require("./db.js");
const sql = require("./db.js");

const getAllQuery = 'SELECT * FROM users';
const getByIdQuery = 'SELECT * FROM users WHERE users.id =?';
const addNewUserQuery = 'INSERT INTO users (`first_name`, `last_name`, `weight`) VALUES (?,?,?)';
const deleteUserQuery = 'DELETE FROM users WHERE id=?';

async function getAll() {
    const users = await db.query(getAllQuery);
    return users;
}

async function getById(id) {
    const user = await db.query(getByIdQuery, id);
    return user;
}

async function addNewUser(firstName, lastName, weight) {
    await db.query(addNewUserQuery, [firstName, lastName, weight]);
}

async function deleteUser(id) {
    await db.query(deleteUserQuery, id);
}

async function updateUser(id, firstName, lastName, weight) {
    let prom = [];
    if (firstName) {
        const firstNameQuery = `UPDATE users SET first_name = '${firstName}' WHERE id = '${id}'`;
        prom.push(db.query(firstNameQuery));
    }
    if (lastName) {
        const lastNameQuery = `UPDATE users SET last_name = '${lastName}' WHERE id = '${id}'`
        prom.push(db.query(lastNameQuery));
    }
    if (weight) {
        const weightQuery = `UPDATE users SET weight = '${weight}' WHERE id = '${id}'`
        prom.push(db.query(weightQuery));
    }
    await Promise.all(prom);
}

module.exports = {
    getAll,
    getById,
    addNewUser,
    deleteUser,
    updateUser
};