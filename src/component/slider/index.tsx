import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useRouter } from "next/router";

const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '700px',
  // objectFit: 'contain'
}
const slideImages = [
  {
    url: '/4435416.png',
    // caption: 'Slide 1'
    link:"/categories/khshkbar"
  },
  {
    url: '/4435417.png',
    // caption: 'Slide 2'
    link:"/categories/qhwh"
    
  },
  {
    url: '4437611.png',
    link:"/categories/adwyh-jat/subcategories/flfl"
    // caption: 'Slide 3'
  },
];

const Slideshow = () => {
const router = useRouter()

    return (
      <div className="slide-container py-10 object-contain	">
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <div key={index} className="cursor-pointer" onClick={()=>{
              router.push(`${slideImage.link}`)
            }}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}
export default Slideshow