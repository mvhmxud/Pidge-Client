import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="w-full h-full flex flex-col border-l">
      {/* Chat header skeleton */}
      <div className="border-b p-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Messages area skeleton */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Incoming message skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-full mt-1" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>

        {/* Outgoing message skeleton */}
        <div className="flex justify-end">
          <div className="space-y-2 max-w-xs">
            <Skeleton className="h-4 w-32 ml-auto" />
            <Skeleton className="h-12 w-64" />
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex items-center space-x-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>
        </div>
      </div>

      {/* Message input skeleton */}
      <div className="border-t p-4">
        <div className="relative flex items-center">
          <Skeleton className="h-10 w-full rounded-full" />
          <div className="absolute right-2 flex space-x-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
