import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from "../database/models/UsersModel";
import findOneUserMock from "./mocks/findOneUserMock";
import { validLogin, invalidLoginNoPass } from "./mocks/loginUsersMock";

chai.use(chaiHttp);

const { expect } = chai;

describe('testa a rota `/login`', () => {
beforeEach(() => {
  sinon.restore()
})

  it('Testa a rota `login`com um login certo', async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(findOneUserMock as Users);
    const HttpResponse = await chai.request(app).post('/login').send(validLogin)
    expect(HttpResponse.status).to.be.eq(200)
    expect(HttpResponse.body).to.have.haveOwnProperty('token')
    expect(HttpResponse.body.token).to.matches(/^\w+.\w+.[\w-]+$/);
  });
  it('Testa o a rota `login`quando nao tiver senha', async () => {
    const HttpResponse = await chai.request(app).post('/login').send(invalidLoginNoPass)
    expect(HttpResponse.status).to.be.eq(400)
    expect(HttpResponse.body).to.be.deep.eq({message: 'All fields must be filled'})
  })
});
