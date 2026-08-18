import { Share } from 'lucide-react';
import { FacebookShareButton } from 'react-share';

interface ShareButtonProps {
  url: string;
  title: string;
  hashtags?: string;
}

export default function ShareButton({ url, title, hashtags }: ShareButtonProps) {
  return (
    <FacebookShareButton
      hashtag={hashtags}
      url={url}
      className="!text-textSecondary flex w-fit cursor-pointer gap-2 hover:!text-black"
    >
      <Share size={20} />
      <span className="text-sm">Chia sẻ</span>
    </FacebookShareButton>
  );
}
