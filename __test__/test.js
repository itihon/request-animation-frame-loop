import RequestAnimationFrameLoop from "../lib/index.js";

const afterAllCallback = (timestamp) => {
  console.log('afterAll', timestamp);
  document.body.append('afterAll: ', timestamp, document.createElement('br'));
};

const each1 = (ctx, loop, timestamp) => {
  console.log(ctx.name, ctx.count, timestamp, document.body.getBoundingClientRect());

  if (ctx.count++ > 100) {
    loop.stop();
  }
};
;

const each2 = (ctx, loop, timestamp) => {
  console.log(ctx.name, ctx.count, timestamp, document.body.getBoundingClientRect());

  if (ctx.count++ > 100) {
    loop.stop();
  }
};

const each3 = (ctx, loop, timestamp) => {
  console.log(ctx.name, ctx.count, timestamp, document.body.getBoundingClientRect());

  if (ctx.count++ > 100) {
    loop.stop();
  }
};

const each4 = (ctx, loop, timestamp) => {
  console.log(ctx.name, ctx.count, timestamp, document.body.getBoundingClientRect());

  if (ctx.count++ > 100) {
    loop.stop();
  }
};

RequestAnimationFrameLoop.afterAll(afterAllCallback);

const rAFLoop1 = new RequestAnimationFrameLoop({ count: 0, name: 'rAFLoop_1'});
const rAFLoop2 = new RequestAnimationFrameLoop({ count: 0, name: 'rAFLoop_2'});
const rAFLoop3 = new RequestAnimationFrameLoop({ count: 0, name: 'rAFLoop_3'});
const rAFLoop4 = new RequestAnimationFrameLoop({ count: 0, name: 'rAFLoop_4'});

rAFLoop1.each(each1);
rAFLoop2.each(each2);
rAFLoop3.each(each3);
rAFLoop4.each(each4);

addEventListener('DOMContentLoaded', () => {
  rAFLoop1.start();
  rAFLoop2.start();
  rAFLoop3.start();
  rAFLoop4.start();
});