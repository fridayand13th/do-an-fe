import { useState } from "react";
import { Badge, Box, HStack, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockStaticProps {
    lang: string;
    title: string;
    request: Record<string, unknown>;
}

export default function CodeBlockStatic({ request, title, lang }: Readonly<CodeBlockStaticProps>) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    return (
        <Box mb={4} p={3} borderRadius="md" boxShadow="md" overflow="hidden" bg="gray.50">
            <HStack p={2} bg="gray.100" borderRadius="md" justifyContent="space-between">
                <Text fontWeight="bold" color="black">
                    {title}
                </Text>
                <Badge
                    variant="outline"
                    borderRadius="md"
                    px={3}
                    py={1}>
                    {lang}
                </Badge>
            </HStack>
            <Tabs index={selectedTabIndex} onChange={setSelectedTabIndex} variant="solid-rounded" mt={2}>
                <TabPanels>
                    <TabPanel px={0} py={0}>
                        <Box
                            maxH="250px"
                            overflowY="auto"
                            sx={{
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'gray.300', 
                                    borderRadius: '4px', 
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background: 'gray.400',
                                },
                            }}
                        >
                            <SyntaxHighlighter
                                language={lang}
                                style={base16AteliersulphurpoolLight}
                                showLineNumbers={true}
                                wrapLines={true}
                                lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                                customStyle={{ margin: 0 }}
                            >
                                {JSON.stringify(request, null, 2)}
                            </SyntaxHighlighter>
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
