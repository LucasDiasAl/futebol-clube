import * as sinon from 'sinon';
import * as chai from 'chai';

import {app} from '../app';
import MatchesModel from "../database/models/MatchesModel";
import {
  mockFindAll,
  mockGETAllResponse,
  mockGETAllResponseByProg,
  mockTeamsFindAllProgFalse,
} from './mocks/matchesMocks'
// @ts-ignore
import chaiHttp = require('chai-http');
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const {expect} = chai;

describe('testa a rota "/matches"', () => {
  beforeEach(() => {
    sinon.restore()
  })
  it('Testa a rota GET /matches que deve retornar todas as partidas', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(mockFindAll as MatchesModel[])
    const res = await chai.request(app).get('/matches')

    expect(res.status).to.be.eq(200)
    expect(res.body).to.be.deep.eq(mockGETAllResponse)
  });

  it('Testa a rota GET /matches/?inProgress=true que deve retornar todas as partidas em progresso', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(mockTeamsFindAllProgFalse as MatchesModel[])
    const res = await chai.request(app).get('/matches?inProgress=true')

    expect(res.status).to.be.eq(200)
    expect(res.body).to.be.deep.eq(mockGETAllResponseByProg)
  });

  it('Testa a rota GET /matches/?inProgress=carro retornar error por nao ser do tipo boolean', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(mockTeamsFindAllProgFalse as MatchesModel[])
    const res = await chai.request(app).get('/matches?inProgress=carro')

    expect(res.status).to.be.eq(400)
    expect(res.body).to.be.deep.eq({message: 'inProgress must be "true" or "false"'})
  });

  it('deve retornar status 500 se der error', async () => {
    const error = new Error('Internal Server Error');
    sinon.stub(MatchesModel, 'findAll').rejects(error);

    const res = await chai.request(app).get('/matches');

    expect(res).to.have.status(500);
    expect(res.body.message).to.equal('Internal server error');

  });
});

