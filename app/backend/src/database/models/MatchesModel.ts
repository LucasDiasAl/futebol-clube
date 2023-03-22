import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
    allowNull: false,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_id',
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesModel.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Teams.hasMany(MatchesModel, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(MatchesModel, { foreignKey: 'awayTeamId', as: 'awayTeam' });
export default MatchesModel;
