import bcrypt from "bcryptjs";

export const checkPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
