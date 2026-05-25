"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  profileApi,
  UserProfile,
  UpdateUserPayload,
} from "@/modules/profile/components/api/profil";
import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { toast } from "sonner";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const {
    data: profile,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      return await profileApi.get();
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => profileApi.update(payload),

    onMutate: async (newPayload) => {
      await queryClient.cancelQueries({ queryKey: ["profile", user?.id] });
      const previousProfile = queryClient.getQueryData(["profile", user?.id]);

      queryClient.setQueryData(["profile", user?.id], (old: any) => ({
        ...old,
        ...newPayload,
      }));

      return { previousProfile };
    },

    onSuccess: (data) => {
      toast.success("Profil berhasil diperbarui");
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(["profile", user?.id], context?.previousProfile);
      toast.error(
        err instanceof Error ? err.message : "Gagal memperbarui profil",
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  return {
    profile: profile || null,
    loading,
    updating: updateMutation.isPending,
    error: error instanceof Error ? error.message : null,
    handleUpdate: updateMutation.mutateAsync,
  };
};
