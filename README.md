# Faux

## Overview

This API allows you to generate localized, paginated, and customized data objects. The structure and content of the data are defined in the request payload.

#### Installation

1. Clone the repository to your local machine.

```
$ git clone https://github.com/yourusername/faux.git
$ cd faux
```

```
pnpm i
pnpm dev
```

<sub><sup>**_HMR is not set up yet._**</sup></sub>

---

## API Endpoints

### GET /api

#### Description

Handles get requests with query parameters for generating data.

#### Query Parameters

- **data[locale] (string)**: Localization code. Example: en. refer to [Fakerjs](https://fakerjs.dev/guide/localization.html#available-locales)

- **data[niche] (string)**: Predefined schema name. Example: products. `[
  "users",
  "posts",
  "comments",
  "albums",
  "reviews",
  "todos",
  "addresses",
  "companies",
  "products",
  "payments",
  "vehicles",
  "files",
  "socialmediaprofiles",
  "educationalinstitutions",
  "financialtransactions",
  "healthrecords",
  "realestatelistings",
  "travelplans",
  "recipes",
  "orders"
]`

- **data[limit] (number)**: Number of instances of data objects. Example: 69. min 0. Max 10000.

- **sorting[field] (string)**: Name of the field to sort by. Example: birthdate.
- **sorting[order] (string)**: Order of sorting. Valid values: "desc", "asc".
- **page (number)**: Page number for pagination. Minimum value: 1.
- **options[seed] (number)**: Seed for non-random data generation. Example: 3.

```
/api?data[locale]=en&data[niche]=products&data[limit]=69&sorting[field]=birthdate&sorting[order]=asc&page=2&options[seed]=3
```

### POST /api

#### Description

Handles post requests for generating data with specified parameters.

#### Request Payload

value of `value` prop must be a valid method in fakerjs (it'll figure out what module it belongs to)

```json
{
  "locale": "en",
  "seed": 3,
  "page": 2,
  "limit": 69,
  "data": [
    {
      "name": {
        "value": "fullname",
        "options": {
          "firstName": "Joann"
        }
      },
      "assets": "vehicles",
      "bornAt": {
        "value": "past",
        "options": {
          "years": 25
        }
      },
      "job": {
        "value": "jobTitle"
      }
    },
    "users",
    "products",
    "vehicles"
  ]
}
```

#### Response Code

- **200**: Success.
- **400** Invalid payload/query input.

### Contributing

Contributions are welcome! Please feel free to submit a pull request.

For major changes, please open an issue first to discuss what you would like to change.
