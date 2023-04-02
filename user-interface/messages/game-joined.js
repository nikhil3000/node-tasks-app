const { Blocks, Message } = require('slack-block-builder');

module.exports = (gameTitle, user) => Message()
    .blocks(
        Blocks.Section({ text: `@${user.username} has joined the Mafia game ${gameTitle}` }),
    )
    .getBlocks()