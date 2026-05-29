import { Skeleton } from "@/components/ui/skeleton";

export const DetailSkeleton = () => (
  <div className="border-t border-slate-100 bg-white px-6 py-8 space-y-6">
    <div className="flex justify-between items-center">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <Skeleton className="h-20 w-full rounded-2xl" />
    <Skeleton className="h-32 w-full rounded-xl" />
  </div>
);
