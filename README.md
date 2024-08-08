# React Event Bus

A React hook to empower React components to communicate with the siblings efficiently

Why?

- Children can communicate with each other without parent knowing
- Suitable for apps without state management libraries
- Scalable and zero dependencies

The code is quite simple. Feel free to copy [it](./src/index.tsx) directly instead of installing via npm

## Usage

```jsx
import React, { useEffect } from "react";

import { useEmit, useListen } from "PLZ_COPY_SOURCE_CODE";

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
      <ChildA />
      <ChildB />
    </>
  );
}
```

### Local event bus rather than global one

If you want to isolate the scope of an event bus, use `IsolatedBus`. So that only the children of `IsolatedBus` can communicate with each other via event bus

```jsx
import { IsolatedBus } from "PLZ_COPY_SOURCE_CODE";

function Parent() {
  return (
    <IsolatedBus>
      <ChildA />
      <ChildB />
    </IsolatedBus>
  );
}
```
