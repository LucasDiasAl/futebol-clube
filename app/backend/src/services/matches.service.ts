import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

type MatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
export default class MatchesService {
  constructor(private _matchesModel = MatchesModel) {
  }

  public getMatches = async (): Promise<MatchesModel[]> => this._matchesModel.findAll({
    include:
      [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
  })
    .then((data: MatchesModel[]) => data.map((elem: MatchesModel) => elem.dataValues));

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
    }).then((data: MatchesModel[]) => data.map((elem: MatchesModel) => elem.dataValues));

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
}

// const teste = async () => {
//   const team = new MatchesService();
//   console.log(await team.finishMatch('47'));
// };
//
// teste();
