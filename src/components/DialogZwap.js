import React from 'react';

import Dialog from './Dialog';

class DialogZwap extends React.Component {
    render() {
        return(
            //  const {} = this.props;

             <Dialog
                title={ 'Choose tiles to zwap.' }
                content={
                    <div>
                        <div className="tile-placeholder-wrapper">
                            <div className="tile tile-placeholder tile-giving"></div>
                            <div className="tile-placeholder-title">Yours</div>
                        </div>

                        <div className="tile-placeholder-wrapper">
                            <div className="tile tile-placeholder tile-taking"></div>
                            <div className="tile-placeholder-title">Theirs</div>
                        </div>
                    </div>
                }
                buttonConfirm={ { content: 'Zwap!', action: () => { console.log('zwap') } } }
                buttonCancel={ { content: 'Cancel', action: () => { console.log('cancel') } } }
              />
        );
    }
}

export default DialogZwap;
