import { useEffect, useState } from "react";
import {ImageGrid} from "react-fb-image-video-grid";

interface ImageProps {
    images: Array<string>;
    count:number;
  }

const ImageAdd: React.FC<ImageProps> = ({ images ,count}) => {

  const pic = (c: string | undefined, i: number | undefined) => (
    <img style={{ objectFit: "cover" }} src={c} alt={`Image ${i}`} key={i} />
  );
  
  return (
   
      <ImageGrid>
        {images
          .filter((arg, i) => (i + 1 <= count ? true : false))
          .map((a,i) => (pic(a,i)))}
      </ImageGrid>
   
  );
};



export default ImageAdd;