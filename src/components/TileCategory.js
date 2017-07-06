import React from 'react';
import Tile from './Tile';

// TileCategory.propTypes = {
//     imageSrc: React.propTypes.string.isRequired,
//     name: React.propTypes.string.isRequired,
// }

class TileCategory extends React.Component {
    render() {
        const { imageSrc, name } = this.props;
        const content = <img src={imageSrc} alt={name} />;

        return (
            <Tile 
                type="category"
                content={content}
                flipped={false}
            />
        );
    }
}

export default TileCategory;
