import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { modelTeams, serviceResult } from './mocks/service.mocks/allTeams.mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as rotas `/teams`', () => {

  beforeEach(() => {
    sinon.restore();
  })

  it('Deve retornar todos os times caso os servidor esteja rodando', async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([...modelTeams] as Teams[]);

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.equal(serviceResult);
  })

  it('Deve retornar error caso a resposta do model for vazia', async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([] as Teams[]);

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(500)
    expect(response.body).to.be.deep.eq({message: 'Teams not found'})
  })

  it('Deve retornar error o servidor de erro', async () => {
    sinon
      .stub(Teams, "findAll")
      .throws(new Error('Algo de errado aconteceu'));

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(500)
    expect(response.body).to.be.deep.eq({message: {}})
  })
});
