import prisma from "@/app/libs/prismadb"
import {NextResponse } from "next/server";
import bycrpt from "bcrypt"

export async function POST(
    request: Request
){
    const body = await request.json();
    const{
        email,
        name,
        password
    } = body;

    const hashedPassword = await  bycrpt.hash(password, 12);

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}
    
