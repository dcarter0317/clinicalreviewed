import Topbar from './layout/topbar';
import NavBar from './layout/navbar';
import Hero from './layout/hero';
import About from './layout/about';
import Services from './layout/services';
import Testimonials from './layout/testimonials';
import Plans from './layout/plans';
import Contact from './layout/contact';
import Styleguide from './styleguide/styleguide';
import Welcome from './layout/welcome';
import Footer from './layout/footer';

function App() {
  // Tiny router: /styleguide (or /#/styleguide) shows the component reference.
  if (window.location.pathname === `${import.meta.env.BASE_URL}styleguide` || window.location.hash === '#/styleguide') {
    return <Styleguide />
  }

  return (
    <>
      <Topbar />
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Plans /> 
      <Contact />
      <Welcome />
      <Footer />
    </>
  )
}

export default App
