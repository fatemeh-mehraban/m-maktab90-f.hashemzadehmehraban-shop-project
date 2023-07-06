import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

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
  },
  {
    url: '/4435417.png',
    // caption: 'Slide 2'
  },
  {
    url: '4437611.png',
    // caption: 'Slide 3'
  },
];

const Slideshow = () => {
    return (
      <div className="slide-container py-10 object-contain	">
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <div key={index} className="">
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