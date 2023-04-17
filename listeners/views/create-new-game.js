const { User, Game, GameUserAssociation } = require('../../models');
const { modals } = require('../../user-interface');
const { messages } = require('../../user-interface')

const createNewGame = async ({ ack, view, body, client }) => {
    const providedValues = view.state.values;

    const newGameTitle = providedValues.gameTitle.newGameTitle.value;
    const allowedRoles = providedValues.allowedRoles.checkboxesId.selected_options.map(role => role.value);
    const channel = providedValues.newGameChannel.newGameChannel.selected_channel;

    try {
        // Grab the creating user from the DB
        const user = (await User.findOrCreate({
            where: {
                slackUserID: body.user.id,
                slackWorkspaceID: body.team.id,
            },
        }))[0];

        const game = Game.build({title: newGameTitle, roles: allowedRoles.toString()});
        const savedGame = await game.save();
        await GameUserAssociation.build({gameId: savedGame.dataValues.id, userId: user.dataValues.id, associationType: 'CREATOR'}).save();
        await ack();
        await client.chat.postMessage({
            channel,
            blocks: messages.gameCreated(newGameTitle, savedGame.dataValues.id, body.user)
        })
    } catch (error) {
        await ack({
            response_action: 'update',
            view: modals.taskCreationError(`We couldn't create ${newGameTitle}. Sorry!`),
        });
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { createNewGame };
