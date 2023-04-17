module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GameUserAssociations', {
            gameId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Games',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                primaryKey: true
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull:false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                primaryKey: true
            },
            associationType: {
                type: Sequelize.ENUM('CREATOR', 'PLAYER'),
                primaryKey: true
            },
            status: {
                type: Sequelize.ENUM('WAITING', 'IN_GAME', 'ELIMINATED'),
            },
            // example: doctor, mafia, detective
            role: {
              type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('GameUserAssociation');
    },
};
