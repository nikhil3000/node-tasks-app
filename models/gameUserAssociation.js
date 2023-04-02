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
              primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            status: {
                type: DataTypes.ENUM,
                values: ['WAITING', 'IN_GAME', 'ELIMINATED'],
                defaultValue: 'WAITING',
            }
        },
        {
            sequelize,
            modelName: 'GameUserAssociation',
        });
    return GameUserAssociation;
};
