import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
    let isAuthenticated = false;
    let isAdmin = false;
    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard'],
}