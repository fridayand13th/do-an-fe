import styles from '@styles/containers/dashboard.module.scss';
import moment from 'moment';

export default function CollectRegisterInfoHeader({
  title,
}: {
  title: string;
}) {
  return (
    <div className={styles.collectRegisterInfoHeader}>
      <p className={styles.dashboardCardTitle}>{title}</p>
      <p>
        (이번달: {moment().startOf('month').format('YYYY-MM-DD')} ~{' '}
        {moment().endOf('month').format('YYYY-MM-DD')})
      </p>
    </div>
  );
}
