import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { whiteboardApiFactory } from "@/api";

export function useWhiteboards() {
  return useQuery({
    queryKey: ["whiteboards"],
    queryFn: async () => {
      const { data } = await whiteboardApiFactory.getUserWhiteboards();
      return data;
    },
  });
}

export function useGetWhiteboardTitle(whiteboardId: number) {
  return useQuery({
    queryKey: ["whiteboardTitle", whiteboardId],
    queryFn: async () => {
      const { data } =
        await whiteboardApiFactory.getWhiteboardTitle(whiteboardId);
      return data;
    },
  });
}

export function useCreateWhiteboard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (title: string = "Untitled") =>
      whiteboardApiFactory.createWhiteboard(title),
    onSuccess: (response) => {
      const newProject = response.data;
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });
      router.push(`/board/${newProject.id}`);
    },
  });
}

export const useDeleteWhiteboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => whiteboardApiFactory.deleteWhiteboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });
    },
  });
};

export const useUpdateWhiteboardTitle = (whiteboardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) =>
      whiteboardApiFactory.updateTitle(whiteboardId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboards"] });
    },
  });
};

export const useInviteCollaboratorsToWhiteboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({whiteboardId, emails}: {whiteboardId: number, emails: string[]}) => {
      const inviteCollaboratorsRequest = {
        "emails": emails
      }
      return whiteboardApiFactory.inviteCollaborators(whiteboardId, inviteCollaboratorsRequest)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["whiteboard-collaborators"]});
    }
  })
}

export const useGetWhiteboardCollaborators = (whiteboardId: number) => {
  return useQuery({
    queryKey: ["whiteboard-collaborators"],
    queryFn: async () => {
      const { data } =
        await whiteboardApiFactory.getCollaborators(whiteboardId);
      return data;
    },
  });
};