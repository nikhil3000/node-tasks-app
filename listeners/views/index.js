const { newTaskModalCallback } = require('./new-task-modal');
const { createNewGame } = require('./create-new-game');

module.exports.register = (app) => {
  app.view('new-task-modal', newTaskModalCallback);
  app.view('new-game-modal', createNewGame);
};
