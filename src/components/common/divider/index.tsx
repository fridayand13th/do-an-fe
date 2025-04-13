import {
  Divider as ChakraDivider,
  StackDivider,
  DividerProps,
  Text,
  StackDividerProps,
} from '@chakra-ui/react';
import styles from '@styles/components/divider.module.scss';

export default function TextDivider({
  text,
  textBgColor,
}: {
  text?: string;
  textBgColor?: string;
}) {
  return (
    <div className={styles.dividerContainer}>
      <ChakraDivider></ChakraDivider>
      {text && (
        <Text bgColor={textBgColor || '#fff'} className={styles.dividerText}>
          {text}
        </Text>
      )}
    </div>
  );
}
