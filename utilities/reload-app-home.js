const {
  openTasksView,
  completedTasksView,
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

    console.log(JSON.stringify(gamesCreated));
    if (navTab === 'completed') {
      // const recentlyCompletedTasks = await user.getAssignedTasks({
      //   where: {
      //     status: 'CLOSED',
      //     updatedAt: {
      //       [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      //     },
      //   },
      // });

      await client.views.publish({
        user_id: slackUserID,
        view: completedTasksView([]),
      });
      return;
    }

    await client.views.publish({
      user_id: slackUserID,
      view: openTasksView(gamesListForView),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
