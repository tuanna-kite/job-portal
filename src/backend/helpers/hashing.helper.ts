import bcrypt from "bcrypt";

export class HashingHelper {
  private static readonly SALT_ROUNDS = 10;

  static hash(data: string | Buffer) {
    return bcrypt.hash(data, HashingHelper.SALT_ROUNDS);
  }

  static verify(data: string, encrypted: string) {
    return bcrypt.compare(data, encrypted);
  }
}
