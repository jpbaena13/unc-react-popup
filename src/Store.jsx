import { EventEmitter } from 'events';

import Constants from './Constants';

export default class Store extends EventEmitter {
  constructor(props) {
    super(props);

    this.id = 0; // Autoincrement id
    this.popup = null; // The popup id that is currently open
    this.popups = {}; // Set of registered popups
    this.queue = []; // Queue of popups to show in sequence.
  }

  /**
   * Returns the id for the next popup
   *
   * @return {int} Id for the next popup
   */
  getId() {
    this.id += 1;
    return `id_${this.id}`;
  }

  /**
   * Adds id value to the popup and register this in the objects store.
   *
   * @param  {Object} popup Settings for the popup
   *
   * @return {Object}       The settings popup including the autoincremental id
   */
  openPopup(popup) {
    this.popups[popup.id] = popup;

    if (this.popup) {
      const currentPopup = this.popup;
      this.popup = null;
      this.queue.push(currentPopup);
      this.queue.push(popup.id);
    } else {
      this.queue.push(popup.id);
    }

    this.nextPopup();
  }

  /**
   * Closes the current popup and loads the next popup from queue.
   *
   * @return {int} The closed popup id.
   */
  closePopup() {
    if (!this.popup) {
      return false;
    }

    const id = this.popup;

    this.popup = null;
    this.emit(Constants.CLOSE, id);
    this.nextPopup();

    return id;
  }

  /**
   * Returns the current popup
   *
   * @return {Object} The current popup
   */
  currentPopup() {
    return this.popups[this.popup];
  }

  /**
   * Actives the next popup to show from queue
   *
   * @return {boolean} True if there is a popup within queue, False otherwise
   */
  nextPopup() {
    if (this.popup || this.queue.length < 1) {
      return false;
    }

    this.popup = this.queue.pop();
    this.emit(Constants.OPEN, this.popup);

    return true;
  }

  /**
   * Clear the queue array
   */
  clearQueue() {
    this.queue = [];
  }
}
