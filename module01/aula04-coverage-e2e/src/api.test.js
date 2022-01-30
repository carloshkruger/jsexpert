const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })

  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200)
      assert.deepStrictEqual(response.text, 'Hello World')
    })
  })

  describe('/login', () => {
    it('should successfully login and return HTTP status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'Carlos',
          password: '123'
        })
        .expect(200)
      assert.deepStrictEqual(response.text, 'Login has succeded')
    })

    it('should unauthorize a request when requesting is using wrong credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'Carlos',
          password: 'wrong_password'
        })
        .expect(401)
      assert.deepStrictEqual(response.text, 'Login has failed')
    })
  })
})
