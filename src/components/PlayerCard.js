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
        const { name, color, zwap, bezzerwizzer } = this.props.player;

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
                    <TileZwap color={color} zwap={zwap} onClick={flipZwapTile} />
                    <TileBezzerwizzer color={color} bezzerwizzer={bezzerwizzer === 2} onClick={flipBezzerwizzerTile} />
                    <TileBezzerwizzer color={color} bezzerwizzer={bezzerwizzer === 1 || bezzerwizzer === 2} onClick={flipBezzerwizzerTile} />
                    {tiles.map(tile => <TileCategory key={tile.name} name={tile.name} imageSrc={tile.image} flipped={tile.flipped} onClick={flipCategoryTile} />)}
                </div>
            </div>
        );
    }
}

export default PlayerCard;
