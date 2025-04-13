import { TServiceCardProps } from '@@types/components/commons/cards';
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import TextDivider from '@components/common/divider';
import styles from '@styles/components/service-list.module.scss';

export default function ServiceCard({
  isEmpty = false,
  title,
  children,
  buttonText,
  onClick,
  className,
}: TServiceCardProps) {
  return (
    <Card maxW="sm" className={className} onClick={onClick} position="relative">
      <Heading className={styles.servicePlanTitle}>{title}</Heading>
      <CardBody className={`${styles.serviceCardBody}`}>
        <Stack spacing="4" divider={<TextDivider text="세부 사항" />}>
          <Heading size="md" className="text-center mb-8">
            <Stack spacing="3.75rem">{buttonText}</Stack>
          </Heading>

          <Box>{children}</Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
