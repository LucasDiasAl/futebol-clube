import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import TeamService from './team.service';

type MatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

interface CreateMatch extends MatchGoals {
  homeTeamId: number,
  awayTeamId: number,
}

export default class MatchesService {
  constructor(
    private _matchesModel = MatchesModel,
    private _teamsService: TeamService = new TeamService(),
  ) {
  }

  private refactorModelResponse = (data: MatchesModel[]) => data.map(({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      awayTeam: { dataValues: awayTeam },
      ...restOfInfo
    },
  }: MatchesModel): MatchesModel[] => ({
    ...restOfInfo,
    homeTeam,
    awayTeam,
  }));

  public getMatches = async (): Promise<MatchesModel[]> => this._matchesModel.findAll({
    include:
      [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
  }).then((response: MatchesModel[]) => this
    .refactorModelResponse(response) as unknown as MatchesModel[]);

  public getMatchById = async (id: string | number): Promise<MatchesModel[]> => this._matchesModel
    .findAll({
      where: { id },
    });

  public getMatchesByProg = (progress: string): Promise<MatchesModel[]> => this._matchesModel
    .findAll({
      include:
        [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress: JSON.parse(progress) },
    }).then((response: MatchesModel[]) => this
      .refactorModelResponse(response) as unknown as MatchesModel[]);

  public finishMatch = async (idMatch: string): Promise<void> => {
    const promise = await this._matchesModel.update(
      { inProgress: false },
      {
        where: {
          id: idMatch,
        },
      },
    );
    await Promise.all(promise);
  };

  public updateMatch = async (idMatch: string, goalsObj: MatchGoals): Promise<void> => {
    const promise = await this._matchesModel.update(
      {
        homeTeamGoals: goalsObj.homeTeamGoals,
        awayTeamGoals: goalsObj.awayTeamGoals,
      },
      { where: { id: idMatch } },
    );
    await Promise.all(promise);
  };

  public createMatch = async (match: CreateMatch) => {
    const teamA = await this._teamsService.getTeamById(match.awayTeamId);
    const teamB = await this._teamsService.getTeamById(match.homeTeamId);
    if (!teamA || !teamB) {
      return { type: null, status: 404, message: 'There is no team with such id!' };
    }
    if (teamA.teamName === teamB.teamName) {
      return {
        type: null,
        status: 422,
        message: 'It is not possible to create a match with two equal teams',
      };
    }
    const matchCreated = await this._matchesModel.create({ ...match, inProgress: true });
    return {
      type: 'sucess',
      status: 201,
      message: matchCreated.dataValues,
    };
  };
}

// const teste = async () => {
//   const team = new MatchesService();
//   console.log(await team.getMatches());
// };
//
// teste();
