'use strict';
const TEXT = `\nПрограмма запускает http-сервер и формирует файл с данными для API.

Гайд:
server <command>

Команды:
--version:            выводит номер версии
--help:               печатает этот текст
--generate <count>    формирует файл mocks.json\n`;


module.exports = {
  name: `--help`,
  run() {
    console.log(TEXT);
  }
};
