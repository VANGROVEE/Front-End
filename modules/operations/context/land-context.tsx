"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLands } from "../hooks/lands-hook";
import { useCycles } from "../hooks/cycle-hooks";
import { useDaily } from "../hooks/daily-hooks";
import { useHealth } from "../hooks/health-hooks";
import { LandFormData } from "../schema/land-schema";
import { Land } from "../types/lands";
import { PlantingCycle } from "../types/cycle";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface LandContextType {
  isOpen: boolean;
  isOpenDelete: boolean;
  isOpenDetail: boolean;
  initialData: Land | null;
  isSubmitting: boolean;
  isDeleting: boolean;
  openEdit: (land?: Land | null) => void;
  openDelete: (land: Land) => void;
  openDetail: (land: Land) => void;
  closeForm: () => void;
  closeDelete: () => void;
  closeDetail: () => void;
  handleSubmit: (values: LandFormData) => Promise<void>;
  confirmDelete: () => Promise<void>;

  isOpenCycle: boolean;
  isOpenDeleteCycle: boolean;
  isSubmittingCycle: boolean;
  isDeletingCycle: boolean;
  initialDataCycle: PlantingCycle | null;
  openAddCycle: (landId: string) => void;
  openEditCycle: (cycle: PlantingCycle) => void;
  openDeleteCycle: (cycle: PlantingCycle) => void;
  closeCycleForm: () => void;
  closeDeleteCycle: () => void;
  handleCycleSubmit: (values: any) => Promise<void>;
  confirmDeleteCycle: () => Promise<void>;

  isOpenActivity: boolean;
  isSubmittingActivity: boolean;
  isSubmittingHealth: boolean;
  openAddActivity: (cycleId: string) => void;
  closeActivityForm: () => void;
  handleActivitySubmit: (values: any) => Promise<void>;
  handleAIPredictionOnly: (imageUrl: string) => Promise<any>;
}

const LandFormContext = createContext<LandContextType | undefined>(undefined);

export const LandFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  const [selectedLandId, setSelectedLandId] = useState<string | null>(null);
  const [selectedCycleId, setSelectedCycleId] = useState<string | null>(null);

  const {
    handleCreate,
    handleUpdate,
    handleDelete,
    isSubmitting,
    isDeleting,
    landDetail,
  } = useLands(selectedLandId || undefined);

  const {
    handleCreate: handleCreateCycle,
    handleUpdate: handleUpdateCycle,
    handleDelete: handleDeleteCycle,
    isSubmitting: isSubmittingCycle,
    isDeleting: isDeletingCycle,
  } = useCycles();

  const {
    handleCreate: handleCreateActivity,
    isSubmitting: isSubmittingActivity,
  } = useDaily();

  const { predictPlantHealth, isPredicting } = useHealth(
    selectedCycleId || undefined,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenCycle, setIsOpenCycle] = useState(false);
  const [isOpenDeleteCycle, setIsOpenDeleteCycle] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);

  const [initialData, setInitialData] = useState<Land | null>(null);
  const [initialDataCycle, setInitialDataCycle] =
    useState<PlantingCycle | null>(null);

  useEffect(() => {
    if (landDetail && selectedLandId === landDetail.id) {
      setInitialData(landDetail);
    }
  }, [landDetail, selectedLandId]);

  const openEdit = (land: Land | null = null) => {
    if (land) setSelectedLandId(land.id);
    setInitialData(land);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setTimeout(() => {
      setInitialData(null);
      setSelectedLandId(null);
    }, 300);
  };

  const handleSubmit = async (values: LandFormData) => {
    try {
      if (initialData?.id) await handleUpdate(initialData.id, values);
      else await handleCreate(values);
      closeForm();
      queryClient.invalidateQueries({ queryKey: ["lands"] });
    } catch (error) {}
  };

  const openDelete = (land: Land) => {
    setInitialData(land);
    setIsOpenDelete(true);
  };

  const closeDelete = () => {
    setIsOpenDelete(false);
    setTimeout(() => setInitialData(null), 300);
  };

  const confirmDelete = async () => {
    if (initialData?.id) {
      await handleDelete(initialData.id);
      closeDelete();
      queryClient.invalidateQueries({ queryKey: ["lands"] });
    }
  };

  const openAddCycle = (landId: string) => {
    setSelectedLandId(landId);
    setInitialDataCycle(null);
    setIsOpenCycle(true);
  };

  const openEditCycle = (cycle: PlantingCycle) => {
    setSelectedLandId(cycle.land_id);
    setInitialDataCycle(cycle);
    setIsOpenCycle(true);
  };

  const closeCycleForm = () => {
    setIsOpenCycle(false);
    setTimeout(() => {
      setInitialDataCycle(null);
      setSelectedLandId(null);
    }, 300);
  };

  const handleCycleSubmit = async (values: any) => {
    const landIdToRefresh = selectedLandId || initialDataCycle?.land_id;
    try {
      if (initialDataCycle?.id) {
        await handleUpdateCycle(initialDataCycle.id, values);
      } else {
        await handleCreateCycle({ ...values, land_id: landIdToRefresh });
      }
      closeCycleForm();
      if (landIdToRefresh) {
        queryClient.invalidateQueries({
          queryKey: ["land-detail", landIdToRefresh],
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal menyimpan siklus");
    }
  };

  const openDeleteCycle = (cycle: PlantingCycle) => {
    setSelectedLandId(cycle.land_id);
    setInitialDataCycle(cycle);
    setIsOpenDeleteCycle(true);
  };

  const closeDeleteCycle = () => {
    setIsOpenDeleteCycle(false);
    setTimeout(() => {
      setInitialDataCycle(null);
      setSelectedLandId(null);
    }, 300);
  };

  const confirmDeleteCycle = async () => {
    if (initialDataCycle?.id) {
      const landId = initialDataCycle.land_id;
      await handleDeleteCycle(initialDataCycle.id);
      closeDeleteCycle();
      queryClient.invalidateQueries({ queryKey: ["land-detail", landId] });
    }
  };

  const handleAIPredictionOnly = async (imageUrl: string) => {
    return await predictPlantHealth(imageUrl);
  };

  const openAddActivity = (cycleId: string) => {
    setSelectedCycleId(cycleId);
    setIsOpenActivity(true);
  };

  const closeActivityForm = () => {
    setIsOpenActivity(false);
    setTimeout(() => setSelectedCycleId(null), 300);
  };

  const handleActivitySubmit = async (values: any) => {
    const toastId = toast.loading("Sedang menyimpan data ke sistem...");
    try {
      const { imageFile, image_preview, ...finalPayload } = values;

      await handleCreateActivity({
        ...finalPayload,
        cycle_id: selectedCycleId || finalPayload.cycle_id,
      });

      toast.success("Aktivitas berhasil disimpan", { id: toastId });

      closeActivityForm();

      if (selectedLandId) {
        queryClient.invalidateQueries({
          queryKey: ["land-detail", selectedLandId],
        });
      }

      if (values.activity_type === "OBSERVATION") {
        queryClient.invalidateQueries({
          queryKey: ["health-reports", selectedCycleId || values.cycle_id],
        });
      }
    } catch (error: any) {
      toast.error("Gagal Menyimpan", {
        id: toastId,
        description:
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan internal",
      });
    }
  };

  const openDetail = (land: Land) => {
    setSelectedLandId(land.id);
    setIsOpenDetail(true);
  };
  const closeDetail = () => {
    setIsOpenDetail(false);
    setTimeout(() => setSelectedLandId(null), 300);
  };

  return (
    <LandFormContext.Provider
      value={{
        isOpen,
        isOpenDelete,
        isOpenDetail,
        isOpenCycle,
        isOpenDeleteCycle,
        isOpenActivity,
        isSubmitting,
        isDeleting,
        isSubmittingCycle,
        isDeletingCycle,
        isSubmittingActivity,
        isSubmittingHealth: isPredicting,
        initialData,
        initialDataCycle,
        openEdit,
        openDelete,
        openDetail,
        closeForm,
        closeDelete,
        closeDetail,
        handleSubmit,
        confirmDelete,
        openAddCycle,
        openEditCycle,
        openDeleteCycle,
        closeCycleForm,
        closeDeleteCycle,
        handleCycleSubmit,
        confirmDeleteCycle,
        openAddActivity,
        closeActivityForm,
        handleActivitySubmit,
        handleAIPredictionOnly,
      }}
    >
      {children}
    </LandFormContext.Provider>
  );
};

export const useLandContext = () => {
  const context = useContext(LandFormContext);
  if (!context)
    throw new Error("useLandContext must be used within LandFormProvider");
  return context;
};
