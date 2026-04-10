import { z } from "zod";

export const campaignSchema = z.object({
  campaignId: z.string().optional(),
  name: z.string().min(1, "Campaign name is required").max(100, "Name is too long"),
  type: z.enum(['onboarding', 'lead_generation', 'reminder', 'survey'], {
    message: "Campaign type is required",
  }),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  calling_days: z.array(z.string()).min(1, "Select at least one calling day"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  time_zone: z.string().min(1, "Time zone is required"),
});

