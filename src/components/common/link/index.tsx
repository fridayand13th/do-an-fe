import { HiLink } from 'react-icons/hi';

export default function OriginalLink({ href }: { href: string }) {
  return (
    <a
      className="h-full my-auto flex items-center cursor-pointer"
      href={href}
      target="_blank"
    >
      <HiLink />
    </a>
  );
}
