const shortcutsListener = require('./shortcuts');
const viewsListener = require('./views');
const eventsListener = require('./events');
const actionsListener = require('./actions');
const commandListeners = require('./commands');

module.exports.registerListeners = (app) => {
  shortcutsListener.register(app);
  viewsListener.register(app);
  eventsListener.register(app);
  actionsListener.register(app);
  commandListeners.register(app);
};
