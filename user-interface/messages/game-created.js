const { Blocks, Message, Elements } = require('slack-block-builder');

module.exports = (gameTitle, gameId, creator) => Message()
            .blocks(
            Blocks.Section({ text: `A new Mafia game ${gameTitle} created by @${creator.username}` }),
            Blocks.Section({ text: '<list of people: TODO are waiting for you to join the game' }),
            Blocks.Divider(),
            Blocks.Actions()
                .elements(
                    Elements.Button({ text: 'Join Game', actionId: `joinMafia-${gameId}` }).primary(),
                    Elements.Button({ text: 'Leave Game: TODO', actionId: 'leaveMafia' }))
                        )
        .getBlocks()