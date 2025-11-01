/**
 * @callback RequestAnimationFrameStateCallback
 * @param {*} ctx
 * @param {RequestAnimationFrameLoop} loop
 * @param {number} timestamp
 */

export default class RequestAnimationFrameLoop {
  #loopID = null;
  #ctx;
  #startedCB = Function.prototype;
  #eachCB = Function.prototype;
  #stoppedCB = Function.prototype;

  #rAFCallback = (timestamp) => {
    this.#loopID = requestAnimationFrame(this.#rAFCallback);
    this.#eachCB(this.#ctx, this, timestamp);
  };

  constructor(ctx) {
    this.#ctx = ctx;
  }

  /**
   * @param {RequestAnimationFrameStateCallback} cb
   * @returns {RequestAnimationFrameLoop}
   */
  started(cb) {
    this.#startedCB = cb;
    return this;
  }

  /**
   * @param {RequestAnimationFrameStateCallback} cb
   * @returns {RequestAnimationFrameLoop}
   */
  each(cb) {
    this.#eachCB = cb;
    return this;
  }

  /**
   * @param {RequestAnimationFrameStateCallback} cb
   * @returns {RequestAnimationFrameLoop}
   */
  stopped(cb) {
    this.#stoppedCB = cb;
    return this;
  }

  start() {
    if (this.#loopID === null) {
      this.#loopID = requestAnimationFrame(this.#rAFCallback);
      this.#startedCB(this.#ctx, this, 0);
    }
  }

  stop() {
    cancelAnimationFrame(this.#loopID);
    this.#stoppedCB(this.#ctx, this, 0);
    this.#loopID = null;
  }
}
