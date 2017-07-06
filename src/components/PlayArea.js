import React from 'react';
import tiles from './../data';

import PlayerCard from './PlayerCard';

// PlayArea.propTypes = {};

class PlayArea extends React.Component {
    constructor() {
        super();

        this.filterTiles = this.filterTiles.bind(this);
        this.flipCategoryTile = this.flipCategoryTile.bind(this);
        this.flipZwapTile = this.flipZwapTile.bind(this);
        this.flipBezzerwizzerTile = this.flipBezzerwizzerTile.bind(this);

        // get initial state
        this.state = {
            players: {
                green: {
                    color: 'green',
                    name: 'Player 1'
                },
                red: {
                    color: 'red',
                    name: 'Player 2'
                },
                blue: {
                    color: 'blue',
                    name: 'Player 3'
                },
                yellow: {
                    color: 'yellow',
                    name: 'Player 4'
                }
            },
            tiles: tiles,
        };
    }

    flipCategoryTile(key) {
        console.log('cat');
    }

    flipZwapTile(key) {
        console.log('zwap');
    }

    flipBezzerwizzerTile(key) {
        console.log('bezzerwizzer');

    }

    filterTiles(color) {
        let playerTiles = [];

        Object.entries(tiles)
                .forEach((entry) => {
                    const [key, value] = entry;
                    // console.log(`${key}: ${value.player}`);
                    
                    if (value.player === color) {
                        playerTiles.push(tiles[key]);
                    }
                });

        return playerTiles;
    }

    render() {
        return(
            <div className="players">
                { 
                    Object
                        .keys(this.state.players)
                        .map(playerKey => <PlayerCard
                                            key={playerKey}
                                            color={playerKey}
                                            name={this.state.players[playerKey].name}
                                            tiles={this.filterTiles(this.state.players[playerKey].color)}
                                            flipCategoryTile={this.flipCategoryTile}
                                            flipZwapTile={this.flipZwapTile}
                                            flipBezzerwizzerTile={this.flipBezzerwizzerTile} />)
                }
            </div>
        )
    }
}

export default PlayArea;
