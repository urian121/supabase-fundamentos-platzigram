"use client";

import Image from "next/image";

interface UserAvatarProps {
  src: string;
  username: string;
}

export default function UserAvatar({ src, username }: UserAvatarProps) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary shrink-0">
      <Image
        src={src}
        alt={username}
        fill
        className="object-cover"
      />
    </div>
  );
}
