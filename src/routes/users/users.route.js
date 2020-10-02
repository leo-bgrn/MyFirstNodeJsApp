var express = require('express');
var router = express.Router();
const users = require('../../controllers/user.controller.js')

router.get('/', async function (req, res, next) {
    try {
        const allUsers = await users.findAll();
        res.send(allUsers);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const userFound = await users.findUserById(id);
        res.send(userFound);
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        await users.deleteUser(id)
        res.status(204).send();
    } catch (e) {
        next(e);
    }
})

router.post('/', async function (req, res, next) {
    try {
        const firstName = req.body["firstName"];
        const lastName = req.body["lastName"];
        const weight = req.body["weight"];
        await users.addNewUser(firstName, lastName, weight);
        res.status(201).send();
    } catch (e) {
        next(e);
    }
})

router.put('/:id', async function (req, res, next) {
    try {
        const firstName = req.body["firstName"];
        const lastName = req.body["lastName"];
        const weight = req.body["weight"];
        const id = req.params["id"]
        await users.updateUser(id, firstName, lastName, weight);
        res.status(200).send();
    } catch (e) {
        next(e);
    }
})

module.exports = router;
