import { useRouter } from "next/router";
import { Tab, TabList, Tabs } from "@chakra-ui/react";

export default function FilterTab({ data }: Readonly<{ data: { value: string, label: string }[] }>) {
    const router = useRouter();
    const { query } = router;
    const selectedTab = query.tab as string || data[0].value;
    const currentIndex = data.findIndex((item) => item.value === selectedTab);

    const handleTabChange = (index: number) => {
        router.push({
            query: { ...router.query, page: 1, tab: data[index].value },
        });
    };

    return (
        <Tabs
            variant="enclosed"
            index={currentIndex}
            onChange={handleTabChange}
        >
            <TabList
                bg="white"
                position="sticky"
                top={0}
                zIndex={0}
                boxShadow="sm"
            >
                {data.map((item) => {
                    const uniqueKey = crypto.randomUUID();
                    return (
                        <Tab key={uniqueKey}>{item.label}</Tab>
                    );
                })}
            </TabList>
        </Tabs>
    );
}
