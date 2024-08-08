import { expect, test, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useEmit, useListen } from "../src";
import { useEffect } from "react";
import { Parent } from "./fixtures/Parent";

test("use global context", async () => {
  const EVENT = "EVENT_AA";
  const message = "hello_world";
  const listener = mock(() => {});
  renderHook(
    () => {
      const emit = useEmit();
      useListen(EVENT, listener);
      useEffect(() => {
        emit(EVENT, message);
      }, []);
    },
    { initialProps: {} },
  );
  expect(listener).toBeCalledWith(message);
});

test("use isolated context", async () => {
  render(<Parent />);
  await screen.findByText("hello_world");
});
