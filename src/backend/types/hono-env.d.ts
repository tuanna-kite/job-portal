import type { AdminCtx } from "@/backend/context";
import type { Undefinable } from "@/shared/types/utils.type";

declare module "hono" {
  interface Env {
    Variables: {
      admin: Undefinable<AdminCtx>;
    };
  }
}
