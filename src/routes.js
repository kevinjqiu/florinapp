const routes = {
  "/": "Home",
  "/dashboard": "Dashboard",

  "/accounts": "Accounts",
  "/accounts/new": "New",
  "/accounts/[0-9a-f-]+/view": "View",

  "/transactions": "Transactions",
  "/transactions/new": "New",
  "/transactions/[0-9a-f-]+/view": "View",

  "/settings/general": "General",

  "/settings/categories": "Categories",
  "/settings/categories/new": "New",
  "/settings/categories/.+/view": "View",

  "/settings/tags": "Tags",
  "/settings/sync": "Sync"
};
export default routes;
