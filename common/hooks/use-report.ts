"use client";

import { useEffect, useState } from "react";
import { reportApi, PlantingCycle, DailyActivity } from "@/lib/api/report";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";

export const useReport = () => {
  const { user } = useAuthStore();
  const [cycles, setCycles] = useState<PlantingCycle[]>([]);
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.token) return;

    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [cyclesData, activitiesData] = await Promise.all([
          reportApi.getPlantingCycles(),
          reportApi.getDailyActivities(),
        ]);
        if (isMounted) {
          setCycles(cyclesData);
          setActivities(activitiesData);
        }
      } catch (err) {
        if (isMounted)
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user?.token]);

  const totalCycles = cycles.length;
  const activeCycles = cycles.filter((c) => c.status === "ACTIVE").length;
  const completedCycles = cycles.filter((c) => c.status === "COMPLETED").length;
  const failedCycles = cycles.filter((c) => c.status === "FAILED").length;

  const commodities = [...new Set(cycles.map((c) => c.commodity_name))];
  const commodityStats = commodities.map((name) => ({
    name,
    total: cycles.filter((c) => c.commodity_name === name).length,
    active: cycles.filter(
      (c) => c.commodity_name === name && c.status === "ACTIVE",
    ).length,
    completed: cycles.filter(
      (c) => c.commodity_name === name && c.status === "COMPLETED",
    ).length,
    failed: cycles.filter(
      (c) => c.commodity_name === name && c.status === "FAILED",
    ).length,
  }));

  const activityTypes = [...new Set(activities.map((a) => a.activity_type))];
  const activityStats = activityTypes.map((type) => ({
    type,
    count: activities.filter((a) => a.activity_type === type).length,
  }));

  const hamaKeywords = [
    "hama",
    "wereng",
    "ulat",
    "kutu",
    "belalang",
    "tikus",
    "jamur",
    "busuk",
  ];
  const hamaActivities = activities.filter((a) =>
    hamaKeywords.some((k) => a.notes?.toLowerCase().includes(k)),
  );

  return {
    cycles,
    activities,
    loading,
    error,
    totalCycles,
    activeCycles,
    completedCycles,
    failedCycles,
    commodityStats,
    activityStats,
    hamaActivities,
  };
};
