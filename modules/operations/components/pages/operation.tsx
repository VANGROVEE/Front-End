"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Map, PlusCircle, Loader2 } from "lucide-react";

import { useLandContext } from "../../context/land-context";
import { useLands } from "../../hooks/lands-hook";

import { OperationsHeader } from "../molecules/OperationsHeader";
import { CycleListSidebar } from "../molecules/CycleListSidebar";
import { CycleOverviewCard } from "../molecules/CycleOverviewCard";
import { ActivityTimeline } from "../molecules/ActivityTimeline";
import { DynamicFormDialog } from "@/components/molecules/DynamicDialog";
import { FormFarmerLands } from "../organisms/form-lands";
import { FormCycle } from "../organisms/FormCycle";
import { FormActivity } from "../organisms/FormActivity";
import { LandInfoCard } from "../molecules/LandInfoCard";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";

import { getLandFormFields } from "../../const/land-filed";
import { cycleFormFields } from "../../const/cycle-field";
import { activityFormFields } from "../../const/activity-field";

export const OperationsPage = () => {
  const { lands, isLoadingLands } = useLands();

  const {
    isOpen,
    closeForm,
    handleSubmit,
    isSubmitting,
    initialData,
    isOpenCycle,
    closeCycleForm,
    handleCycleSubmit,
    isSubmittingCycle,
    openAddCycle,
    isOpenActivity,
    closeActivityForm,
    handleActivitySubmit,
    isSubmittingActivity,
    openAddActivity,
  } = useLandContext();

  const [selectedLandId, setSelectedLandId] = useState<string>("");
  const [selectedCycle, setSelectedCycle] = useState<any | null>(null);

  useEffect(() => {
    if (lands && lands.length > 0 && !selectedLandId) {
      setSelectedLandId(lands[0].id);
    }
  }, [lands, selectedLandId]);

  const activeLand = useMemo(() => {
    return lands?.find((land: any) => land.id === selectedLandId);
  }, [selectedLandId, lands]);

  const filteredCycles = useMemo(() => {
    return activeLand?.planting_cycles || [];
  }, [activeLand]);

  useEffect(() => {
    if (filteredCycles.length > 0) {
      setSelectedCycle(filteredCycles[0]);
    } else {
      setSelectedCycle(null);
    }
  }, [filteredCycles]);

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
        onAddCycle={() => openAddCycle(selectedLandId)}
      />

      {activeLand ? (
        <div className="animate-in slide-in-from-top-4 duration-500">
          <LandInfoCard land={activeLand} />
        </div>
      ) : (
        <div className="p-12 border-2 border-dashed border-slate-100 rounded-[40px] bg-white/50 text-center flex flex-col items-center gap-4">
          <Map className="text-slate-200" size={48} />
          <p className="text-slate-400 font-medium font-mono text-xs uppercase tracking-widest text-balance">
            Belum ada lahan terpilih
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-4">
          <CycleListSidebar
            selectedLandId={selectedLandId}
            selectedCycle={selectedCycle}
            onSelect={setSelectedCycle}
          />
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {selectedCycle ? (
            <div className="flex flex-col gap-6 animate-in zoom-in-95 duration-500">
              <SpotlightCard
                className="p-1 rounded-[32px] border border-slate-100 bg-white shadow-sm"
                spotlightColor="rgba(22, 163, 74, 0.05)"
              >
                <CycleOverviewCard
                  cycle={selectedCycle}
                  className="border-none shadow-none bg-transparent"
                />
              </SpotlightCard>

              {/* TIMELINE: Tambahkan pemicu modal aktivitas */}
              <ActivityTimeline
                activities={selectedCycle.daily_activities}
                onAddActivity={() => openAddActivity(selectedCycle.id)}
              />
            </div>
          ) : (
            <SpotlightCard className="rounded-[40px] border border-dashed border-slate-200 bg-white/50">
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner animate-pulse">
                  <Map size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-800">
                  Belum Ada Siklus Tanam
                </h3>
                <p className="text-sm text-slate-400 mt-2 max-w-sm leading-relaxed font-medium">
                  {activeLand
                    ? `Lahan "${activeLand.name}" belum memiliki siklus tanam aktif.`
                    : "Pilih lahan Anda untuk memantau perkembangan operasional."}
                </p>
                {activeLand && (
                  <Button
                    onClick={() => openAddCycle(selectedLandId)}
                    className="mt-8 rounded-2xl bg-slate-950 px-8 h-12 font-bold hover:bg-green-600 transition-all shadow-lg"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" /> Mulai Tanam Sekarang
                  </Button>
                )}
              </div>
            </SpotlightCard>
          )}
        </div>
      </div>

      {/* --- MODALS SECTION --- */}

      {/* 1. Modal Lahan */}
      <DynamicFormDialog
        isOpen={isOpen}
        onClose={closeForm}
        title={initialData ? "Edit Informasi Lahan" : "Registrasi Lahan Baru"}
        formId="form-farmer-land"
        isLoading={isSubmitting}
      >
        <FormFarmerLands
          id="form-farmer-land"
          fields={getLandFormFields}
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DynamicFormDialog>

      {/* 2. Modal Siklus */}
      <DynamicFormDialog
        isOpen={isOpenCycle}
        onClose={closeCycleForm}
        title="Mulai Siklus Tanam"
        formId="form-add-cycle"
        isLoading={isSubmittingCycle}
      >
        <FormCycle
          id="form-add-cycle"
          fields={cycleFormFields}
          onSubmit={handleCycleSubmit}
          isSubmitting={isSubmittingCycle}
        />
      </DynamicFormDialog>

      {/* 3. Modal Aktivitas Harian */}
      <DynamicFormDialog
        isOpen={isOpenActivity}
        onClose={closeActivityForm}
        title="Catat Aktivitas Harian"
        description="Pencatatan rutin membantu AI memberikan analisis kesehatan tanaman yang lebih akurat."
        formId="form-add-activity"
        isLoading={isSubmittingActivity}
      >
        <FormActivity
          id="form-add-activity"
          fields={activityFormFields}
          onSubmit={handleActivitySubmit}
          isSubmitting={isSubmittingActivity}
        />
      </DynamicFormDialog>
    </div>
  );
};
