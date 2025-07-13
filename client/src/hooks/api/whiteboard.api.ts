import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { whiteboardApiFactory } from "@/api";
import { useCallback, useEffect, useRef } from "react";

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

export const useSubscribeToWhiteboardEvents = (whiteboardId: number) => {
  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:9090/ws/whiteboard/${whiteboardId}/subscribe`,
    );
    ws.onopen = () => {
      console.log("connected to subscription channel");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);
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
