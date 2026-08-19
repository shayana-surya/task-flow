import { dehydrate } from "@tanstack/react-query";
import { TaskBoard } from "@/components/TaskBoard";
import { trpc, getQueryClient } from "@/trpc/server";
import { HydrateClient } from "@/trpc/hydrate-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.task.list.queryOptions()
  );

  const state = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full px-4 py-6 sm:px-8 sm:py-8">
      <HydrateClient state={state}>
        <TaskBoard />
      </HydrateClient>
    </main>
  );
}