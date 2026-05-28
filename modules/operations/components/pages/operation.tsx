"use client";

import { DeleteAlert } from "@/components/molecules/delete-alert";
import { DynamicFormDialog } from "@/components/molecules/DynamicDialog";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Loader2, Map, PlusCircle } from "lucide-react";
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

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      <OperationsHeader
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
    </div>
  );
};
