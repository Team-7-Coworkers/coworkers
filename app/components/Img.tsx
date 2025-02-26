import Image, { ImageProps } from 'next/image';
import NoImage from '@/public/images/icons/ic_image.svg';

interface Props extends ImageProps {
  baseImage?: string;
  isPlaceholder?: boolean;
}

const blurDataURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

export default function Img({
  baseImage = '',
  src,
  alt = '',
  isPlaceholder = false,
  ...props
}: Props) {
  // Error Handler
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.srcset = '';
    target.src = baseImage || NoImage.src;
  };

  return (
    <Image
      src={src || baseImage || NoImage}
      alt={alt}
      onError={handleError}
      placeholder={isPlaceholder ? 'blur' : 'empty'}
      {...(isPlaceholder && { blurDataURL: blurDataURL })}
      {...props}
    />
  );
}
