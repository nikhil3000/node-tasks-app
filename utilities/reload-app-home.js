const {
  allCreatedGamesView,
  inProgressGamesView,
} = require('../user-interface/app-home');
const { User, Game } = require('../models');

module.exports = async (client, slackUserID, slackWorkspaceID, navTab) => {
  try {
    const userData = await User.findOrCreate({
      where: {
        slackUserID,
        slackWorkspaceID,
      },
      include: [
        {
          model: Game
        }
      ],
    })

    // FIXME: If a user joins the game he created, sequelize will only return one of the associations
    const gamesCreated = userData[0].Games.filter(game => game.GameUserAssociation.associationType === 'CREATOR');
    const gamesListForView = [];
    gamesCreated.forEach(game => {gamesListForView.push({title: game.title, status: game.status, id: game.id})})

    if (navTab === 'completed') {
      const createdGameInProgress = gamesCreated.find(game => game.status === 'IN_PROGRESS');
      let gamePlayers = [];
      if(createdGameInProgress && createdGameInProgress.id) {
         gamePlayers = await Game.findAll({
          where: {
            id: createdGameInProgress.id
          },
          include: [
            {
              model: User
            }
          ]
        })
      }

      await client.views.publish({
        user_id: slackUserID,
        view: inProgressGamesView(gamePlayers[0])
      });
      return;
    }

    await client.views.publish({
      user_id: slackUserID,
      view: allCreatedGamesView(gamesListForView),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
