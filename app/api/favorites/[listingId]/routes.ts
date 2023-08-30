import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams{
    listingId?: string;
}

export async function POST( request: Request, {params} : {params : IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId ){
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

   

}