import jwt from "jsonwebtoken";

import type { Credential, JwtPayload } from "@/shared/types/auth.type";

export class JwtHelper {
  private static readonly SECRET = "mySecretKey";

  static generateCredential(payload: JwtPayload): Credential {
    const accessToken = jwt.sign(payload, JwtHelper.SECRET);

    return {
      accessToken,
    };
  }

  static verify(token: string) {
    const payload = jwt.verify(token, JwtHelper.SECRET);
    return payload as JwtPayload;
  }
}
