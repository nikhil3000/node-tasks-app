const { modals } = require('../../user-interface');

// Expose callback function for testing
const createNewGameCallback = async ({ body, ack, client }) => {
    try {
        await ack();
        await client.views.open({
            trigger_id: body.trigger_id,
            view: modals.newGame(body.channel_id),
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

module.exports = { createNewGameCallback };
