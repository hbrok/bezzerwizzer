import React from 'react';
import tiles from './../data';

import PlayerCard from './PlayerCard';

// PlayArea.propTypes = {};

class PlayArea extends React.Component {
    constructor() {
        super();

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

    render() {
        return(
            <div className="players">
                {/*<PlayerArea color="blue" />*/}
                {/*<PlayerArea color="yellow" />*/}
                {/*<PlayerArea color="green" />*/}
                {/*<PlayerArea color="red" />*/}

                {
                    Object
                        .keys(this.state.players)
                        .map(playerKey => <PlayerCard
                                        key={playerKey}
                                        color={playerKey}
                                        name={this.state.players[playerKey].name}
                                        tiles={tiles} />)
                }
            </div>
        )
    }
}

export default PlayArea;
