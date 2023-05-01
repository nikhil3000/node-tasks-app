const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GameUserAssociation extends Model {

    }
    GameUserAssociation.init({
            // Model attributes are defined here
            gameId: {
              type: DataTypes.INTEGER,
              primaryKey: true,
                references: {
                    model: 'Games',
                    key: 'id',
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            status: {
                type: DataTypes.ENUM,
                values: ['WAITING', 'IN_GAME', 'ELIMINATED'],
                defaultValue: 'WAITING',
            },
            associationType: {
                type: DataTypes.ENUM,
                values: ['CREATOR', 'PLAYER'],
                defaultValue: 'PLAYER'
            },
            role: {
                type: DataTypes.STRING
            }
        },
        {
            sequelize,
            modelName: 'GameUserAssociation',
        });
    return GameUserAssociation;
};
