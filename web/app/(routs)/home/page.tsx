import CatagoryList from '@/components/Galleryitems/catagorylist';
import HomeShopeItemlist from '@/components/Homeshopeitems/homeshopelist';
import Testimonials from '@/components/Testemonial/testimonial';
import ImageCarousel from '@/components/ImageCarousel/ImageCarousel';
export default function Home() {
    return (
      <main className="">
      
      <ImageCarousel/>
      <CatagoryList/>
      <HomeShopeItemlist/>
      <Testimonials/>
      </main>
    )
  }
