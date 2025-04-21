import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { Box, HStack } from "@chakra-ui/react";
import PaginatedTable from "@components/common/tables/paginatedTable";
import { useLoadingContext } from "@contexts/loadingContext";
import useErrorFetchingToast from "@hooks/useErrorFetchingToast";
import usePopup from "@hooks/usePopup";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PER_PAGE } from "@constants/paginate";
import { searchTask } from "@containers/task/query";
import TaskPopup from "@containers/task/popup";
import { ITaskInfo } from "@@types/containers/request";
import { TaskColumns } from "@components/task/colunms";
import { TaskSearchForm } from "@components/common/search-filter";

function SearchPage() {
  const router = useRouter();
  const { query } = router;

  const currentPage = Number(query.page) || DEFAULT_CURRENT_PAGE;
  const perPage = Number(query.perPage) || 10;

  const { openPopup, closePopup } = usePopup();
  const { loading, startLoading, stopLoading } = useLoadingContext();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Tất cả");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: currentData,
    refetch,
    isError,
  } = searchTask({
    page: currentPage,
    take: perPage,
    name,
    status,
    startDate,
    endDate,
  });

  const handleRowClick = (task: ITaskInfo) => {
    openPopup({
      isOpen: true,
      Component: TaskPopup,
      props: {
        taskId: task.id,
        onClose: () => {
          closePopup();
          setTimeout(() => refetch(), 200);
        },
      },
      type: "confirm",
      popupOptions: {
        size: "md",
        isCentered: true,
      },
    });
  };

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch().finally(() => stopLoading());
    }, 500),
    [refetch, stopLoading],
  );

  useEffect(() => {
    startLoading();
    debouncedRefetch();
  }, [currentPage, perPage, name, status, startDate, endDate]);

  useErrorFetchingToast(isError);

  return (
    <Box w="full">
      <TaskSearchForm
        onSearch={(filters) => {
          setName(filters.name);
          setStatus(filters.status == "Tất cả" ? "Tất cả" : filters.status);
          setStartDate(filters.startDate);
          setEndDate(filters.endDate);
        }}
      />
      <PaginatedTable
        data={currentData}
        columns={TaskColumns()}
        loading={loading}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}

export default SearchPage;
