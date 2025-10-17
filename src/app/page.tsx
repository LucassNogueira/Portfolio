import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Blog from '@/components/Blog'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import DebugPanel from '@/components/DebugPanel'

export default function Page() {
  return (
    <>
      <Home />
      <About />
      <Projects />
      <Blog />
      <Resume />
      <Contact />
      <Footer />
      <DebugPanel />
    </>
  )
}
