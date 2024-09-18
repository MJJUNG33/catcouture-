const api = {
  // getProduct function passes the limit and page as a query params to the sever side data on the product page.
  getProducts: async (limit, page) =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/products?limit=${limit}&page=${page}`
    ),
  // getReports function passes accessToken as a query param to server side on the dashboard page
  getReports: async (accessToken) =>
    await fetch(`${process.env.REACT_APP_API_URL}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default api;
