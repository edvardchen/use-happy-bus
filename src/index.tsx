import React, { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

type EventBusContextType = {
  emit(event: string, payload?: unknown): void;
  listen(event: string, callback: (payload?: unknown) => void): () => void;
};
const globalEventBus = createEventBus("global");
const EventBusContext = createContext<EventBusContextType>(globalEventBus);

function createEventBus(name?: string) {
  const eventMap = new Map<string, ((payload?: unknown) => void)[]>();
  return {
    /**
     * For debug purpose
     */
    name,
    emit(event: string, payload?: unknown) {
      eventMap.get(event)?.forEach((callback) => callback(payload));
    },
    listen(event: string, callback: (payload: unknown) => void) {
      let found = eventMap.get(event);
      if (!found) {
        found = [];
        eventMap.set(event, found);
      }
      found.push(callback);
      return () => {
        eventMap.set(
          event,
          eventMap.get(event)?.filter((item) => item !== callback) || [],
        );
      };
    },
  };
}

/**
 * Use this if you want an isolated event bus
 */
export function IsolatedBus({ children }: { children: ReactNode }) {
  const eventBusContext = useMemo(createEventBus, []);
  return (
    <EventBusContext.Provider value={eventBusContext}>
      {children}
    </EventBusContext.Provider>
  );
}

export function useEmit() {
  return useContext(EventBusContext).emit;
}

export function useListen(
  ...[event, callback]: Parameters<EventBusContextType["listen"]>
) {
  const { listen } = useContext(EventBusContext);
  useEffect(() => {
    return listen(event, callback);
  }, [event, callback]);
}
