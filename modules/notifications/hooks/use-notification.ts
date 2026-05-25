"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "../api/notification.api";
import { toast } from "sonner";

export const useNotification = () => {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const data = await notificationApi.getAll();

      return data.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt || n.created_at),
        isRead: n.isRead ?? n.is_read,
      }));
    },
    refetchInterval: 60000,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previous = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(["notifications"], (old: any) =>
        old?.map((n: any) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      return { previous };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["notifications"], context?.previous);
      toast.error("Gagal memperbarui status");
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (old: any) =>
        old?.map((n: any) => ({ ...n, isRead: true })),
      );
      toast.success("Semua pesan ditandai dibaca");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => notificationApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["notifications"], (old: any) =>
        old?.filter((n: any) => n.id !== id),
      );
    },
  });

  const deleteAllMutation = useMutation({
    mutationFn: () => notificationApi.deleteAll(),
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], []);
      toast.success("Kotak masuk dibersihkan");
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllReadMutation.mutate,
    deleteNotification: deleteMutation.mutate,
    deleteAll: deleteAllMutation.mutate,
  };
};
