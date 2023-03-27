type Matches = {
  dataValues: {
    id: number,
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
    homeTeam: { dataValues: { teamName: string } },
    awayTeam: { dataValues: { teamName: string } }
  }
};
const mockFindAll: Matches[] = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 7,
      homeTeamGoals: 1,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: true,
      homeTeam: {dataValues: {teamName: 'Flamengo'}},
      awayTeam: {dataValues: {teamName: 'Cruzeiro'}}
    }
  },
  {
    dataValues: {
      id: 2,
      homeTeamId: 5,
      homeTeamGoals: 1,
      awayTeamId: 7,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {dataValues: {teamName: 'Cruzeiro'}},
      awayTeam: {dataValues: {teamName: 'Flamengo'}}
    }
  }]

const mockGETAllResponse = mockFindAll.map((
  {
    dataValues: {
      homeTeam: {dataValues: homeTeam},
      awayTeam: {dataValues: awayTeam},
      ...restOfInfo
    }
  }: Matches) => ({...restOfInfo, homeTeam, awayTeam}))

const mockTeamsFindAllProgFalse = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 7,
      homeTeamGoals: 1,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: false,
      homeTeam: {dataValues: {teamName: 'Flamengo'}},
      awayTeam: {dataValues: {teamName: 'Cruzeiro'}}
    }
  },
  {
    dataValues: {
      id: 2,
      homeTeamId: 5,
      homeTeamGoals: 1,
      awayTeamId: 7,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {dataValues: {teamName: 'Cruzeiro'}},
      awayTeam: {dataValues: {teamName: 'Flamengo'}}
    }
  }]

const mockGETAllResponseByProg = mockTeamsFindAllProgFalse.map((
  {
    dataValues: {
      homeTeam: {dataValues: homeTeam},
      awayTeam: {dataValues: awayTeam},
      ...restOfInfo
    }
  }: Matches) => ({...restOfInfo, homeTeam, awayTeam}))

export {
  mockFindAll,
  mockGETAllResponse,
  mockGETAllResponseByProg,
  mockTeamsFindAllProgFalse,
}