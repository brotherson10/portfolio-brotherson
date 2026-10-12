import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brotherson Américo",
  // A redirect stub (Netlify sends "/" to /pt/ or /en/ before this is ever served).
  robots: { index: false, follow: true },
}

export default function RootPage() {
  return (
    <main style={{ padding: "2rem" }}>
      {/* React hoists this into <head>. */}
      <meta httpEquiv="refresh" content="0; url=/pt/" />
      <p>
        <a href="/pt/" style={{ color: "#8fb3ff" }}>
          Português
        </a>{" "}
        ·{" "}
        <a href="/en/" style={{ color: "#8fb3ff" }}>
          English
        </a>
      </p>
    </main>
  )
}
