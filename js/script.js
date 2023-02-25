import modal from './modules/modal';
import TicTacToe from './modules/TicTacToe';
import tabs from './modules/tabs';

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToe(3, 3, '#game-block');

    game.renderGameField();

    tabs(game);
    modal('[data-modal]', '.modal');
});
