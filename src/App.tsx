import { lazy, Suspense } from "react"
import { LanguageProvider } from "@/lib/i18n"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const SceneBackground = lazy(() => import("@/components/SceneBackground"))

function App() {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <SceneBackground className="pointer-events-none fixed inset-0 -z-50 opacity-25" />
      </Suspense>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
