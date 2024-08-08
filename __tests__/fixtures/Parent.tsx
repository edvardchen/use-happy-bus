import { useEffect, useState } from "react";
import { IsolatedBus as Provider, useEmit, useListen } from "../../src";

function ChildA() {
  const emit = useEmit();
  useEffect(() => {
    emit("EVENT_A", "hello_world");
  }, []);
  return null;
}
function ChildB() {
  const [message, setMessage] = useState("");
  useListen("EVENT_A", (m) => {
    setMessage(m as string);
  });
  return <span>{message}</span>;
}

export function Parent() {
  return (
    <>
      <Provider>
        <ChildB />
        <ChildA />
      </Provider>
    </>
  );
}
