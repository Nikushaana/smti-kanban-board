import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import InquiryDetailModal from "./components/modals/InquiryDetailModal";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "SMTI kanban board",
  description: "SMTI kanban board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <InquiryDetailModal />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#333",
                color: "#fff",
                fontSize: "14px",
              },
              success: {
                duration: 2000,
                style: {
                  background: "green",
                  color: "white",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "green",
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "red",
                  color: "white",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "red",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
