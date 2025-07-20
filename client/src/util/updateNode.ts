import { Node } from "@xyflow/react";
import { NodeProperties } from "@/types/NodeProperties";

type UpdateNodeFn = (
  id: string,
  updater: Partial<{
    label: string;
    nodeProperties: Partial<NodeProperties>;
  }>,
) => (nodes: Node[]) => Node[];

export const updateNode: UpdateNodeFn = (id, updater) => (nodes) => {
  return nodes.map((node) => {
    if (node.id === id) {
      return {
        ...node,
        data: {
          ...node.data,
          ...(updater.label !== undefined && { label: updater.label }),
          ...(updater.nodeProperties && {
            nodeProperties: {
              ...(node.data.nodeProperties || {}),
              ...updater.nodeProperties,
            },
          }),
        },
      };
    }
    return node;
  });
};
