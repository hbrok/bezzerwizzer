import React from 'react';

class Dialog extends React.Component {
    render() {
        const { title, content, buttonConfirm, buttonCancel, isShown } =  this.props;

        return(
             <div className="notice notice-zwap is-active" aria-hidden={ 'false' }>
                <p className="notice-text">{ title }</p>

                <div className="notice-wrapper">
                    { content }
                </div>

                <button
                    className="notice-button button-confirm"
                    onClick={ buttonConfirm.action }>
                    { buttonConfirm.content || 'Confirm' }
                </button>

                <button
                    className="notice-button button-cancel"
                    onClick={ buttonCancel.action }>
                    { buttonCancel.content || 'Cancel' }
                </button>
            </div>
        );
    }
}

export default Dialog;
