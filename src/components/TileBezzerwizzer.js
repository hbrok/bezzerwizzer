import React from 'react';
import Tile from './Tile';

// TileBezzerwizzer.propTypes = {
//     color: React.propTypes.string.isRequired,
// }

class TileBezzerwizzer extends React.Component {
    render() {
        const content = <span>b</span>;
        const color = this.props.color;

        return (
            <Tile 
                type="bezzerwizzer"
                content={content}
                flipped={false}
                color={color}
            />
        );
    }
}

export default TileBezzerwizzer;
