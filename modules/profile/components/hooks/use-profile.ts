"use client";

import { useAuthStore } from "@/common/icons/stores/use-auth-store";
import { extractErrorMessage } from "@/common/utils/error";
import {
  profileApi,
  UpdateUserPayload,
  UserProfile,
} from "@/modules/profile/components/api/profil";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const profileQuery = useQuery({
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

      queryClient.setQueryData<UserProfile>(["profile", user?.id], (old) => {
        if (!old) return old;

        return {
          ...old,
          ...newPayload,
        };
      });

      return { previousProfile };
    },

    onSuccess: () => {
      toast.success("Profil berhasil diperbarui");
    },

    onError: (err, _, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(
          ["profile", user?.id],
          context.previousProfile,
        );
      }

      toast.error(extractErrorMessage(err, "Gagal memperbarui profil"));
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
    },
  });

  return {
    profile: profileQuery.data ?? null,
    loading: profileQuery.isLoading,
    updating: updateMutation.isPending,
    error: profileQuery.error ? extractErrorMessage(profileQuery.error) : null,

    handleUpdate: async (payload: UpdateUserPayload) => {
      return await updateMutation.mutateAsync(payload);
    },
  };
};
