import React from 'react';

// Tile.propTypes = {
//     details: React.propTypes.object.isRequired,
//     flipped: React.propTypes.bool.isRequired,
//     type: React.propTypes.string.isRequired,
//     color: React.propTypes.string.isRequired,
//     content: React.propTypes.element.isRequired,
// }

class Tile extends React.Component {
    render() {
        const { color, flipped, type, content, onClick } = this.props;
        // const filpped = this.props.flipped;

        return(
            <button className={`tile tile-${type} ${flipped ? 'flipped' : ''}`} data-color={color} onClick={onClick}>{content}</button>
        );
    }
}

export default Tile;
