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
  static #afterAllCB = Function.prototype;
  static #afterAllRegistry = new Map();
  static #runningLoopsRegistry = new Set();

  static #afterAllCallback(timestamp) {
    RequestAnimationFrameLoop.#afterAllCB(timestamp);
    RequestAnimationFrameLoop.#afterAllRegistry.clear();
  }

  #rAFCallback = (timestamp) => {
    this.#loopID = requestAnimationFrame(this.#rAFCallback);
    RequestAnimationFrameLoop.#runningLoopsRegistry.add(this);
    this.#eachCB(this.#ctx, this, timestamp);

    const afterAllRegistry = RequestAnimationFrameLoop.#afterAllRegistry;
    let nextAfterAllRAFID = afterAllRegistry.get(timestamp);

    cancelAnimationFrame(nextAfterAllRAFID);

    if (RequestAnimationFrameLoop.#runningLoopsRegistry.size) {
      afterAllRegistry.set(
        timestamp,
        requestAnimationFrame(RequestAnimationFrameLoop.#afterAllCallback),
      );
    }
  };

  /**
   * @param {FrameRequestCallback} cb
   */
  static afterAll(cb) {
    this.#afterAllCB = cb;
  }

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
      RequestAnimationFrameLoop.#runningLoopsRegistry.add(this);
      this.#startedCB(this.#ctx, this, 0);

      const afterAllRegistry = RequestAnimationFrameLoop.#afterAllRegistry;
      let nextAfterAllRAFID = afterAllRegistry.get(null);

      cancelAnimationFrame(nextAfterAllRAFID);
      afterAllRegistry.set(
        null,
        requestAnimationFrame(RequestAnimationFrameLoop.#afterAllCallback),
      );
    }
  }

  stop() {
    cancelAnimationFrame(this.#loopID);
    RequestAnimationFrameLoop.#runningLoopsRegistry.delete(this);
    this.#stoppedCB(this.#ctx, this, 0);
    this.#loopID = null;
  }

  /**
   * @returns {boolean}
   */
  isRunning() {
    return this.#loopID !== null;
  }
}
