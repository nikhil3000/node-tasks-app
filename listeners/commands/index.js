const { createNewGameCallback } = require('./create-new-game');

module.exports.register = (app) => {
    app.command('/play-mafia', createNewGameCallback);
};
