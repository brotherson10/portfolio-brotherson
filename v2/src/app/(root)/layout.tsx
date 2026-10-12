import type { ReactNode } from "react"

// Root route only: sends visitors to the default edition. Production will use a
// language-aware redirect on the host (see DESIGN-SYSTEM.md, Routing).
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT">
      <body style={{ background: "#0b0c0f", color: "#ece8e1", fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
