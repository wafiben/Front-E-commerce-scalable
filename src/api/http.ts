export const handleRequest = async <T>(
  url: string,
  method: string,
  data?: any,
) => {
  const option: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(url, option);
  const responseData: T = await response.json();
  return {
    status: response.status,
    ...responseData,
  };
};
