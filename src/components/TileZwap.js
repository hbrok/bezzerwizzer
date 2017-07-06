import React from 'react';
import Tile from './Tile';

// TileZwap.propTypes = {
//     color: React.propTypes.string.isRequired,
// }

class TileZwap extends React.Component {
    render() {
        const content = <span>z</span>;
        const color = this.props.color;

        return (
            <Tile 
                type="zwap"
                content={content}
                flipped={false}
                color={color}
            />
        );
    }
}

export default TileZwap;
