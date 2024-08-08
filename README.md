# React Event Bus

Use event bus to communicate between siblings

Why?

- Children can communicate with each other without parent knowing and get rid of massive `onXXXX` props
- Scalable
- Suitable for apps without state management libray

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
