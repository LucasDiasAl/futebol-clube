'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('matches', {
       id: {
         primaryKey: true,
         autoIncrement: true,
         type: Sequelize.INTEGER,
         allowNull: false,
       },
       home_team_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references:{
           model: 'teams',
           key: 'id'
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       },
       home_team_goals: {
         type: Sequelize.INTEGER,
         allowNull: false,
       },
       away_team_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references:{
           model: 'teams',
           key: 'id'
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       },
       away_team_goals: {
         type: Sequelize.INTEGER,
         allowNull: false,
       },
       in_progress: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
       },
     });

  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('matches');
  }
};
