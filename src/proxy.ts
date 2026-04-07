import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {
    let isAuthenticated = false;
    let isAdmin = false;
    const pathName = request.nextUrl.pathname;
    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        isAdmin = data.user.role === Roles.admin;
    }

    // User is not authenticated and trying to access protected routes
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // User is authenticated but role = ADMIN
    // trying to access user routes without user role
    if (isAdmin && pathName.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    }

    // User is authenticated but role = USER
    // trying to access ADMIN routes without ADMIN role
    if (!isAdmin && pathName.startsWith('/admin-dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/admin-dashboard'],
}