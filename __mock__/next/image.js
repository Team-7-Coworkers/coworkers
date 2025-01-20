import React from 'react';

const MockedImage = ({ src, alt, width, height, layout, ...props }) => {
  const style =
    layout === 'fill'
      ? {
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: props.objectFit || 'cover',
        }
      : { width: width || 'auto', height: height || 'auto' };

  return <img src={src} alt={alt} style={style} {...props} />;
};

export default MockedImage;
