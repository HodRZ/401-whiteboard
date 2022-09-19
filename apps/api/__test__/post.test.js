'use strict'
const { request } = require('./../src/config/test-config')

describe('/Post Routes', () => {
    describe('Get all', () => {
        it('should get all data from db', async () => {
            const res = await request.get(`/post`);
            expect(res.status).toEqual(200);
            expect(res.body).toBeDefined();
        });
        it('Get all error handler', async () => {
            const res = await request.get(`/posts/`);
            expect(res.status).toEqual(404);
        });
    });

    describe('Get by ID', () => {
        it('should get a route by id', async () => {
            const newPost = {
                "title": "test get by id",
                "content": "this is a test from jest",
            }
            const addedPost = await request.post('/post').send(newPost);
            const { id, title } = addedPost.body
            const res = await request.get(`/post/${id}?filter=comments`);
            expect(res.status).toEqual(200);
            expect(res.body.title).toEqual(title);
            await request.delete(`/post/${id}`);
        });
        it('Get by id error handler', async () => {
            const newPost = {
                "title": "test get by id error",
                "content": "this is a test from jest",
                "image": "jest testing"
            }
            const addedPost = await request.post('/post').send(newPost);
            const { id } = addedPost.body
            const res = await request.get(`/post/${id}?filter=coments`);
            expect(res.status).toEqual(404);
            expect(res.body).toEqual('Sorry! Page Not Found !')
            await request.delete(`/post/${id}`);
        });
    });

    describe('Post', () => {
        it('should add new post to database', async () => {
            const newPost = {
                "title": "test post",
                "content": "this is a test from jest",
                "image": "jest testing"
            }
            const addedPost = await request.post('/post').send(newPost);
            expect(addedPost.status).toEqual(201);
            expect(addedPost.body.title).toEqual('test post')
            const { id } = addedPost.body
            await request.delete(`/post/${id}`);
        });
        it('post request error handler', async () => {
            const newPost = null;
            const addedPost = await request.post('/post').send(newPost);
            expect(addedPost.status).toEqual(500);
            expect(addedPost.body).toEqual('Something Went Wrong !')
        });
    });
    describe('Put', () => {
        it('should update a post', async () => {
            const newPost = {
                "title": "test put",
                "content": "this is a test from jest"
            }
            const editedPost = {
                "content": "edited from jest"
            }
            const addedPost = await request.post('/post').send(newPost);
            const { id, title } = addedPost.body
            const updated = await request.put(`/post/${id}`).send(editedPost)
            expect(updated.body[1][0].id).toEqual(id)
            expect(updated.body[1][0].title).toEqual(title)
            expect(updated.body[1][0].content).toEqual('edited from jest')
            await request.delete(`/post/${id}`);
        });
    });

    describe('Delete', () => {
        it('Delete, should delete a post', async () => {
            const newPost = {
                "title": "test delete",
                "content": "this is a test from jest",
                "image": "jest testing"
            }
            const addedPost = await request.post('/post').send(newPost);
            const { id } = addedPost.body
            const res = await request.delete(`/post/${id}`);
            expect(res.status).toEqual(204);
        });
    });
});