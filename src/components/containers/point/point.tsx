import { meSelector } from '@stores/me';
import { useSelector } from 'react-redux';
import styles from '@styles/components/point.module.scss';
import { setComma } from 'src/utils/common';

export default function Point() {
  const { point, name } = useSelector(meSelector);

  return (
    <div className={styles.pointContainer}>
      {name}님은 현재 {setComma(point)} 포인트를 보유중입니다.
    </div>
  );
}
