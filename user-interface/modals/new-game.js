const { Modal, Blocks, Elements, Bits, Input} = require('slack-block-builder');
const {MafiaRoles} = require("../../types/mafiaRoles");

module.exports = (channelId) =>
    Modal({title: 'Create new game', submit: 'Create', callbackId: 'new-game-modal'})
        .blocks(
            Blocks.Input({label: 'New Game Title', blockId: 'gameTitle'}).element(
                Elements.TextInput({
                    actionId: 'newGameTitle'
                }),
            ),
            Input({label: 'Allowed Roles', blockId: 'allowedRoles'})
                .dispatchAction()
                .element(Elements.Checkboxes({actionId: 'checkboxesId'})
                    .options(
                        MafiaRoles.map((role) => {
                        const option = {
                            text: role,
                            value: role
                        }
                        return Bits.Option(option);
                }))
            ),
            Blocks.Input({label: 'Channel', blockId: 'newGameChannel'}).element(
                Elements.ChannelSelect({
                    actionId: 'newGameChannel',
                }).initialChannel(channelId)
            )
        ).buildToJSON();
