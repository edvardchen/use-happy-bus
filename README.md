# React Event Bus

Use event bus to communicate between siblings

Why?

- Children can communicate with each other without parent knowing
- Scalable
- Don't use this helper if you already have state management library

## Code

```jsx
import React, { useEffect } from "react";

import { Provider, useEmit, useListen } from "PLZ_COPY_SOURCE_CODE";

function ChildA() {
  const emit = useEmit();
  const onPress = () => {
    emit("EVENT_A");
  };
  return null;
}
function ChildB() {
  const { listen } = useEventBus();

  useListen("EVENT_A", () => {
    // do some thing
  });

  return null;
}

function Parent() {
  return (
    <>
      <Provider>
        <ChildA />
        <ChildB />
      </Provider>
    </>
  );
}
```
