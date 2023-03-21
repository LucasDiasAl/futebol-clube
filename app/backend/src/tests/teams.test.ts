import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';

import { modelTeams, serverResult } from './mocks/service.mocks/allTeams.mocks'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as rotas `/teams`', () => {

  beforeEach(() => {
    sinon.restore();
  })

  it('A rota `/teams` deve retornar todos os times caso os servidor esteja rodando', async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([...modelTeams] as Teams[]);

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.equal(serverResult);
  })

  it('A rota `/teams` deve retornar error caso a resposta do model for vazia', async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([] as Teams[]);

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(500)
    expect(response.body).to.be.deep.eq({message: 'Teams not found'})
  })

  it('A rota `/teams` deve retornar error o servidor de erro', async () => {
    sinon
      .stub(Teams, "findAll")
      .throws(new Error('Algo de errado aconteceu'));

    const response = await chai.request(app).get('/teams')
    expect(response.status).to.be.eq(500)
    expect(response.body).to.be.deep.eq({message: {}})
  })

  it('A rota `/teams/:id` deve retornar o time que possui o id 2', async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(modelTeams[1] as Teams);

    const response = await chai.request(app).get('/teams/2')
    expect(response.status).to.be.eq(200)
    expect(response.body).to.be.deep.eq(serverResult[1])
  })
  it('A rota `/teams/:id` deve retornar error se o id do time nao existir', async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(null);

    const response = await chai.request(app).get('/teams/999')
    expect(response.status).to.be.eq(404)
    expect(response.body).to.be.deep.eq({ message: 'Team not found' })
  })

  it('A rota `/teams/:id` deve retornar error caso haja erro durante o processo', async () => {
    sinon
      .stub(Teams, "findByPk")
      .throws(new Error());

    const response = await chai.request(app).get('/teams/999')
    expect(response.status).to.be.eq(500)
    expect(response.body).to.be.deep.eq({ message: {} })
  })
});
