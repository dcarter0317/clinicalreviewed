import Topbar from './layout/topbar';
import Nav from './layout/nav';
import Header from './layout/header'
import Hero from './layout/hero'
import About from './layout/about';
import Services from './layout/services';
import Testimonials from './layout/testimonials';
import Plans from './layout/plans';
import Contact from './layout/contact';
import Styleguide from './styleguide/styleguide';

function App() {
  // Tiny router: /styleguide (or /#/styleguide) shows the component reference.
  if (window.location.pathname === '/styleguide' || window.location.hash === '#/styleguide') {
    return <Styleguide />
  }

  return (
    <>
      <Topbar />
      <Nav />
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Plans /> 
      <Contact />
    </>
  )
}

export default App
