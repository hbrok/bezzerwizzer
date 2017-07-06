import React from 'react';
import Tile from './Tile';

// TileZwap.propTypes = {
//     color: React.propTypes.string.isRequired,
// }

class TileZwap extends React.Component {
    render() {
        const { color, onClick } = this.props;
        const content = <span>z</span>;

        return (
            <Tile 
                type="zwap"
                content={content}
                flipped={false}
                color={color}
                onClick={onClick}
            />
        );
    }
}

export default TileZwap;
