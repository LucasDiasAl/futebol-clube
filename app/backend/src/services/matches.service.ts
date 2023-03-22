import MatchesModel from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

export default class MatchesService {
  constructor(private _matchesModel = MatchesModel) {
  }

  public getMatches = async () => this._matchesModel.findAll({
    include:
      [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] }],
  })
    .then((data: MatchesModel[]) => data.map((elem: MatchesModel) => elem.dataValues));
}

// const teste = async () => {
//   const team = new MatchesService();
//   console.log(await team.getMatches());
// };
//
// teste();
