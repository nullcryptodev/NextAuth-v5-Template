export const TABLES = {
  users: "users",
  user_avatars: "huddle-user-avatars",
} as const;

export type TableName = typeof TABLES[keyof typeof TABLES];