"use client";

import { DeleteAlert } from "@/components/molecules/delete-alert";
import { DynamicFormDialog } from "@/components/molecules/DynamicDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  Loader2,
  Map,
  MapPinPlus,
  Plus,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { activityFormFields } from "../../const/activity-field";
import { getCycleFormFields } from "../../const/cycle-field";
import { useLandContext } from "../../context/land-context";
import { useCommodities } from "../../hooks/commodity-hook";
import { useLands } from "../../hooks/lands-hook";
import { PlantingCycle } from "../../types/cycle";
import { ActivityTimeline } from "../molecules/ActivityTimeline";
import { CycleListSidebar } from "../molecules/CycleListSidebar";
import { CycleOverviewCard } from "../molecules/CycleOverviewCard";
import { HealthHistoryCard } from "../molecules/HealthHistoryCard";
import { LandInfoCard } from "../molecules/LandInfoCard";
import { OperationsHeader } from "../molecules/OperationsHeader";
import { FormFarmerLands } from "../organisms/form-lands";
import { FormActivity } from "../organisms/FormActivity";
import { FormCycle } from "../organisms/FormCycle";

export const OperationsPage = () => {
  const [selectedLandId, setSelectedLandId] = useState<string>("");
  const [selectedCycle, setSelectedCycle] = useState<PlantingCycle | null>(
    null,
  );
  const [showGuide, setShowGuide] = useState(false);

  const { lands, isLoadingLands, landDetail, isLoadingDetail } =
    useLands(selectedLandId);

  const {
    isOpen,
    closeForm,
    handleSubmit,
    isSubmitting,
    initialData,
    openEdit,
    isOpenDelete,
    closeDelete,
    confirmDelete,
    isDeleting,
    openDelete,

    isOpenCycle,
    closeCycleForm,
    handleCycleSubmit,
    isSubmittingCycle,
    openAddCycle,
    openEditCycle,
    initialDataCycle,
    isOpenDeleteCycle,
    closeDeleteCycle,
    confirmDeleteCycle,
    isDeletingCycle,
    openDeleteCycle,

    isOpenActivity,
    closeActivityForm,
    handleActivitySubmit,
    isSubmittingActivity,
    openAddActivity,
    handleAIPredictionOnly,
  } = useLandContext();

  const { commodities } = useCommodities();
  const cycleFormFields = useMemo(
    () => getCycleFormFields(commodities),
    [commodities],
  );

  useEffect(() => {
    if (lands && lands.length === 0 && !isLoadingLands) {
      setShowGuide(true);

      // Auto-close setelah 15 detik untuk memberi waktu membaca
      const timer = setTimeout(() => {
        setShowGuide(false);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [lands, isLoadingLands]);
  useEffect(() => {
    if (lands && lands.length > 0) {
      const isStillExists = lands.some((l) => l.id === selectedLandId);
      if (!selectedLandId || !isStillExists) {
        setSelectedLandId(lands[0].id);
      }
    } else if (lands && lands.length === 0) {
      setSelectedLandId("");
    }
  }, [lands, selectedLandId]);

  const activeLand = useMemo(() => landDetail, [landDetail]);

  const allCycles = useMemo(
    () => activeLand?.planting_cycles || [],
    [activeLand],
  );

  useEffect(() => {
    if (allCycles.length > 0) {
      const isStillInList = allCycles.find((c) => c.id === selectedCycle?.id);

      if (selectedCycle && isStillInList) return;

      const priorityCycle =
        allCycles.find((c) => c.status === "PLANTING") ||
        allCycles.find((c) => c.status === "HARVESTED");

      setSelectedCycle(priorityCycle || allCycles[0]);
    } else {
      setSelectedCycle(null);
    }
  }, [allCycles, selectedCycle?.id]);

  if (isLoadingLands && !lands) {
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
        <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-2" />
        Sinkronisasi Lahan Vangrove...
      </div>
    );
  }
  const isNoLandAtAll = lands && lands.length === 0;
  // if (isNoLandAtAll) {
  //   return (
  //     <div className="min-h-[80vh] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
  //       <SpotlightCard className="max-w-2xl w-full rounded-[40px] border border-slate-100 bg-white p-10 shadow-xl">
  //         <div className="flex flex-col items-center text-center gap-6">
  //           <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-inner">
  //             <Map size={40} />
  //           </div>

  //           <div className="space-y-2">
  //             <h2 className="text-3xl font-black text-slate-800 tracking-tight">
  //               Selamat Datang di Vangrove
  //             </h2>
  //             <p className="text-slate-500 font-medium">
  //               Mulailah digitalisasi pertanian Anda dengan 3 langkah mudah:
  //             </p>
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-4">
  //             {[
  //               {
  //                 step: "01",
  //                 title: "Daftar Lahan",
  //                 desc: "Masukkan lokasi dan luas lahan Anda.",
  //               },
  //               {
  //                 step: "02",
  //                 title: "Pilih Komoditas",
  //                 desc: "Tentukan tanaman yang akan ditanam.",
  //               },
  //               {
  //                 step: "03",
  //                 title: "Lakukan Aktivitas",
  //                 desc: "Dapatkan analisis kesehatan tanaman.",
  //               },
  //             ].map((item, idx) => (
  //               <div
  //                 key={idx}
  //                 className="p-4 rounded-3xl bg-slate-50 border border-slate-100 text-left"
  //               >
  //                 <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">
  //                   {item.step}
  //                 </span>
  //                 <h4 className="font-bold text-slate-800 mt-1">
  //                   {item.title}
  //                 </h4>
  //                 <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
  //                   {item.desc}
  //                 </p>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="flex flex-col gap-3 w-full mt-6">
  //             <Button
  //               onClick={() => openEdit(null)} // Buka form land baru
  //               className="w-full rounded-2xl bg-emerald-600 h-14 font-black text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
  //             >
  //               <PlusCircle className="mr-2" /> Daftarkan Lahan Pertama
  //             </Button>
  //             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
  //               Agritech Modern Indonesia
  //             </p>
  //           </div>
  //         </div>
  //       </SpotlightCard>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <OperationsHeader
        showGuide={showGuide}
        selectedLandId={selectedLandId}
        onLandChange={setSelectedLandId}
      />

      {isLoadingDetail ? (
        <div className="flex flex-col h-64 items-center justify-center gap-3 text-slate-400 font-medium text-sm">
          <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          Memuat detail lahan & siklus...
        </div>
      ) : activeLand ? (
        <>
          <div className="animate-in slide-in-from-top-4 duration-500">
            <LandInfoCard
              land={activeLand}
              onDelete={() => openDelete(activeLand)}
              onEdit={() => openEdit(activeLand)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <aside className="lg:col-span-4 h-full">
              <CycleListSidebar
                cycles={allCycles}
                selectedCycle={selectedCycle}
                onSelect={setSelectedCycle}
              />
            </aside>

            <div className="lg:col-span-8 h-full">
              {selectedCycle ? (
                <CycleOverviewCard
                  cycleId={selectedCycle.id}
                  onEdit={() => openEditCycle(selectedCycle)}
                  onStatusUpdate={() => openDeleteCycle(selectedCycle)}
                />
              ) : (
                <SpotlightCard className="rounded-[40px] border border-dashed border-slate-200 bg-white/50 h-full flex flex-col items-center justify-center min-h-[300px]">
                  <div className="p-10 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner animate-pulse">
                      <Map size={40} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800">
                      Belum Ada Siklus Tanam
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed font-medium">
                      Lahan "{activeLand.name}" belum memiliki siklus tanam
                      aktif.
                    </p>
                    <Button
                      onClick={() => openAddCycle(selectedLandId)}
                      className="mt-8 rounded-2xl bg-slate-950 px-8 h-12 font-bold hover:bg-green-600 transition-all shadow-lg active:scale-95"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" /> Mulai Tanam
                      Sekarang
                    </Button>
                  </div>
                </SpotlightCard>
              )}
            </div>
          </div>

          {selectedCycle && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-in slide-in-from-bottom-4 duration-700">
              <ActivityTimeline
                cycleId={selectedCycle.id}
                cycleStatus={selectedCycle.status}
                onAddActivity={() => openAddActivity(selectedCycle.id)}
              />

              <HealthHistoryCard
                cycleId={selectedCycle.id}
                isAiSupported={!!selectedCycle.commodity?.is_ai_supported}
                onAddReport={() => openAddActivity(selectedCycle.id)}
              />
            </div>
          )}
        </>
      ) : (
        <div className="p-12 border-2 border-dashed border-slate-100 rounded-[40px] bg-white/50 text-center flex flex-col items-center gap-4">
          <Map className="text-slate-200" size={48} />
          <p className="text-slate-400 font-medium font-mono text-xs uppercase tracking-widest">
            Belum ada lahan terpilih
          </p>
        </div>
      )}

      <DynamicFormDialog
        isOpen={isOpen}
        onClose={closeForm}
        title={initialData ? "Edit Informasi Lahan" : "Registrasi Lahan Baru"}
        formId="form-farmer-land"
        isLoading={isSubmitting}
      >
        <FormFarmerLands
          id="form-farmer-land"
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DynamicFormDialog>

      <DynamicFormDialog
        isOpen={isOpenCycle}
        onClose={closeCycleForm}
        title={
          initialDataCycle ? "Perbarui Siklus Tanam" : "Mulai Siklus Tanam"
        }
        formId="form-add-cycle"
        isLoading={isSubmittingCycle}
      >
        <FormCycle
          id="form-add-cycle"
          fields={cycleFormFields}
          initialData={initialDataCycle}
          onSubmit={handleCycleSubmit}
          isSubmitting={isSubmittingCycle}
        />
      </DynamicFormDialog>

      <DynamicFormDialog
        isOpen={isOpenActivity}
        onClose={closeActivityForm}
        title="Catat Aktivitas & Observasi"
        description="Hasil observasi akan dianalisis secara cerdas oleh Vangrove AI."
        formId="form-activity-integrated"
        isLoading={isSubmittingActivity}
      >
        <FormActivity
          id="form-activity-integrated"
          cycle={selectedCycle}
          fields={activityFormFields}
          onPredict={handleAIPredictionOnly}
          onSubmit={handleActivitySubmit}
          isSubmitting={isSubmittingActivity}
        />
      </DynamicFormDialog>

      <DeleteAlert
        isOpen={isOpenDelete}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        itemName={`Lahan ${initialData?.name || ""}`}
        title="Hapus Lahan?"
      />

      <DeleteAlert
        isOpen={isOpenDeleteCycle}
        onClose={closeDeleteCycle}
        onConfirm={confirmDeleteCycle}
        isDeleting={isDeletingCycle}
        itemName={`Siklus ${selectedCycle?.commodity?.name || ""}`}
        title="Laporkan Gagal Panen?"
        confirmText="Konfirmasi Gagal"
        description="Siklus ini akan dihentikan secara permanen. Data histori tetap dapat diakses untuk evaluasi."
      />

      <Dialog open={showGuide} onOpenChange={setShowGuide}>
        <DialogContent className="sm:max-w-[500px] rounded-[32px] border-none shadow-2xl p-0 overflow-hidden bg-white">
          {/* Bagian Header Dialog - Menggunakan background hijau pekat */}
          <div className="bg-emerald-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Map size={100} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                Panduan Vangrove
              </DialogTitle>
              <DialogDescription className="text-emerald-100 font-medium text-xs mt-1 leading-relaxed opacity-90">
                Langkah cerdas untuk mendigitalisasi dan mengoptimalkan hasil
                pertanian Anda.
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Bagian Konten Langkah-Langkah */}
          <div className="p-8 space-y-6">
            <div className="grid gap-5">
              {[
                {
                  step: "01",
                  t: "Registrasi Lahan",
                  d: "Klik ikon peta untuk mendaftarkan koordinat & luas lahan Anda.",
                  icon: <MapPinPlus className="text-emerald-600" size={14} />,
                  label: "Tambah Lahan",
                },
                {
                  step: "02",
                  t: "Mulai Siklus",
                  d: "Gunakan tombol siklus untuk memilih komoditas dan target panen.",
                  icon: <Plus className="text-blue-600" size={14} />,
                  label: "Siklus Baru",
                },
                {
                  step: "03",
                  t: "Catat Aktivitas",
                  d: "Laporkan progres harian dan gunakan AI untuk cek kesehatan daun.",
                  icon: <Sparkles className="text-amber-500" size={14} />,
                  label: "Aktivitas",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  {/* Nomor Langkah */}
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-[10px] border border-emerald-100">
                    {step.step}
                  </span>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm leading-none">
                        {step.t}
                      </h4>
                      {/* Badge Petunjuk Visual Ikon */}
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                        {step.icon}
                        <span className="text-[9px] font-black uppercase tracking-tighter text-slate-500">
                          {step.label}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {step.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Auto-close */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-300">
              <span>Vangrove — Agritech</span>
              <span className="flex items-center gap-2">
                Auto-close{" "}
                <Loader2 className="h-3 w-3 animate-spin text-emerald-600" />
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
