"use client";

import {
  HydrationBoundary,
  type DehydratedState,
} from "@tanstack/react-query";

// Faz a integração entre os dados do servidor e o TanStack Query no cliente.

export function HydrateClient({
  state,
  children,
}: {
  state: DehydratedState;
  children: React.ReactNode;
}) {
  return (
    <HydrationBoundary state={state}>
      {children}
    </HydrationBoundary>
  );
}