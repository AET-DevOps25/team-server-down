import { z } from "zod";

const Position = z.object({
  x: z.number(),
  y: z.number(),
});

const NodeProperties = z.object({
  borderColor: z.string(),
  borderOpacity: z.number(),
  borderWidth: z.number(),
  color: z.string(),
  fontFamily: z.string(),
  fontSize: z.number(),
  isBold: z.boolean(),
  isItalic: z.boolean(),
  isStrikethrough: z.boolean(),
  isUnderline: z.boolean(),
  opacity: z.number(),
  textColor: z.string(),
});

const Node = z.object({
  id: z.string(),
  type: z.string(),
  position: Position,
  measured: z.object({
    width: z.number(),
    height: z.number(),
  }),
  width: z.number().optional(),
  height: z.number().optional(),
  dragging: z.boolean().optional(),
  selected: z.boolean().optional(),
  data: z.object({
    label: z.string(),
    shapeType: z.string().optional(),
    nodeProperties: NodeProperties,
  }),
});

const Edge = z.object({
  id: z.string(),
  source: z.string(),
  sourceHandle: z.string(),
  target: z.string(),
  targetHandle: z.string(),
});

const MousePositionEvent = z.object({
  type: z.literal("mousePosition"),
  payload: z.object({
    id: z.number(),
    username: z.string(),
    position: Position.optional(),
  }),
});

const NodePositionEvent = z.object({
  type: z.literal("nodePosition"),
  payload: z.array(Node),
});

const EdgePositionEvent = z.object({
  type: z.literal("edgePosition"),
  payload: z.array(Edge),
});

export const WhiteboardEvent = z.discriminatedUnion("type", [
  MousePositionEvent,
  NodePositionEvent,
  EdgePositionEvent,
]);
