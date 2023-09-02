import {User, Listing } from "@prisma/client";


export type SafeListing = Omit<
Listing,
"createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerrified"
> &{
    createdAt: string;
    updatedA: string;
    emailVerified: string | null;
};