import { Badge } from "@chakra-ui/react";

const RequestMethodPill = ({ method }: { method?: string }) => {
    const methodColors = {
        GET: "green",
        POST: "blue",
        PUT: "orange",
        DEL: "red",
        DEFAULT: "gray"
    };

    return (
        <Badge
            variant="outline"
            colorScheme={methodColors[method as keyof typeof methodColors] || methodColors.DEFAULT}
            borderColor={methodColors[method as keyof typeof methodColors] || methodColors.DEFAULT}
            borderWidth="1px" 
            borderRadius="md"
            px={3}
            py={1}
            textAlign="center"
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="extrabold"
            minW="65px" 
        >
            {method}
        </Badge>
    );
};

export default RequestMethodPill;
