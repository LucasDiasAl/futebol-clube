import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  constructor(private _matchesModel = MatchesModel) {
  }

  public getMatches = async (): Promise<MatchesModel[]> => this._matchesModel.findAll({
    include:
      [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
  })
    .then((data: MatchesModel[]) => data.map((elem: MatchesModel) => elem.dataValues));

  public getMatchesByProg = (progress: string): Promise<MatchesModel[]> => this._matchesModel
    .findAll({
      include:
        [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
      where: { inProgress: JSON.parse(progress) },
    }).then((data: MatchesModel[]) => data.map((elem: MatchesModel) => elem.dataValues));
}

// const teste = async () => {
//   const team = new MatchesService();
//   console.log(await team.getMatchesByProg('true'));
// };
//
// teste();
