"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useLands } from "../hooks/lands-hook";
import { useCycles } from "../hooks/cycle-hooks";
import { useDaily } from "../hooks/daily-hooks";
import { useHealth } from "../hooks/health-hooks";
import { LandFormData } from "../schema/land-schema";
import { Land } from "../types/lands";
import { toast } from "sonner";

import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useQueryClient } from "@tanstack/react-query";

const { uploadFiles } = generateReactHelpers<OurFileRouter>();

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
  isSubmittingCycle: boolean;
  openAddCycle: (landId: string) => void;
  closeCycleForm: () => void;
  handleCycleSubmit: (values: any) => Promise<void>;

  isOpenActivity: boolean;
  isSubmittingActivity: boolean;
  openAddActivity: (cycleId: string) => void;
  closeActivityForm: () => void;
  handleActivitySubmit: (values: any) => Promise<void>;

  isOpenHealthCheck: boolean;
  isSubmittingHealth: boolean;
  openAddHealthCheck: (cycleId: string) => void;
  closeHealthCheckForm: () => void;
  handleHealthSubmit: (values: any) => Promise<void>;
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
  const { handleCreate: handleCreateCycle, isSubmitting: isSubmittingCycle } =
    useCycles();
  const {
    handleCreate: handleCreateActivity,
    isSubmitting: isSubmittingActivity,
  } = useDaily();

  const { handleCreate: handleCreateHealth, isSubmitting: isSubmittingHealth } =
    useHealth(selectedCycleId || undefined);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenCycle, setIsOpenCycle] = useState(false);
  const [isOpenActivity, setIsOpenActivity] = useState(false);
  const [isOpenHealthCheck, setIsOpenHealthCheck] = useState(false);

  const [initialData, setInitialData] = useState<Land | null>(null);

  useEffect(() => {
    if (landDetail && selectedLandId === landDetail.id) {
      setInitialData(landDetail);
    }
  }, [landDetail, selectedLandId]);

  const openEdit = (land: Land | null = null) => {
    if (land?.id) setSelectedLandId(land.id);
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
    if (initialData?.id) await handleUpdate(initialData.id, values);
    else await handleCreate(values);
    closeForm();
  };

  const openAddCycle = (landId: string) => {
    setSelectedLandId(landId);
    setIsOpenCycle(true);
  };

  const closeCycleForm = () => {
    setIsOpenCycle(false);
  };

  const handleCycleSubmit = async (values: any) => {
    await handleCreateCycle({ ...values, land_id: selectedLandId });
    closeCycleForm();
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
    await handleCreateActivity({ ...values, cycle_id: selectedCycleId });
    closeActivityForm();
  };

  const openAddHealthCheck = (cycleId: string) => {
    setSelectedCycleId(cycleId);
    setIsOpenHealthCheck(true);
  };

  const closeHealthCheckForm = () => {
    setIsOpenHealthCheck(false);
    setTimeout(() => setSelectedCycleId(null), 300);
  };

  const handleHealthSubmit = async (formValues: any) => {
    console.log(formValues);

    if (!formValues.imageFile) {
      toast.error("Gagal memproses", {
        description: "Silakan ambil gambar atau pilih file terlebih dahulu.",
      });
      return;
    }

    if (!selectedCycleId) {
      toast.error("Gagal memproses", {
        description: "ID Siklus tanam tidak valid atau kedaluwarsa.",
      });
      return;
    }

    const toastId = toast.loading("Memulai proses analisis terintegrasi...");

    try {
      toast.loading("1/2: Mengunggah gambar biner ke cloud...", {
        id: toastId,
      });
      const uploadResult = await uploadFiles("healthReportImage", {
        files: [formValues.imageFile],
      });

      const firstFile = uploadResult?.[0];
      if (!firstFile?.url) {
        throw new Error("Gagal mengalokasikan penyimpanan untuk gambar.");
      }

      toast.loading("2/2: AI Vangrove sedang mendeteksi patogen daun...", {
        id: toastId,
      });

      const resReport = await handleCreateHealth({
        cycle_id: selectedCycleId,
        image_url: firstFile.url,
        image_key: firstFile.key,
        notes: formValues.notes || "",
      });

      toast.dismiss(toastId);
      // closeHealthCheckForm();

      queryClient.invalidateQueries({
        queryKey: ["health-reports", selectedCycleId],
      });
      return resReport;
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Gagal memproses diagnosis.";
      toast.error("Analisis Batal", { description: errorMsg });
    }
  };

  const openDelete = (land: Land) => {
    setSelectedLandId(land.id);
    setInitialData(land);
    setIsOpenDelete(true);
  };

  const closeDelete = () => {
    setIsOpenDelete(false);
    setTimeout(() => setSelectedLandId(null), 300);
  };

  const confirmDelete = async () => {
    if (initialData?.id) {
      await handleDelete(initialData.id);
      closeDelete();
    }
  };

  const openDetail = (land: Land) => {
    setSelectedLandId(land.id);
    setIsOpenDetail(true);
  };

  const closeDetail = () => setIsOpenDetail(false);

  return (
    <LandFormContext.Provider
      value={{
        isOpen,
        isOpenDelete,
        isOpenDetail,
        isOpenCycle,
        isOpenActivity,
        isOpenHealthCheck,
        isSubmitting,
        isDeleting,
        isSubmittingCycle,
        isSubmittingActivity,
        isSubmittingHealth,
        initialData,
        openEdit,
        openDelete,
        openDetail,
        closeForm,
        closeDelete,
        closeDetail,
        handleSubmit,
        confirmDelete,
        openAddCycle,
        closeCycleForm,
        handleCycleSubmit,
        openAddActivity,
        closeActivityForm,
        handleActivitySubmit,
        openAddHealthCheck,
        closeHealthCheckForm,
        handleHealthSubmit,
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
