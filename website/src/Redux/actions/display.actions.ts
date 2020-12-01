export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const toggleSidebar = (isOpen?: boolean) => ({
  type: TOGGLE_SIDEBAR,
  payload: { isOpen },
});
