const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const botInteraction = new Telegraf(process.env.BOT_TOKEN);
const { initializeCommands, initializeActions } = require('../bot/handlers');

async function initializeBot() {
    initializeCommands(botInteraction);
    initializeActions(botInteraction);

    botInteraction.launch();
}

module.exports = { initializeBot };