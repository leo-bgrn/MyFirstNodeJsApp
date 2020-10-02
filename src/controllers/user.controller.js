const User = require('../db/user.db.js')

async function findAll() {
    const users = await User.getAll();
    return users
};

async function findUserById(id) {
    const user = await User.getById(id);
    return user;
}

async function addNewUser(firstName, lastName, weight) {
    await User.addNewUser(firstName, lastName, weight);
}

async function deleteUser(id) {
    await User.deleteUser(id);
}

async function updateUser(id, firstName, lastName, weight) {
    await User.updateUser(id, firstName, lastName, weight);
}


module.exports = {
    findAll,
    findUserById,
    addNewUser,
    deleteUser,
    updateUser
}