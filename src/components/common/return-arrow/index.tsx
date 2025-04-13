import { TReturnArrowProps } from '@@types/components/commons/return-arrow';
import { useRouter } from 'next/router';
import { MdArrowBack } from 'react-icons/md';

export default function ReturnArray({
  returnIndex,
  returnPath,
}: TReturnArrowProps) {
  const router = useRouter();

  const handleReturnClick = () => {
    if (returnPath) return router.push(returnPath);
    if (!returnIndex) return;

    const { pathname } = router;
    const pathnames = pathname.split('/');
    const targetPath = pathnames.slice(0, pathnames.length - returnIndex + 1);
    router.push(targetPath.join('/'));
  };
  return (
    <div className="cursor-pointer" onClick={handleReturnClick}>
      <MdArrowBack />
    </div>
  );
}
