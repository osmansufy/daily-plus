import React ,{useEffect, useState} from 'react';
import {Carousel, Container} from 'react-bootstrap'
import bannerImg from '../assets/img/banner.webp'
import axios from '../axios'
function Banner(props) {

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [carouselItems,setCarouselItems]=useState([])
  useEffect(()=>{
    axios.get('catalogue/offer/?is_featured=true')
    .then(response=>{
           
      setCarouselItems(response.data)
      console.log("banner",response)
      
      
  }).
  catch(error=>{
    console.log(error)

  })
  },[])
    return (
        <section className="banner_sec pb-5">
     

<Container>
  <Carousel activeIndex={index}  onSelect={handleSelect} nextIcon="" prevIcon="">
    {carouselItems && carouselItems.map(item=>(
      <Carousel.Item key={item.id}>
      <img src={item.cover_image_url} className="d-block img-fluid w-100" alt="banner-img" />
      <Carousel.Caption>
        {/* <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
      </Carousel.Caption>
    </Carousel.Item>
    ))}
    
  </Carousel>
  </Container>
      </section>
    );
}

export default Banner;