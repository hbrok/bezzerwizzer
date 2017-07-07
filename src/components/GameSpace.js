import React from 'react';

class GameSpace extends React.Component {
    render() {
        const { space, players } = this.props;

        return(
            <div className="space" data-space={space}>
                {
                    Object
                        .keys(players)
                        .filter(key => players[key].space === space)
                        .map(key => <div className="pawn" data-color={players[key].color}></div>)
                }
            </div>
        );
    }
}

export default GameSpace;