import { useState, useCallback } from "react";
import {
  SaveWhiteboardStateRequest,
  Node as BackendNode,
  Edge as BackendEdge,
  ViewportResponse,
} from "@/api/main/generated/api";
import { whiteboardApiFactory } from "@/api";

import { Node, Edge } from "@xyflow/react";
import { NodeProperties } from "@/types/NodeProperties";

interface UseSaveWhiteboardStateProps {
  whiteboardId: number;
  nodes: Node[];
  edges: Edge[];
  viewport: { x: number; y: number; zoom: number };
}

export function useSaveWhiteboardState({
  whiteboardId,
  nodes,
  edges,
  viewport,
}: UseSaveWhiteboardStateProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveWhiteboardState = useCallback(async () => {
    setIsSaving(true);
    setError(null);

    try {
      const mappedNodes: BackendNode[] = nodes.map((node) => {
        const { data } = node;
        const nodeProperties = data.nodeProperties as NodeProperties;

        const nodeType =
          node.type === "shapeNode" && data.shapeType
            ? `${node.type}:${data.shapeType}`
            : node.type || "";

        const label =
          "label" in data
            ? typeof data.label === "string"
              ? data.label
              : String(data.label || "")
            : "";

        return {
          id: node.id,
          whiteboardId: whiteboardId,
          type: nodeType,
          positionX: node.position.x,
          positionY: node.position.y,
          label: label,
          width: node.width || node.measured?.width || 0,
          height: node.height || node.measured?.height || 0,
          color: nodeProperties.color || "",
          borderColor: nodeProperties.borderColor || "",
          borderWidth: nodeProperties.borderWidth || 0,
          borderOpacity: nodeProperties.borderOpacity || 1,
          opacity: nodeProperties.opacity || 1,
          textColor: nodeProperties.textColor || "",
          fontSize: nodeProperties.fontSize || 16,
          fontFamily: nodeProperties.fontFamily || "",
          isBold: nodeProperties.isBold || false,
          isItalic: nodeProperties.isItalic || false,
          isStrikethrough: nodeProperties.isStrikethrough || false,
          isUnderline: nodeProperties.isUnderline || false,
        };
      });

      const mappedEdges: BackendEdge[] = edges.map((edge) => ({
        id: edge.id || "",
        whiteboardId: whiteboardId,
        source: edge.source,
        sourceHandle: edge.sourceHandle || undefined,
        target: edge.target,
        targetHandle: edge.targetHandle || undefined,
      }));

      const viewportResponse: ViewportResponse = {
        x: viewport.x,
        y: viewport.y,
        zoom: viewport.zoom,
      };

      const whiteboardStateDto: SaveWhiteboardStateRequest = {
        nodes: mappedNodes,
        edges: mappedEdges,
        viewportResponse,
      };

      const response = await whiteboardApiFactory.saveWhiteboardState(
        whiteboardId,
        whiteboardStateDto,
      );

      setIsSaving(false);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      setIsSaving(false);
      throw error;
    }
  }, [whiteboardId, nodes, edges, viewport]);

  return { saveWhiteboardState, isSaving, error };
}
