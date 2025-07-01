// hooks/useRestoreWhiteboard.ts
import { useQuery } from "@tanstack/react-query";
import { Node, Edge, useReactFlow } from "@xyflow/react";
import { edgeApiFactory, nodeApiFactory, viewportFactory } from "@/api";
import {
  defaultShapeNodeProperties,
  NodeProperties,
} from "@/types/NodeProperties";
import shapeRegistry from "@/util/shapeRegistry";
import { useEffect } from "react";

interface UseRestoreWhiteboardProps {
  whiteboardId: number;
  enabled?: boolean;
}

export function useRestoreWhiteboard({
  whiteboardId,
  enabled = true,
}: UseRestoreWhiteboardProps) {
  const { setNodes, setEdges, setViewport } = useReactFlow();

  const result = useQuery({
    queryKey: ["whiteboard", whiteboardId],
    queryFn: async () => {
      const [nodesResponse, edgesResponse, viewportResponse] =
        await Promise.all([
          nodeApiFactory.getAllByWhiteboardId(whiteboardId),
          edgeApiFactory.getEdgesByWhiteboard(whiteboardId),
          viewportFactory
            .getViewportByWhiteboardId(whiteboardId)
            .catch(() => ({ data: null })),
        ]);

      return {
        backendNodes: nodesResponse.data,
        backendEdges: edgesResponse.data,
        viewportDto: viewportResponse.data,
      };
    },
    enabled,
  });

  const { data, isLoading, error } = result;

  useEffect(() => {
    if (data && !isLoading) {
      const { backendNodes, backendEdges, viewportDto } = data;

      const reactFlowNodes: Node[] = backendNodes.map((backendNode) => {
        let nodeType = backendNode.type;
        let shapeType = "";

        if (nodeType && nodeType.startsWith("shapeNode:")) {
          const parts = nodeType.split(":");
          nodeType = parts[0];
          shapeType = parts[1];
        } else if (nodeType !== "TextNode") {
          shapeType = "textNode";
        }

        const nodeProperties: NodeProperties = {
          color: backendNode.color || defaultShapeNodeProperties.color,
          borderColor:
            backendNode.borderColor || defaultShapeNodeProperties.borderColor,
          borderWidth:
            backendNode.borderWidth || defaultShapeNodeProperties.borderWidth,
          borderOpacity:
            backendNode.borderOpacity ||
            defaultShapeNodeProperties.borderOpacity,
          opacity: backendNode.opacity || defaultShapeNodeProperties.opacity,
          textColor:
            backendNode.textColor || defaultShapeNodeProperties.textColor,
          fontSize: backendNode.fontSize || defaultShapeNodeProperties.fontSize,
          fontFamily:
            backendNode.fontFamily || defaultShapeNodeProperties.fontFamily,
          isBold: backendNode.bold || defaultShapeNodeProperties.isBold,
          isItalic: backendNode.italic || defaultShapeNodeProperties.isItalic,
          isStrikethrough:
            backendNode.strikethrough ||
            defaultShapeNodeProperties.isStrikethrough,
          isUnderline:
            backendNode.underline || defaultShapeNodeProperties.isUnderline,
        };

        const baseNode = {
          id: backendNode.id!,
          type: nodeType,
          position: {
            x: backendNode.positionX || Math.random() * 300,
            y: backendNode.positionY || Math.random() * 300,
          },
          width: backendNode.width,
          height: backendNode.height,
        };

        if (nodeType === "shapeNode") {
          const Shape = shapeRegistry({ shapeType: shapeType });

          return {
            ...baseNode,
            data: {
              label: backendNode.label || "",
              shapeType,
              Shape,
              nodeProperties,
            },
          };
        } else {
          return {
            ...baseNode,
            data: {
              label: backendNode.label || "",
              nodeProperties,
            },
          };
        }
      });

      const reactFlowEdges: Edge[] = backendEdges
        .filter((edge) => edge.id && edge.source && edge.target)
        .map((backendEdge) => ({
          id: backendEdge.id!,
          source: backendEdge.source!,
          sourceHandle: backendEdge.sourceHandle ?? null,
          target: backendEdge.target!,
          targetHandle: backendEdge.targetHandle ?? null,
        }));

      setNodes(reactFlowNodes);
      setEdges(reactFlowEdges);

      if (viewportDto && viewportDto.x && viewportDto.y && viewportDto.zoom) {
        setViewport({
          x: viewportDto.x,
          y: viewportDto.y,
          zoom: viewportDto.zoom,
        });
      }
    }
  }, [data, isLoading, setNodes, setEdges, setViewport]);

  return {
    isLoading,
    error,
    refetch: result.refetch,
    data: result.data
      ? {
          nodes: result.data.backendNodes,
          edges: result.data.backendEdges,
          viewport: result.data.viewportDto,
        }
      : null,
  };
}
