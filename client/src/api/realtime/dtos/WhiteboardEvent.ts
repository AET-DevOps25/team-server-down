import { z } from "zod";

export const WhiteboardEvent = z.object({
    type: z.enum(["mousePosition"]),
    payload: z.object({
        id: z.number(),
        username: z.string(),
        position: z
            .object({
                x: z.number(),
                y: z.number(),
            })
            .optional()
    })
});