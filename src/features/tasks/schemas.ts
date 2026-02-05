// schemas.ts
import { z } from "zod";
import { TaskStatus } from "./types";

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "Required"),

  status: z.nativeEnum(TaskStatus, {
    error: "Status is required",
  }),

  workspaceId: z.string().trim().min(1, "Required"),

  projectId: z.string().trim().min(1, "Required"),

  dueDate: z.date().optional(),

  assigneeId: z.string().trim().min(1, "Required"),

  description: z.string().optional(),
});
