const {
  HomeTab,
  Header,
  Divider,
  Section,
  Actions,
  Elements
} = require('slack-block-builder');

module.exports = (inProgressGame) => {

  const homeTab = HomeTab({ callbackId: 'tasks-home', privateMetaData: 'open' }).blocks(
      Actions({ blockId: 'task-creation-actions' }).elements(
          Elements.Button({ text: 'My Games' }).value('app-home-nav-open').actionId('app-home-nav-open'),
          Elements.Button({ text: 'Ongoing Game' }).value('app-home-nav-completed').actionId('app-home-nav-completed').primary(true),
      ),
  );


  if (!inProgressGame || inProgressGame.length === 0) {
    homeTab.blocks(
      Header({ text: 'No ongoing game' }),
      Divider(),
      Section({ text: "Looks like you've not started any game" }),
    );
    return homeTab.buildToJSON();
  }

  const inProgressGamesList = [];
      // inProgressGame.forEach((game) => {
        inProgressGamesList.push(
            Section({ text: `${inProgressGame.title}` }).accessory(
                Elements.Button({ text: 'End Game' })
                    .value(`${inProgressGame.id}`)
                    .actionId('end-game'),
            ))
        inProgressGamesList.push(Divider());
        inProgressGame.Users.forEach(gameUser => {
            const eliminated = gameUser.GameUserAssociation.status === 'ELIMINATED';
            if(gameUser.GameUserAssociation.associationType === "PLAYER") {
                inProgressGamesList.push(
                    Section({text: eliminated ? `~${gameUser.GameUserAssociation.role}~ <@${gameUser.slackUserID}>` : `${gameUser.GameUserAssociation.role} <@${gameUser.slackUserID}>`}).accessory(
                        Elements.Button({text: eliminated ? 'TODO Add Back' : 'Eliminate'})
                            .value(`${gameUser.id}/${inProgressGame.id}`)
                            .actionId('eliminate-player')
                    ))
            }
        })

  homeTab.blocks(
    Header({
      text: `Latest ongoing game:`,
    }),
    Divider(),
    inProgressGamesList,
  );

  return homeTab.buildToJSON();
};
