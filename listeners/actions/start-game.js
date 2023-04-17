const { Task, Game, User, GameUserAssociation } = require('../../models');
const { reloadAppHome } = require('../../utilities');
const {completedTasksView} = require("../../user-interface/app-home");
const {modals} = require("../../user-interface");
const { Op } = require('sequelize');

const startGameCallback = async ({ ack, action, client, body }) => {
  await ack();
  const gameId = action.value;
  const gameData = await Game.findAll({
    where: {
      id: gameId
    },
    include: [{
      model: User
    }]
  })
  console.log(JSON.stringify(gameData[0]));
  const gamePlayers = gameData[0].Users.filter(user => user.GameUserAssociation.associationType === "PLAYER")
  if(!gameData[0].Users || gamePlayers.length < 6) {
    // error: There should be at least 5 players to play a game.
    await client.views.open({
      trigger_id: body.trigger_id,
      view: modals.taskCreationError(`We need at least 6 members to start the game.`),
    });
  }
  const totalPlayerCount = gamePlayers.length;
  const rolesList = [];
  const mafiaCount = totalPlayerCount / 4;
  const detectiveCount = totalPlayerCount / 6;
  const doctorCount = totalPlayerCount / 5;
  // const villagerCount = totalPlayerCount - mafiaCount - detectiveCount - doctorCount;
  let i = 0;
  while( i < mafiaCount){
    rolesList.push('MAFIA');
    i++;
  }
  while( i < mafiaCount + detectiveCount){
    rolesList.push('DETECTIVE');
    i++;
  }
  while( i < mafiaCount + detectiveCount + doctorCount){
    rolesList.push('DOCTOR');
    i++;
  }
  while( i < totalPlayerCount){
    rolesList.push('VILLAGER')
    i++;
  }

  for (i = rolesList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [rolesList[i], rolesList[j]] = [rolesList[j], rolesList[i]];
  }

  // assign roles to players
  for(i = 0; i < gamePlayers.length; i++) {
    gamePlayers[i].GameUserAssociation.role = rolesList[i];
    gamePlayers[i].GameUserAssociation.status = 'IN_GAME';
  }

  // update db and dm roles to players
  gamePlayers.forEach(player => {
    player.GameUserAssociation.save();
    client.chat.postMessage({
      channel: player.slackUserID,
      text: `Hello, You have been assigned the role of ${player.GameUserAssociation.role} for Mafia Game: ${gameData[0].title}`
    })
  })
  // Task.update({ status: 'OPEN' }, { where: { id: action.value } });
  // await reloadAppHome(client, body.user.id, body.team.id, 'completed');
}

module.exports = {
  startGameCallback,
};
