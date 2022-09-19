'use strict'
const { request } = require('./../src/config/test-config')

describe('Server is a live', () => {
    test('get to "/"', async () => {
        const res = await request.get('/')
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Hey Mom!')
    });
});