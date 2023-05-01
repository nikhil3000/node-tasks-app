const {
  HomeTab, Header, Divider, Section, Actions, Elements} = require('slack-block-builder');
const pluralize = require('pluralize');

module.exports = (allGames) => {
  const homeTab = HomeTab({ callbackId: 'tasks-home', privateMetaData: 'open' }).blocks(
    Actions({ blockId: 'task-creation-actions' }).elements(
      Elements.Button({ text: 'My Games' }).value('app-home-nav-open').actionId('app-home-nav-open').primary(true),
      Elements.Button({ text: 'Ongoing Game' }).value('app-home-nav-completed').actionId('app-home-nav-completed'),
    ),
  );

  if (allGames.length === 0) {
    homeTab.blocks(
      Header({ text: 'No Games created' }),
      Divider(),
      Section({ text: 'Looks like you\'ve not created any games.' }),
    );
    return homeTab.buildToJSON();
  }



  const completedTaskList = allGames.map((game) => {
    let buttonText = 'Start Game';
    if(game.status === 'CLOSED'){
      buttonText = 'Start Another Round';
    }
    if(game.status === 'IN_PROGRESS') {
      buttonText = 'End Game'
    }
    return Section({ text: `*${game.title}* with status ${game.status}` }).accessory(
        Elements.Button({ text: buttonText })
            .value(`${game.id}`)
            .actionId(game.status === 'IN_PROGRESS' ? 'end-game' : 'start-game'),
    )
  });

  homeTab.blocks(
    Header({ text: `You have created ${allGames.length} ${pluralize('game', allGames.length)}` }),
    Divider(),
      completedTaskList,
  );

  return homeTab.buildToJSON();
};
