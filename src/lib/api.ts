// utility function which will make the api calls

export const fetcher = async ({ url, body, method, json = true }) => {
  const res = await fetch(url, {
    method: method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Api failed!");
  } else {
    let result = await res.json();

    return result.data;
  }
};

export const signup = async (user) => {
  return await fetcher({ url: "/api/signup", body: user, method: "POST" });
};

export const signin = async (user) => {
  return await fetcher({ url: "/api/signin", body: user, method: "POST" });
};
