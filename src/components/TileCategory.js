import React from 'react';
import Tile from './Tile';

// TileCategory.propTypes = {
//     imageSrc: React.propTypes.string.isRequired,
//     name: React.propTypes.string.isRequired,
//     flipped: React.propTypes.bool.isRequired,
// }

class TileCategory extends React.Component {
    render() {
        const { imageSrc, name, flipped, onClick } = this.props;
        const content = <img src={imageSrc} alt={name} />;

        // console.log(flipped);

        return (
            <Tile 
                type="category"
                content={content}
                flipped={flipped}
                onClick={() => onClick(name)}
            />
        );
    }
}

export default TileCategory;
