## Request animation frame loop

### Installation

```sh
npm install request-animation-frame-loop
```

### Usage

```js
  import RequestAnimationFrameLoop from 'request-animation-frame-loop';

  function onStartCB(ctx, loop, timestamp) {
    // do something when the loop is started
  }
  
  function onEachCB(ctx, loop, timestamp) {
    // do something on each iteration

    if (/* certain condition */) {
      loop.stop();
    }
  }

  function afterAllCB(timestamp) {
    // do something after all onEachCB calls of all instances
  }
  
  function onStopCB(ctx, loop, timestamp) {
    // do something when the loop is stopped
  }

  const ctx = {
    // a context to be passed in callbacks
  };

  RequestAnimationFrameLoop.afterAll(afterAllCB);

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

  // ... 
  // ... 
  
  rafLoop.isRunning();

```