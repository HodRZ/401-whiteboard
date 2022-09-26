'use strict'

const { request } = require("../src/config/test-config")
const { base64 } = require('./../src/config/Utils')


describe('User', () => {
    describe('User Sign Up', () => {
        it('should create a new accout', async () => {
            const newUser = {
                "username": "hod from jest",
                "email": "hodjest@40.com",
                "birthday": "1990-12-22",
                "password": "verySafePassword",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/signUp').send(newUser);
            expect(addedUser.status).toEqual(201);
            expect(addedUser.body.username).toEqual("hod from jest")
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
    });
    describe('User can login', () => {
        it('should login', async () => {
            const newUser = {
                "username": "hod from jest login test",
                "email": "hodjestlogin@4021.com",
                "birthday": "1990-12-22",
                "password": "verySafePasswordd",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/signup').send(newUser);
            const userData = {
                "email": "hodjestlogin@4021.com",
                "password": "verySafePasswordd"
            }
            const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`)
            const loggedIn = await request.post('/signin').set('Authorization', encodedCredintial)
            expect(loggedIn.status).toEqual(200)
            expect(loggedIn.body.username).toEqual('hod from jest login test')
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
        it('should not login with wrong crdintials', async () => {
            const newUser = {
                "username": "hod from jest login with wrong creds",
                "email": "hodjestLOGIN@402.com",
                "birthday": "1990-12-22",
                "password": "verySafePassword",
                "about": "im a super user using a super password from jest"
            }
            const addedUser = await request.post('/signup').send(newUser);
            const userData = {
                "email": "hodjestlogin@402.com",
                "password": "verySafePasswo"
            }
            const encodedCredintial = base64.encode(`${userData.email}:${userData.password}`)
            const loggedIn = await request.post('/signin').set('Authorization', encodedCredintial)
            expect(loggedIn.status).toEqual(401)
            expect(loggedIn.body).toEqual('Username or Password are incorrect')
            const { id } = addedUser.body
            await request.delete(`/user/${id}`)
        });
    });
});