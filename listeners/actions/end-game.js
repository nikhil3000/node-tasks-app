const { Game } = require("../../models");
const {reloadAppHome} = require("../../utilities");


const endGame = async ({ body, ack, client }) => {
    try {
        await ack();
        const gameId = body.actions[0].value
        const gameData = await Game.findAll({
            where: {
                id: gameId
            }
        });
        gameData[0].status = 'CLOSED';
        await gameData[0].save();
        await reloadAppHome(client, body.user.id, body.team.id, 'open');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { endGame };
