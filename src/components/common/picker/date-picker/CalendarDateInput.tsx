import { Button } from '@chakra-ui/react';
import styles from '@styles/containers/control-box.module.scss';
import { forwardRef } from 'react';
import { FcCalendar } from 'react-icons/fc';

export const CalendarDateInput = forwardRef(
  (
    {
      value,
      onClick,
    }: { value: any; onClick: (props: any) => any; range: boolean },
    ref: React.LegacyRef<any>,
  ) => {
    return (
      <div className={styles.dateSearchInputWrapper} onClick={onClick}>
        <FcCalendar size={24} />
        <Button
          ref={ref}
          className={styles.dateSearchInputButton}
          color="#000"
          background="none"
          border="none"
          display="flex"
          alignItems="center"
        >
          <span>{value || '날짜를 지정해 주세요'}</span>
        </Button>
      </div>
    );
  },
);
