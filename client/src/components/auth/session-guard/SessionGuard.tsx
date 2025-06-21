"use client";

import { signIn, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
    const { data } = useSession({
        required: true,
    });
    useEffect(() => {
        // @ts-expect-error
        if (data?.error === "RefreshAccessTokenError") {
            signIn("keycloak");
        }
    }, [data]);

    return <>{children}</>;
}