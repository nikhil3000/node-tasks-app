const {User, Game} = require("../../models");
const {reloadAppHome} = require("../../utilities");


const eliminatePlayer = async ({ body, ack, client }) => {
    try {
        await ack();
        const playerId = body.actions[0].value.split('/')[0];
        const gameId = body.actions[0].value.split('/')[1];
        const playerData = await User.findOrCreate({
            where: {
                id: playerId
            },
            include: [{
                model: Game
            }]
        });
        const currentGame = playerData[0].Games.find(game => game.id.toString() === gameId);
        currentGame.GameUserAssociation.status = 'ELIMINATED';
        await currentGame.GameUserAssociation.save();
        await reloadAppHome(client, body.user.id, body.team.id, 'completed');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { eliminatePlayer };
