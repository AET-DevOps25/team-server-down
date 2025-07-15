import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { whiteboardApiFactory } from "@/api";
import { useCallback, useEffect, useRef } from "react";
import { WhiteboardEvent } from "@/api/realtime/dtos/WhiteboardEvent";
import { z } from "zod";

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
    mutationFn: ({
      whiteboardId,
      emails,
    }: {
      whiteboardId: number;
      emails: string[];
    }) => {
      const inviteCollaboratorsRequest = {
        emails: emails,
      };
      return whiteboardApiFactory.inviteCollaborators(
        whiteboardId,
        inviteCollaboratorsRequest,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboard-collaborators"] });
    },
  });
};

export const useRemoveCollaboratorsFromWhiteboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      whiteboardId,
      userIds,
    }: {
      whiteboardId: number;
      userIds: number[];
    }) => {
      const removeCollaboratorsRequest = {
        userIds: userIds,
      };
      return whiteboardApiFactory.removeCollaborators(
        whiteboardId,
        removeCollaboratorsRequest,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["whiteboard-collaborators"] });
    },
  });
};

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

export const useSubscribeToWhiteboardEvents = (
  whiteboardId: number,
  userId: number,
  onMessage: (data: z.infer<typeof WhiteboardEvent>) => void,
) => {
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:9090/ws/whiteboard/${whiteboardId}/${userId}/subscribe`,
    );
    ws.onopen = () => {
      console.log("connected to subscription channel");
    };

    ws.onmessage = (event) => {
      const parsedJson = JSON.parse(event.data);
      try {
        const data = WhiteboardEvent.parse(parsedJson);
        onMessage(data);
      } catch (e) {
        if (e instanceof z.ZodError) {
          console.error("Zod validation error:", {
            issues: e.issues,
            originalPayload: parsedJson,
          });
        }
      }
    };

    return () => {
      ws.close();
    };
  }, [onMessage]);
};

export const usePublishWhiteboardEvents = (whiteboardId: number) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:9090/ws/whiteboard/${whiteboardId}/publish`,
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("connected to publishing channel");
    };

    return () => {
      ws.close();
    };
  }, []);

  return useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    }
  }, []);
};
