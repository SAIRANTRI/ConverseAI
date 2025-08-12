import { LoadingState } from "@/components/loading-state";
import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";

const Page = async () => {
  const querClient = getQueryClient();
  void querClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(querClient)}>
      <Suspense
        fallback={
          <AgentsViewLoading/>
        }
      >
        <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
        </ErrorBoundary>
        
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
