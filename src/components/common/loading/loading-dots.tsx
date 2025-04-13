import styles from '@styles/components/loading.module.scss';

export default function LoadingDots() {
  return (
    <div className={styles.loadingDots}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
