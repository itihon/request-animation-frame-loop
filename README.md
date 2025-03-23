## Request animation frame loop

### Usage

```js
  function onStartCB(ctx, loop, timestamp) {
    // do something when a loop is started
  }
  
  function onEachCB(ctx, loop, timestamp) {
    // do something on each iteration

    if (/* certain condition */) {
      loop.stop();
    }
  }
  
  function onStopCB(ctx, loop, timestamp) {
    // do something when a loop is stopped
  }

  const ctx = {
    // a context to be passed in callbacks
  };

  const rafLoop = new RequestAnimationFrameLoop(ctx)
    .started(onStartCB)
    .each(onEachCB)
    .stopped(onStopCB);

  // ... 
  // ... 

  rafLoop.start();

  // ... 
  // ... 
  
  rafLoop.stop();

```