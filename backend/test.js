const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./handlers/api-requests');
const Message = require('./models/message');

chai.use(chaiHttp);
const expect = chai.expect;
describe('Login API', () => {
  it('should create a new user and return a 200 status code', (done) => {
    const newUser = {
      name: 'TestUser',
    };

    chai
      .request(app)
      .post('/login')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('name', newUser.name);
        done();
      });
  });

  it('should return a 500 status code and error message for invalid input', (done) => {
    const invalidUser = {};

    chai
      .request(app)
      .post('/login')
      .send(invalidUser)
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should get a user by name and return a 200 status code', (done) => {
    const username = 'TestUser'; // Replace with an existing username in your database

    chai
      .request(app)
      .get('/user')
      .query({ username })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal(200);
        expect(res.body.result).to.be.an('object');
        expect(res.body.result).to.have.property('name', username);
        done();
      });
  });

  it('should return a 404 status code for a non-existent user', (done) => {
    const username = 'NonExistentUser'; // Replace with a non-existent username

    chai
      .request(app)
      .get('/user')
      .query({ username })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
describe('POST /message', () => {
  it('should create a new message and return status 200', (done) => {
    const newMessage = {
      content: 'Test message content',
      author: '653b696d9f09d5c51b084ada',
    };

    chai
      .request(app)
      .post('/message')
      .send(newMessage)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.an('object');
        done();
      });
  });

  it('should handle errors and return status 500 on server error', (done) => {
    const originalMessageCreate = Message.create;
    Message.create = () => {
      throw new Error('Test error');
    };

    chai
      .request(app)
      .post('/message')
      .send({ content: 'Test message content', author: '' })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        done();

        Message.create = originalMessageCreate;
      });
  });
});
describe('GET /messages', () => {
  it('should return a list of messages with status 200',  () => {
     setTimeout(async() => {
      const res = await chai.request(app).get('/messages');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
    }, 5000)
  });

  it('should handle errors and return status 500 on server error', (done) => {
    const originalMessageFind = Message.find;
    Message.find = () => {
      throw new Error('Test error');
    };

    chai
      .request(app)
      .get('/messages')
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        done();

        Message.find = originalMessageFind;
      });
  });
});
describe('POST /messages/:messageId/comments', () => {
  it('should create a new comment and return the updated message with status 200', (done) => {
    const newComment = {
      author: '653b696d9f09d5c51b084adb',
      timestamp: Date.now(),
      content: 'Test comment content',
    };

    const validMessageId = '653b77909f09d5c51b084b08';

    chai
      .request(app)
      .post(`/messages/${validMessageId}/comments`)
      .send(newComment)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.comments).to.be.an('array');
        done();
      });
  });

  it('should return status 404 for an invalid message ID', (done) => {
    const invalidMessageId = '';

    chai
      .request(app)
      .post(`/messages/${invalidMessageId}/comments`)
      .send({
        author: 'Test author',
        timestamp: Date.now(),
        content: 'Test comment content',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should handle errors and return status 500 on server error', (done) => {
    const originalMessageFindById = Message.findById;
    Message.findById = () => {
      throw new Error('Test error');
    };

    chai
      .request(app)
      .post('/messages/validMessageId/comments')
      .send({
        author: 'Test author',
        timestamp: Date.now(),
        content: 'Test comment content',
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();

        Message.findById = originalMessageFindById;
      });
  });
});
