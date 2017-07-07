import React from 'react';
import Tile from './Tile';

// TileBezzerwizzer.propTypes = {
//     color: React.propTypes.string.isRequired,
//     onClick: React.propTypes.func.isRequired,
// }

class TileBezzerwizzer extends React.Component {
    render() {
        const { color, bezzerwizzer, onClick } = this.props;
        const content = <span>b</span>;

        return (
            <Tile 
                type="bezzerwizzer"
                content={content}
                flipped={!bezzerwizzer}
                color={color}
                onClick={() => onClick(color)}
            />
        );
    }
}

export default TileBezzerwizzer;
