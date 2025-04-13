import { Card, useColorModeValue } from '@chakra-ui/react';

export default function AuthCard({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Card
            mx={2}
            py={6}
            px={3}
            boxShadow="xl"
            bg={useColorModeValue("white", "gray.800")}
            align="center"
        >
            {children}
        </Card>
    );
}
