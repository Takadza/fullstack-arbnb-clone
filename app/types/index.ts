import {User } from "@prisma/client";

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerrified"
> &{
    createdAt: string;
    updatedA: string;
    emailVerified: string | null;
};