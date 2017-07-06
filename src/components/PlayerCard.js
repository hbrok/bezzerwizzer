import React from 'react';
import TileBezzerwizzer from './TileBezzerwizzer';
import TileZwap from './TileZwap';
import TileCategory from './TileCategory';

// PlayerCard.propTypes = {
//     name: React.propTypes.string.isRequired,
//     color: React.propTypes.string.isRequired,
//     tiles: React.propTypes.object.isRequired,
// }

class PlayerCard extends React.Component {
    render() {
        const { tiles, name, color } = this.props;

        return(
            <div className="player-actions">
                <span className="player-name" contentEditable>{name}</span>
                <button data-color="red" data-move="1" title="Move forwards one space">+</button>
                <button data-color="red" data-move="-1" title="Move backwards one space">-</button>

                <div className="tiles">
                    <TileZwap color={color} />
                    <TileBezzerwizzer color={color} />
                    <TileBezzerwizzer color={color} />

                    {Object.keys(tiles).map(key => <TileCategory name={console.log(tiles[key].name)} imageSrc={tiles[key].image} />)}
                </div>
            </div>
        );
    }
}

export default PlayerCard;
