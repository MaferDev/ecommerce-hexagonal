import { z } from 'zod';

const searchSchema = z.object({
  page: z.number(),
  perPage: z.number(),
});

export type SearchDTO = z.infer<typeof searchSchema>;
