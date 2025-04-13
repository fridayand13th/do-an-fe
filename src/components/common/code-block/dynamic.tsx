import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { BiCopy } from "react-icons/bi";
import { Box, HStack, IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from "@chakra-ui/react";
import RequestMethodPill from "@components/common/api-badge";
import { IApiKeyGuide } from "@@types/containers/api-key-guide";
import { replaceKeywordWithKey } from "@utils/common";
import { base16AteliersulphurpoolLight, coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockDynamicProps {
    request: IApiKeyGuide;
    apiKey?: string;
    theme?: "dark" | "light";
}

export default function CodeBlockDynamic({ request, apiKey, theme = "light" }: Readonly<CodeBlockDynamicProps>) {
    const toast = useToast();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleCopy = () => {
        const textToCopy = request.sampleRequest[selectedTabIndex]?.content || "";
        navigator.clipboard.writeText(textToCopy);
        toast({
            title: "클립보드에 복사되었습니다.",
            position: "top-right",
            status: "info",
            duration: 2000,
            isClosable: true,
        });
    };
    return (
        <Box mb={4} p={3} borderRadius="md" boxShadow="md" overflow="hidden" bg={theme === "dark" ? "gray.700" : "gray.50"}>
            <HStack p={2} bg={theme === "dark" ? "gray.900" : "gray.100"} borderRadius="md">
                {request.method && (
                    <RequestMethodPill method={request.method} />
                )}
                {request.endpoint && (
                    <Text fontWeight="bold" color={theme === "dark" ? "gray.200" : "black"}>
                        {request.endpoint}
                    </Text>
                )}
            </HStack>
            <Tabs index={selectedTabIndex} onChange={setSelectedTabIndex} variant="solid-rounded" mt={2}>
                <HStack justifyContent="space-between">
                    <TabList>
                        {request.sampleRequest.map((item) => (
                            <Tab
                                key={item.lang_type}
                                fontSize="sm"
                                color={theme === "dark" ? "gray.200" : "black"}
                                _selected={{ bg: theme === "dark" ? "gray.800" : "gray.200" }} 
                                _hover={{ bg: theme === "dark" ? "gray.600" : "gray.100" }} 
                            >
                                {item.lang_type}
                            </Tab>
                        ))}
                    </TabList>
                    <IconButton
                        aria-label="Copy code"
                        icon={<BiCopy />}
                        size="sm"
                        onClick={handleCopy}
                        variant="outline"
                        color={theme === "dark" ? "white" : "black"}
                        _hover={{ bg: theme === "dark" ? "gray.600" : "gray.100" }}
                    />
                </HStack>
                <TabPanels>
                    {request.sampleRequest.map((item) => (
                        <TabPanel key={item.lang_type} px={0} py={0}>
                            <Box
                                maxH="300px"
                                overflowY="auto"
                                my={2}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        background: theme === "dark" ? "gray.900" : "gray.50",
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: theme === "dark" ? 'gray.500' : 'gray.300', 
                                        borderRadius: '4px',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        background: theme === "dark" ? 'gray.600' : 'gray.400',
                                    },
                                }}
                            >
                                <SyntaxHighlighter
                                    language={item.lang_type}
                                    style={theme === "dark" ? coldarkDark : base16AteliersulphurpoolLight}
                                    showLineNumbers={true}
                                    wrapLines={true}
                                    lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                                    customStyle={{ margin: 0 }}
                                >
                                    {replaceKeywordWithKey(item.content.replace(/\\n/g, '\n'), apiKey, "YOUR_API_KEY")}
                                </SyntaxHighlighter>

                            </Box>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </Box>
    );
}
