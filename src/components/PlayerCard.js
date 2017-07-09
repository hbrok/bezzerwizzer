import React from 'react';
import TileBezzerwizzer from './TileBezzerwizzer';
import TileZwap from './TileZwap';
import TileCategory from './TileCategory';
import PlayerMoveButton from './PlayerMoveButton';

// PlayerCard.propTypes = {
//     tiles: React.propTypes.object.isRequired,
//     player: React.propTypes.object.isRequired,
//     flipCategoryTile: React.propTypes.func.isRequired,
//     flipZwapTile: React.propTypes.func.isRequired,
//     flipBezzerwizzerTile: React.propTypes.func.isRequired,
// }

class PlayerCard extends React.Component {
    render() {
        const { tiles, movePlayer, flipCategoryTile, flipZwapTile, flipBezzerwizzerTile } = this.props;
        const { name, color, zwap, bezzerwizzer1, bezzerwizzer2 } = this.props.player;

        return(
            <div className="player-actions">
                <span className="player-name" contentEditable>{name}</span>
                {/*<button data-color={color} data-move="1" title="Move forwards one space">+</button>
                <button data-color={color} data-move="-1" title="Move backwards one space">-</button>*/}
                <PlayerMoveButton
                    player={this.props.player}
                    moveAmount={1}
                    movePlayer={movePlayer}
                    label={'Move forwards one space'}
                    content={'+'} />

                <PlayerMoveButton
                    player={this.props.player}
                    moveAmount={-1}
                    movePlayer={movePlayer}
                    label={'Move backwards one space'}
                    content={'-'} />

                <div className="tiles">
                    <TileZwap color={color} flipped={!zwap} onClick={flipZwapTile} />
                    <TileBezzerwizzer color={color} flipped={!bezzerwizzer1} tile={1} onClick={flipBezzerwizzerTile} />
                    <TileBezzerwizzer color={color} flipped={!bezzerwizzer2} tile={2} onClick={flipBezzerwizzerTile} />
                    {tiles.map(tile => <TileCategory key={tile.name} name={tile.name} imageSrc={tile.image} flipped={tile.flipped} onClick={flipCategoryTile} />)}
                </div>
            </div>
        );
    }
}

export default PlayerCard;
