const db = require('../../db/db')

describe('db query', () => {
    xtest('query all users tables should returns something', async () => {
        const users = await db.query('SELECT * FROM users');
        expect(Array.isArray(users)).toBe(true);
    });
})
