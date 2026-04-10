import z from "zod";
import { campaignSchema } from "./Campaign.schema";

export const step1Schema = campaignSchema.pick({
  name: true,
  type: true,
  start_date: true,
  end_date: true,
});

export const step2Schema = campaignSchema.pick({
  calling_days: true,
  start_time: true,
  end_time: true,
  time_zone: true,
});

export const step3Schema = z.object({}); // Review step
