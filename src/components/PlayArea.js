import React from 'react';
import tiles from './../data1';

import PlayerCard from './PlayerCard';
import GameBoard from './GameBoard';
import DialogZwap from './DialogZwap';

// PlayArea.propTypes = {};

class PlayArea extends React.Component {
    constructor() {
        super();

        this.movePlayer = this.movePlayer.bind(this);
        this.flipCategoryTile = this.flipCategoryTile.bind(this);
        this.flipZwapTile = this.flipZwapTile.bind(this);
        this.flipBezzerwizzerTile = this.flipBezzerwizzerTile.bind(this);

        // get initial state
        this.state = {
            players: {
                green: {
                    color: 'green',
                    name: 'Player 1',
                    space: 0,
                    zwap: true,
                    bezzerwizzer1: true,
                    bezzerwizzer2: true,
                },
                red: {
                    color: 'red',
                    name: 'Player 2',
                    space: 0,
                    zwap: true,
                    bezzerwizzer1: true,
                    bezzerwizzer2: true,
                },
                blue: {
                    color: 'blue',
                    name: 'Player 3',
                    space: 0,
                    zwap: true,
                    bezzerwizzer1: true,
                    bezzerwizzer2: true,
                },
                yellow: {
                    color: 'yellow',
                    name: 'Player 4',
                    space: 0,
                    zwap: true,
                    bezzerwizzer1: true,
                    bezzerwizzer2: true,
                }
            },
            tiles: tiles,
            zwapInProgress: false,
        };
    }

    movePlayer(color, moveAmount) {
        const players = {...this.state.players};
        players[color].space += moveAmount;
        players[color].space > 19 || players[color].space < 0 ? players[color].space = 0 : '';
        this.setState({ players });
    }

    flipCategoryTile(name) {
        const tiles = Array.from(this.state.tiles);
        const tile = tiles.filter(tile => tile.name === name)[0];

        tile.flipped = !tile.flipped;
        this.setState({ tiles });
    }

    flipZwapTile(color) {
        const players = {...this.state.players};
        players[color].zwap = false;
        this.setState({ players });
    }

    flipBezzerwizzerTile(color, tile) {
        const players = {...this.state.players};
        tile === 1 ? players[color].bezzerwizzer1 = false : '';
        tile === 2 ? players[color].bezzerwizzer2 = false : '';
        this.setState({ players });
    }

    render() {
        return(
            <div className="game-section">
                <DialogZwap isOpen={this.state.zwapInProgress} />

                <div className="players">
                    { 
                        Object
                            .keys(this.state.players)
                            .map(playerKey => <PlayerCard
                                                key={playerKey}
                                                player={this.state.players[playerKey]}
                                                tiles={this.state.tiles.filter(tile => tile.player === this.state.players[playerKey].color)}
                                                movePlayer={this.movePlayer}
                                                flipCategoryTile={this.flipCategoryTile}
                                                flipZwapTile={this.flipZwapTile}
                                                flipBezzerwizzerTile={this.flipBezzerwizzerTile}
                                                zwapInProgress={this.state.zwapInProgress} />)
                    }
                </div>

                <GameBoard
                    players={this.state.players} />
            </div>
        )
    }
}

export default PlayArea;
