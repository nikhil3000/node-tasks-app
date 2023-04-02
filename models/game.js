const {
    Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Game.belongsTo(models.User, { as: 'creator' });
        }
    }
    Game.init({
            // Model attributes are defined here
            title: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM,
                values: ['CREATED', 'IN_PROGRESS', 'CLOSED'],
                defaultValue: 'CREATED',
            },
            roles: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Game',
        });
    return Game;
};
