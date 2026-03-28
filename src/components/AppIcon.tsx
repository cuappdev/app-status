import Image from 'next/image';
import { DEFAULT_APP_IMG } from '@/constants';

export default function AppIcon({
  imageUrl = DEFAULT_APP_IMG,
}: {
  imageUrl?: string;
}) {
  return (
    <Image
      src={imageUrl}
      alt="App Icon"
      width={60}
      height={60}
      className="app-icon-shadow rounded-xl w-12 h-12 sm-tablet:h-15 sm-tablet:w-15 object-cover"
    />
  );
}
