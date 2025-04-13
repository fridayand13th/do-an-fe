import { FC } from 'react';
import { Heading, Icon, Link, Stack, Text } from '@chakra-ui/react';
import AuthCard from '@components/common/cards/auth-card';

interface NotificationCardProps {
  title: string;
  description: string;
  redirectLink?: string;
  redirectText?: string;
  icon: React.ElementType;
  iconColor?: string;
  iconSize?: number | string;
}

const NotificationCard: FC<NotificationCardProps> = ({
  title,
  description,
  redirectLink,
  redirectText,
  icon,
  iconColor = "blue.600",
  iconSize = 16
}) => {
  return (
    <AuthCard>
      <Stack align="center" w="60%" my={10}>
        <Icon as={icon} boxSize={iconSize} color={iconColor} mb={4} />
        <Heading fontSize="4xl" color="blue.600" textAlign="center">{title}</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {description}
        </Text>
        {redirectLink && redirectText && (
          <Text fontSize="sm">
            <Link color="blue.400" href={redirectLink}>
              {redirectText}
            </Link>
          </Text>
        )}
      </Stack>
    </AuthCard>
  );
};

export default NotificationCard;
