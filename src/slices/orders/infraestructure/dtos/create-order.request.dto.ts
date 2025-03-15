import { z } from 'zod';

const createOrderSchema = z.object({
  userName: z.string(),
  userPhone: z.string(),
  userAddress: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
    }),
  ),
});

export type CreateOrderRequestDTO = z.infer<typeof createOrderSchema>;
