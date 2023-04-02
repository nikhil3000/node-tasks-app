const { User, Game } = require('../../models');
const { modals } = require('../../user-interface');
const { messages } = require('../../user-interface')

const createNewGame = async ({ ack, view, body, client }) => {
    const providedValues = view.state.values;

    const newGameTitle = providedValues.gameTitle.newGameTitle.value;
    const allowedRoles = providedValues.allowedRoles.checkboxesId.selected_options.map(role => role.value);
    const channel = providedValues.newGameChannel.newGameChannel.selected_channel;

    try {
        // Grab the creating user from the DB
        const queryResult = await User.findOrCreate({
            where: {
                slackUserID: body.user.id,
                slackWorkspaceID: body.team.id,
            },
        });
        const user = queryResult[0];

        const game = Game.build({title: newGameTitle, roles: allowedRoles.toString()});
        await game.save();
        const savedGame  = await game.setCreator(user);
        await ack();
        await client.chat.postMessage({
            channel,
            blocks: messages.gameCreated(newGameTitle, savedGame.dataValues.id, body.user)
        })
    } catch (error) {
        await ack({
            response_action: 'update',
            view: modals.taskCreationError(newGameTitle),
        });
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { createNewGame };
