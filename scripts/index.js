/**
 * Get the closest matching element up the DOM tree.
 * 
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function (elem, selector) {
  // Get closest match
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
};

/**
 * Attach a handler to an event for all elements matching a selector.
 * 
 * From TodoMVC https://github.com/tastejs/todomvc/blob/gh-pages/examples/vanilla-es6/src/helpers.js
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
function $delegate(target, selector, type, handler, capture) {
  const dispatchEvent = event => {
    const targetElement = event.target;
    const potentialElements = target.querySelectorAll(selector);
    let i = potentialElements.length;

    while (i--) {
      if (potentialElements[i] === targetElement) {
        handler.call(targetElement, event);
        break;
      }
    }
  };

  $on(target, type, dispatchEvent, !!capture);
}


/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
function $on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}


class Game {
  /**
   * @param {Array} players Players that will be part of the game 
   */
  constructor(players) {
    this.players = players;
    this.board = document.querySelector(".board");
    this.spaces = document.querySelectorAll(".space");
    this.notice = document.querySelector('.notice');
    this.moveButtons = '[data-move]';
    this.confirmZwapButton = document.querySelector('[data-confirm]');
    this.cancelZwapButton = document.querySelector('[data-cancel]');
    this.isSetup = true;
    this.zwapInProgress = {
      status: false,
      player: false,
      givingTile: false,
      takingTile: false,
    };
    this.tiles = [
      new Tile("Architecture"),
      new Tile("Art & Stage"),
      new Tile("Communities"),
      new Tile("Design"),
      new Tile("Film"),
      new Tile("Finance"),
      new Tile("Food & Drink"),
      new Tile("Geography"),
      new Tile("History"),
      new Tile("Humans"),
      new Tile("Language"),
      new Tile("Literature"),
      new Tile("Music"),
      new Tile("Nature"),
      new Tile("Politics"),
      new Tile("Science"),
      new Tile("Sports & Games"),
      new Tile("Technology"),
      new Tile("Tradition & Beliefs"),
      new Tile("TV & Radio")
    ];
  }

  /**
   * Setup game. Draw tiles for players, set up event listeners
   * for tiles, buttons, etc.
   */
  initGame() {
    // Draw tiles for each player.
    this.players.forEach(player => player.drawTiles());

    // Game play listeners.
    $delegate(document, this.moveButtons, 'click', this.handleMove, false);
    $delegate(document, '.tile, .tile > *', 'click', this.handleFlip, false);
    $delegate(document, '[data-zwap], [data-zwap] > *', 'click', this.handleZwap, false);

    // Game setup listeners.
    $delegate(document, '[data-confirm]', 'click', this.startGame, false);

    document.querySelectorAll(`.tile-value`).forEach(select => {
      select.addEventListener('change', (e) => {
        const tile = document.querySelectorAll(`.tile-category[data-color="${ select.dataset.color }"]`)[parseInt(select.dataset.tile) - 1];
        tile.dataset.tile = select.value;
      })
    });

    // Zwap listeners.
    this.confirmZwapButton.addEventListener('click', this.confirmZwap);
    this.cancelZwapButton.addEventListener('click', this.cancelZwap);
  }

  startGame() {
    game.players.forEach(player => {
      // Get player names and replace player name text w/input text.
      const nameInput = document.querySelector(`.player-name-setup[data-color="${ player.color }"]`);
      document.querySelector(`.player-name[data-color="${ player.color }"]`).innerText = nameInput.value || `${ player.color } player`;

      // Sort tiles in correct order.
      const parent = document.querySelector(`.tiles-gameplay[data-color="${ player.color }"]`);
      const tiles = Array.from(document.querySelectorAll(`.tile-category[data-color="${ player.color }"]`))
        .sort((a, b) => a.dataset.tile > b.dataset.tile ? 1 : -1);
      tiles.forEach(tile => parent.appendChild(tile))

      // Arrange tiles in correct order.
      document.querySelectorAll(`.tiles-setup .tile[data-color="${player.color}"]`).forEach(tile => {
        var index = parseInt(tile.dataset.tile, 10) - 1;
        var tiles = document.querySelectorAll('.player-gameplay .tile-category');
        tiles[index].parentNode.replaceChild(tile, tiles[index]);
      });
    });

    // Remove game setup wrapper.
    document.querySelectorAll('.player-setup').forEach(el => el.parentNode.removeChild(el));

    // Show gameplay content.
    document.querySelectorAll('.player-gameplay').forEach(el => el.style.display = 'block');

    // Hide setup notice
    document.querySelector('.notice-setup').classList.remove('is-active');

    game.isSetup = false;
  }

  /**
   * Returns an array of tiles without an assigned player.
   * 
   * @return {array} tiles
   */
  getAvailableTiles() {
    return this.tiles.filter(tile => !tile.player);
  }

  getTileFromElem(elem) {
    return this.tiles.filter(tile => tile.elem == elem)[0];
  }

  handleMove(e) {
    if (!game.zwapInProgress.status) {
      const color = e.target.dataset.color;
      const move = parseInt(e.target.dataset.move);

      game.players.forEach(player => {
        if (player.color === color) {
          player.move(move);
        }
      });
    }
  }

  handleFlip(e) {
    const tile = getClosest(e.target, '.tile');

    // If not doing zwap, and not in game setup, flip tile like normal.
    if (!game.isSetup) {
      if (!game.zwapInProgress.status) {
        tile.classList.contains('flipped') ? tile.classList.remove('flipped') : tile.classList.add('flipped');

        // If doing zwap only do something if tile is a category tile.
      } else if (tile.classList.contains('tile-category')) {
        const tileClone = tile.cloneNode(true);
        const givingTile = document.querySelector('.tile-giving');
        const takingTile = document.querySelector('.tile-taking');

        if (tile.dataset.color === game.zwapInProgress.player.color) {
          // Add to giving
          game.zwapInProgress.givingTile = game.getTileFromElem(tile);
          givingTile.innerHTML = '';
          givingTile.appendChild(tileClone);
        } else {
          // Add to taking.
          game.zwapInProgress.takingTile = game.getTileFromElem(tile);
          takingTile.innerHTML = '';
          takingTile.appendChild(tileClone);
        }
      }
    }
  }

  handleZwap(e) {
    const elem = getClosest(e.target, '[data-zwap]');
    const player = game.players.filter(player => player.color == elem.dataset.color)[0];

    // Check if player has already zwapped.
    if (player.zwapTiles > 0 && game.zwapInProgress.status === false) {
      game.zwapInProgress.player = player;
      game.zwapInProgress.status = true;
      game.toggleNotice();
    }
  }

  toggleNotice() {
    this.notice.classList.contains('is-active') ? this.notice.classList.remove('is-active') : this.notice.classList.add('is-active');
  }

  confirmZwap() {
    if (game.zwapInProgress.status && game.zwapInProgress.givingTile && game.zwapInProgress.takingTile) {
      game.zwapInProgress.givingTile.zwap(game.zwapInProgress.takingTile);
      game.endZwap();
    }
  }

  cancelZwap(e) {
    const zwapTile = document.querySelector(`[data-zwap][data-color=${game.zwapInProgress.player.color}]`);
    zwapTile.classList.remove('flipped');
    game.endZwap();
  }

  endZwap() {
    const givingTile = document.querySelector('.tile-giving');
    const takingTile = document.querySelector('.tile-taking');
    givingTile.innerHTML = '';
    takingTile.innerHTML = '';

    game.zwapInProgress.status = false;
    game.toggleNotice();
  }
}

class Pawn {
  /**
   * @param {String} name Name of the player
   * @param {String} color Color
   */
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.space = 0;
    this.elem = document.querySelector(`.pawn[data-color='${this.color}']`);
    this.points = 0;
    this.zwapTiles = 1;
    this.bezzerwizzerTiles = 2;
  }

  /**
   * @return {array} Array of tile assigned to this player
   */
  get tiles() {
    return game.tiles.filter(tile => tile.player == this);
  }

  /**
   * Assign each player 4 tiles.
   */
  drawTiles() {
    while (this.tiles.length < 4) {
      const availableTiles = game.getAvailableTiles();
      const tile = availableTiles[Math.floor(Math.random() * availableTiles.length)];

      tile.player = this;
      tile.position = this.tiles.length - 1;
    }

    this.tiles.forEach(tile => tile.init());
  }

  /**
   * Move pawn.
   * @param  {Number} spaces Amount of spaces to move
   */
  move(spaces) {
    this.space = this.space + spaces;

    // Reset to first spot if negative or if trying to go around
    // the board again.
    if (this.space < 0 || this.space == 20) {
      this.space = 0;
    }

    game.spaces[this.space].appendChild(this.elem);
  }
}

class Tile {
  /**
   * @param {String} name Name of the tile
   * @param {Pawn|Boolean} player Player this tile belongs to
   */
  constructor(name, player = false) {
    this.name = name;
    this.player = player;
    this.position = 0;
    this.elem = false;
    this.slug = name.toLowerCase().replace(/& /g, '').replace(/ /g, '-');
    this.icon = `icons/${this.slug}.png`;
  }

  init() {
    this.elem = document.querySelectorAll(`.tile-category[data-color=${this.player.color}]`)[this.position];
    this.render();
  }

  /**
   * Updates the DOM with the new tile location.
   */
  render() {
    this.elem.childNodes[0].setAttribute('src', this.icon);
  }

  /**
   * Swap a tile with another tile.
   * 
   * @param  {Tile} tile Tile to switch with.
   */
  zwap(tile) {
    // Swap tile owners & tile positions.
    [this.player, tile.player] = [tile.player, this.player];
    [this.position, tile.position] = [tile.position, this.position];
    [this.elem, tile.elem] = [tile.elem, this.elem];

    tile.render();
    this.render();
  }

}

// Create pawns.
player1 = new Pawn("Green Player", "green", 1),
  player2 = new Pawn("Blue Player", "blue", 1),
  player3 = new Pawn("Red Player", "red", 1),
  player4 = new Pawn("Yellow Player", "yellow", 1)

// Create game.
const game = new Game([player1, player2, player3, player4]);
game.initGame();