import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "Auth",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full flex justify-center items-center">
            {children}
        </div>
    );
}
