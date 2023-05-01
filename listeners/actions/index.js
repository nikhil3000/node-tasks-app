const { appHomeNavCompletedCallback } = require('./block_app-home-nav-completed');
const { appHomeNavCreateATaskCallback } = require('./block_app-home-nav-create-a-task');
const { appHomeNavOpenCallback } = require('./block_app-home-nav-open');
const { buttonMarkAsDoneCallback } = require('./block_button-mark-as-done');
const { startGameCallback } = require('./start-game');
const { openTaskCheckboxClickedCallback } = require('./block_open_task_list_home');
const { joinGame } = require('./join-game');
const { eliminatePlayer } = require('./eliminate-player')
const { endGame } = require('./end-game')

module.exports.register = (app) => {
  app.action(
    { action_id: 'app-home-nav-completed', type: 'block_actions' },
    appHomeNavCompletedCallback,
  );
  app.action('app-home-nav-create-a-task', appHomeNavCreateATaskCallback);
  app.action(
    { action_id: 'app-home-nav-open', type: 'block_actions' },
    appHomeNavOpenCallback,
  );
  app.action(
    { action_id: 'button-mark-as-done', type: 'block_actions' },
    buttonMarkAsDoneCallback,
  );
  app.action(
    { action_id: 'start-game', type: 'block_actions' },
    startGameCallback,
  );
  app.action(
    {
      action_id: 'blockOpenTaskCheckboxClicked',
      type: 'block_actions',
    },
    openTaskCheckboxClickedCallback,
  );
  app.action(
      {action_id: /(joinMafia-).*/, type: 'block_actions'},
      joinGame,
  );
  app.action(
      {action_id: 'eliminate-player',
      type: "block_actions"
      },
      eliminatePlayer
  );
    app.action(
        {action_id: 'end-game',
            type: "block_actions"
        },
        endGame
    )
};
