/**
 * @callback RequestAnimationFrameStateCallback
 * @param {*} ctx
 * @param {RequestAnimationFrameLoop} loop
 * @param {number} timestamp
 */
export default class RequestAnimationFrameLoop {
    constructor(ctx: any);
    /**
     * @param {RequestAnimationFrameStateCallback} cb
     * @returns {RequestAnimationFrameLoop}
     */
    started(cb: RequestAnimationFrameStateCallback): RequestAnimationFrameLoop;
    /**
     * @param {RequestAnimationFrameStateCallback} cb
     * @returns {RequestAnimationFrameLoop}
     */
    each(cb: RequestAnimationFrameStateCallback): RequestAnimationFrameLoop;
    /**
     * @param {RequestAnimationFrameStateCallback} cb
     * @returns {RequestAnimationFrameLoop}
     */
    stopped(cb: RequestAnimationFrameStateCallback): RequestAnimationFrameLoop;
    start(): void;
    stop(): void;
    /**
     * @returns {boolean}
     */
    isRunning(): boolean;
}
export type RequestAnimationFrameStateCallback = (ctx: any, loop: RequestAnimationFrameLoop, timestamp: number) => any;
