# faux

mock api

# Example of POST request payload

```js
payload = {
  seed: 1,
  limit: 2,
  page: 1,
  locale: "de",
  data: [
    {
      name: {
        value: "fullname",
        options: {
          firstName: "Joann",
        },
      },
      assets: "vehicles",
      bornAt: { value: "past", options: { years: 25 } },
      job: { value: "jobTitle" },
    },
    "users",
    "products",
    "vehicles",
    "Borat",
  ],
};
```
