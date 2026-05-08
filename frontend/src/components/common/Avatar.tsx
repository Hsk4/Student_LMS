import React, { useState } from 'react'
import type { AvatarProps } from '@/types/components'

const DEFAULT_AVATAR = 'https://via.placeholder.com/150?text=User'

const Avatar: React.FC<AvatarProps> = ({
    src ,
    alt = "avatar",
    size = 150
}) => {
    const [imgsrc, setImgsrc] = useState(src || DEFAULT_AVATAR);

   return (
    <img
      src={imgsrc}
      alt={alt}
      width={size}
      height={size}
      onError={() => setImgsrc(DEFAULT_AVATAR)}
      className="rounded-full object-cover"
    />
  );
}

export default Avatar;