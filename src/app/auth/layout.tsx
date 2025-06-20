// src/app/auth/layout.tsx

import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-layout">
            {/* You can add common layout elements here if needed */}
            {children}
        </div>
    );
}
