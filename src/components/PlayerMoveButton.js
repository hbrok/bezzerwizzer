import React from 'react';

class PlayerMoveButton extends React.Component {
    render() {
        const { player, movePlayer, moveAmount, label, content } = this.props;

        return(
            <button data-color={player.color} data-move={moveAmount} onClick={() => movePlayer(player.color, moveAmount)} title={label}>{content}</button>
        );
    }
}

export default PlayerMoveButton;
