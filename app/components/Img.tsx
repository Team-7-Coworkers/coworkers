import Image, { ImageProps } from 'next/image';
import BaseImage from '@/public/images/icons/ic_image.svg';

interface Props extends ImageProps {
  baseImage?: string;
}

export default function Img({
  baseImage = '',
  src,
  alt = '',
  ...props
}: Props) {
  // Error Handler
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.srcset = '';
    target.src = baseImage || BaseImage.src;
  };

  return (
    <Image
      src={src || baseImage || BaseImage}
      alt={alt}
      onError={handleError}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      {...props}
    />
  );
}
