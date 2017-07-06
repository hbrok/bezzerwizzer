import React from 'react';
import TileBezzerwizzer from './TileBezzerwizzer';
import TileZwap from './TileZwap';
import TileCategory from './TileCategory';

// PlayerCard.propTypes = {
//     name: React.propTypes.string.isRequired,
//     color: React.propTypes.string.isRequired,
//     tiles: React.propTypes.object.isRequired,
//     flipCategoryTile: React.propTypes.func.isRequired,
//     flipZwapTile: React.propTypes.func.isRequired,
//     flipBezzerwizzerTile: React.propTypes.func.isRequired,
// }

class PlayerCard extends React.Component {
    render() {
        const { tiles, name, color, flipCategoryTile, flipZwapTile, flipBezzerwizzerTile } = this.props;

        return(
            <div className="player-actions">
                <span className="player-name" contentEditable>{name}</span>
                <button data-color="red" data-move="1" title="Move forwards one space">+</button>
                <button data-color="red" data-move="-1" title="Move backwards one space">-</button>

                <div className="tiles">
                    <TileZwap color={color} onClick={flipZwapTile} />
                    <TileBezzerwizzer color={color} onClick={flipBezzerwizzerTile} />
                    <TileBezzerwizzer color={color} onClick={flipBezzerwizzerTile} />

                    {Object.keys(tiles).map(key => <TileCategory name={tiles[key].name} imageSrc={tiles[key].image} onClick={flipCategoryTile} />)}
                </div>
            </div>
        );
    }
}

export default PlayerCard;
