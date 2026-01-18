export enum Role {
  customer = "customer",
  admin = "admin",
}

export type User = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
};
