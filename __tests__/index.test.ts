import { expect, test, mock } from "bun:test";
import { renderHook } from "@testing-library/react-hooks";
import { useEmit, useListen } from "../src";
import { useEffect } from "react";

test("should scan tn first", async () => {
  const EVENT = "EVENT_AA";
  const message = "hello_world";
  const listener = mock(() => {});
  renderHook(
    () => {
      const emit = useEmit();
      useListen(EVENT, listener);
      useEffect(() => {
        console.log("call emit");
        emit(EVENT, message);
      }, []);
    },
    { initialProps: {} }
  );
  console.log("ready to assert");
  expect(listener).toBeCalledWith(message);
});
