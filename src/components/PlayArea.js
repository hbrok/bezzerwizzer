import React from 'react';
import tiles from './../data1';

import PlayerCard from './PlayerCard';
import GameBoard from './GameBoard';

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
                    bezzerwizzer: 2
                },
                red: {
                    color: 'red',
                    name: 'Player 2',
                    space: 0,
                    zwap: true,
                    bezzerwizzer: 2
                },
                blue: {
                    color: 'blue',
                    name: 'Player 3',
                    space: 0,
                    zwap: true,
                    bezzerwizzer: 2
                },
                yellow: {
                    color: 'yellow',
                    name: 'Player 4',
                    space: 0,
                    zwap: true,
                    bezzerwizzer: 2
                }
            },
            tiles: tiles,
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

    flipBezzerwizzerTile(color) {
        const players = {...this.state.players};
        players[color].bezzerwizzer === 2 ? players[color].bezzerwizzer = 1 : players[color].bezzerwizzer = 0;
        this.setState({ players });
    }

    render() {
        return(
            <div className="game-section">
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
                                                flipBezzerwizzerTile={this.flipBezzerwizzerTile} />)
                    }
                </div>

                <GameBoard
                    players={this.state.players} />
            </div>
        )
    }
}

export default PlayArea;
