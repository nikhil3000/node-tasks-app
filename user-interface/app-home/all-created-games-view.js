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



  const completedTaskList = allGames.map((game) =>
      Section({ text: `*${game.title}* with status ${game.status}` }).accessory(
          Elements.Button({ text: 'Start Game' })
              .value(`${game.id}`)
              .actionId('start-game'),
      ),
  );

  homeTab.blocks(
    Header({ text: `You have ${allGames.length} open ${pluralize('task', allGames.length)}` }),
    Divider(),
      completedTaskList,
  );

  return homeTab.buildToJSON();
};
