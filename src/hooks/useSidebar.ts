import { closeSidebar, navbarSelector, openSidebar, toggleSidebar } from "@stores/navbar";
import { useDispatch, useSelector } from "react-redux";


// Custom hook for sidebar state management
const useSidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(navbarSelector).isSidebarOpen;


  // Toggle sidebar open/close
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  // Open the sidebar
  const open = () => {
    dispatch(openSidebar());
  };

  // Close the sidebar
  const close = () => {
    dispatch(closeSidebar());
  };

  return {
    isSidebarOpen,
    toggle,
    open,
    close,
  };
};

export default useSidebar;
