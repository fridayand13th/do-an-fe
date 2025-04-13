import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function MovePointPageButton() {
  const router = useRouter();
  const handlePointRedirect = () => {
    router.push('/services/point');
  };
  return (
    <Button size="sm" className="danger-button" onClick={handlePointRedirect}>
      포인트 충전하러 가기
    </Button>
  );
}
