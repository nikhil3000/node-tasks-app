const reloadAppHome = require('../../utilities/reload-app-home');
const {User, GameUserAssociation, Game} = require("../../models");
const { messages } = require('../../user-interface')


const joinGame = async ({ body, ack, client }) => {
    try {
        await ack();
        const gameId = body.actions[0].action_id.split('-')[1];
        const userQueryResult = await User.findOrCreate({
            where: {
                slackUserID: body.user.id,
                slackWorkspaceID: body.team.id,
            },
        });
        const gameQueryResult = await Game.findByPk(gameId);
        const userId = userQueryResult[0].dataValues.id;
        const gameUserAssociation = GameUserAssociation.build({
            gameId,
            userId
        })
        await gameUserAssociation.save();
        await client.chat.postMessage({
            channel: body.channel.id,
            blocks: messages.gameJoined(gameQueryResult.dataValues.title, body.user)
        })
        // await reloadAppHome(client, body.user.id, body.team.id, 'completed');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { joinGame };
