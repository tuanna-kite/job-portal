import { Hono } from "hono";

import { RequestValidation } from "@/backend/validations/request-validation";
import { LoginDto } from "@/shared/validation/auth/login.dto";

const AuthRoute = new Hono().basePath("/api/auth");

AuthRoute.post("/login", RequestValidation.json(LoginDto), (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

AuthRoute.post("/register", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

export default AuthRoute;
