import React from 'react';

import Store from './Store';

import Constants from './Constants';

// Init settings for a popup
const initPopup = {
  id: null,
  title: null,
  content: null,
  data: null,
  btnAccept: false,
  btnCancel: false,
  width: 'auto',
  height: 'auto',
  minWidth: '400px',
  maxWidth: '95%',
  classes: null,
  className: null,
  onClickAccept: () => true,
  onClickCancel: () => true,
  onOpenPopup: () => {},
  onClosePopup: () => {}
};

// Store pattern for popups
const store = new Store();

class Popup extends React.Component {
  static defaultProps = {
    className: 'unc-popup',
    txtAccept: 'Accept',
    txtCancel: 'Cancel'
  };

  constructor(props) {
    super(props);

    this.state = {
      popup: null
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  /**
   * Lifecycle method
   */
  componentDidMount() {
    store.on(Constants.OPEN, this.onOpen);
    store.on(Constants.CLOSE, this.onClose);
  }

  /**
   * Lifecycle method
   */
  componentWillUpdate() {
    if (this.state.popup) {
      this.state.popup.onClosePopup();
    }
  }

  /**
   * Lifecycle method
   */
  componentDidUpdate() {
    if (this.state.popup) {
      this.state.popup.onOpenPopup();
    }
  }

  /**
   * Initializes a popup from content param and call to Store.
   *
   * @param  {Object/String} content Setting for popup
   */
  static open(settings) {
    let popup = null;

    if (typeof settings === 'string') {
      popup = { ...initPopup, ...{ settings } };
    } else {
      popup = { ...initPopup, ...settings };
    }

    popup.id = store.getId();

    store.openPopup(popup);
  }

  /**
   * Closes the actived popup
   */
  static close() {
    store.closePopup();
  }

  /**
   * Sets up the popup param as popup to render.
   *
   * @param  {Object} popup Popup setting to render.
   */
  onOpen() {
    const currentPopup = store.currentPopup();
    this.setState({
      popup: currentPopup
    });
  }

  /**
   * Sets up the popup prop of the state to null
   */
  onClose() {
    this.setState({
      popup: null
    });
  }

  /**
   * Render function
   */
  render() {
    let popupWrapper = null;
    let display = 'none';
    const className = (this.state.popup && this.state.popup.className) || this.props.className;

    if (this.state.popup) {
      popupWrapper = (
        <div className={`${className}-wrapper`}
             key={this.state.popup.id}
             onClick={ e => e.stopPropagation() }
             style={{ minWidth: this.state.popup.minWidth, maxWidth: this.state.popup.maxWidth }}>

          {this.state.popup.title
            && <div className={`${className}-header`}>
                {this.state.popup.title}
              </div>
          }

          <div className={`${className}-content`}>
            {this.state.popup.content}
          </div>

          {(this.state.popup.btnAccept || this.state.popup.btnCancel)
            && <div className={`${className}-footer`}>
                {this.state.popup.btnAccept
                  && <button className={`${className}-btn-accept`}
                             onClick={e => this.state.popup.onClickAccept(e, this)}>
                        {this.props.txtAccept}
                      </button>
                }

                {this.state.popup.btnCancel
                  && <button className={`${className}-btn-cancel`}
                             onClick={this.state.popup.onClickCancel}>
                        {this.props.txtCancel}
                      </button>
                }
              </div>
          }

        </div>
      );

      display = 'flex';
    }

    return (
      <div className={`${className}-container`} style={{ display }} onClick={Popup.close}>
        <button onClick={ (e) => { e.stopPropagation(); Popup.close(); }} className={`${className}-btn-close`} />
        { popupWrapper }
      </div>
    );
  }
}

export default Popup;
