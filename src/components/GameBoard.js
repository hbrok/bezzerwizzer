import React from 'react';
import GameSpace from './GameSpace';

// GameBoard.propTypes = {
    // players: React.propTypes.object.isRequired,
// }

class GameBoard extends React.Component {
    render() {
        const { players } = this.props;
        const spaces = 20;

        return(
                <div className="play-area">
                    <div className="board">
                        {[...Array(spaces)].map((e, i) => <GameSpace players={players} key={i} space={i} />)}
                        <div className="title">bezzerwizzer</div>
                    </div>
                </div>
        );
    }
}

export default GameBoard;
