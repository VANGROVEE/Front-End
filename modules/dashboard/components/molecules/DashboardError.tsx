import { Button } from "@/components/ui/button";

export const DashboardError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="h-[70vh] w-full flex flex-col items-center justify-center bg-red-50/50 rounded-[3.5rem] border-2 border-dashed border-red-200">
    <p className="text-red-500 font-bold mb-4 text-lg text-center px-4">
      Ouch! Gagal mengambil data dari sensor satelit.
    </p>
    <Button onClick={onRetry} variant="destructive" className="rounded-2xl">
      Coba Hubungkan Kembali
    </Button>
  </div>
);
