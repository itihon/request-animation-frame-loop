/**
 * @callback RequestAnimationFrameStateCallback
 * @param {*} ctx
 * @param {RequestAnimationFrameLoop} loop
 * @param {number} timestamp
 */

export default class RequestAnimationFrameLoop {
  #ctx;
  #startedCB = Function.prototype;
  #eachCB = Function.prototype;
  #stoppedCB = Function.prototype;
  static #afterAllCB = Function.prototype;
  static #loopID = null;

  /**
   * @type {Set<RequestAnimationFrameLoop>}
   */
  static #runningInstances = new Set();

  static #flushEach(timestamp) {
    for (let loop of RequestAnimationFrameLoop.#runningInstances) {
      loop.#eachCB(loop.#ctx, loop, timestamp);
    }

    RequestAnimationFrameLoop.#afterAllCB(timestamp);

    if (RequestAnimationFrameLoop.#runningInstances.size) {
      RequestAnimationFrameLoop.#loopID = requestAnimationFrame(
        RequestAnimationFrameLoop.#flushEach,
      );
    }
  }

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
    RequestAnimationFrameLoop.#runningInstances.add(this);

    if (RequestAnimationFrameLoop.#loopID === null) {
      RequestAnimationFrameLoop.#loopID = requestAnimationFrame(
        RequestAnimationFrameLoop.#flushEach,
      );
    }

    this.#startedCB(this.#ctx, this, 0);
  }

  stop() {
    RequestAnimationFrameLoop.#runningInstances.delete(this);

    if (!RequestAnimationFrameLoop.#runningInstances.size) {
      cancelAnimationFrame(RequestAnimationFrameLoop.#loopID);
      RequestAnimationFrameLoop.#loopID = null;
    }

    this.#stoppedCB(this.#ctx, this, 0);
  }

  /**
   * @returns {boolean}
   */
  isRunning() {
    return (
      RequestAnimationFrameLoop.#loopID !== null &&
      RequestAnimationFrameLoop.#runningInstances.has(this)
    );
  }
}
