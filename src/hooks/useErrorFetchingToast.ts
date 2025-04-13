import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function useErrorFetchingToast(isError: boolean, message?: string) {
  const toast = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: message ?? "Không thể truy xuất dữ liệu. Vui lòng thử lại sau.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError, message, toast]);
}

export default useErrorFetchingToast;
