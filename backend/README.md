# Spendings Tracker API

## Prerequisite Knowledge
- All dates are returned in the form `YYYY-MM-DD`
- All timestamps are returned in the form `YYYY-MM-DD HH:MM:SS`
- All API responses have a similar object form, where `data` differs based on route:
````
{
    metadata: {
        currentPage: int
        pageSize: int
        totalCount: int
        totalPages: int
        links: {
            first: String
            prev: String
            self: String
            next: String
            last: String
        }
    },
    ok: boolean,
    message: String,
    httpStatus: HttpStatus,
    data: T
}
````

## API Endpoints

### Login user
- HTTP Method: `POST`
- Endpoint: `/v1/auth/login/`
- Post body:
````
{
    username: String,
    password: String
}
````
- Purpose:
  - Login user if valid credentials are provided.
  - Upon successful login, set JWT cookie in Headers of response
- Response structure of `data`:
````
{
    userId: long,
    authorities: List<GrantedAuthority>,
    username: String,
    enabled: boolean,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    credentialsNonExpired: boolean
}

````
### List view
- HTTP Method: `GET`
- Endpoint: `/v1/api/spendings/`
- Query Params (* *Optional*):
  - `start-date`* (Default value: `1000-01-01`)
  - `end-date`* (Default value: `9999-12-31`)
  - `group-by`* (Default value: `D`)
  - `type`* (Default value: `N`)
  - `page`* (Default value: `0`)
  - `limit`* (Default value: `25`)
- Purpose:
  - Displays all spendings in a list form.
  - The details of each spending under a certain day can be viewed with the Details endpoint
- Response structure of `data`:
  - If `type` is `N`:
    ````
    [
        {
            spendingUserAggrId: long,
            date: Date,
            total: BigDecimal
        },
        {
            spendingUserAggrId: long,
            date: Date,
            total: BigDecimal
        },
        ...
    ]
    ````
  - If `type` is `C`:
    ````
    [ 
      {
        category: String,
        total: BigDecimal
      },
      {
        category: String,
        total: BigDecimal
      },
      ...
    ]
    ````

### Spendings Detail
- HTTP Method: `GET`
- Endpoint: `/v1/api/spendings/{spending-date}`
- Path Variables:
    - `spending-date`
- Purpose:
    - Displays the details of a specific spending for a user on a certain date.
- Response structure of `data`:
````
[
    {
        spendingId: long
        category: String
        amount: BigDecimal
        delete: boolean
    },
    {
        spendingId: long
        category: String
        amount: BigDecimal
        delete: boolean
    },
    ...
]
````

### Update spending
- HTTP Method: `PUT`
- Endpoint: `/v1/api/spendings/{spending-date}`
- Path Variables:
    - `spending-date`
- Post body:
````
[
    {
        spendingId: long
        category: String
        amount: BigDecimal
        delete: boolean
    },
    {
        spendingId: long
        category: String
        amount: BigDecimal
        delete: boolean
    },
    ...
]
````
- Purpose:
    - Update an already existing spending.

### Create a new spending
- HTTP Method: `POST`
- Endpoint: `/v1/api/spendings/{spending-date}`
- Path Variables:
    - `spending-date`
- Post body:
````
[
    {
        category: String
        amount: BigDecimal
    },
    {
        category: String
        amount: BigDecimal
    },
    ...
]
````
- Purpose:
    - Create a new spending.

### Delete spending
- HTTP Method: `DELETE`
- Endpoint: `/v1/api/spendings/{spending-user-aggr-id}`
- Path Variables:
  - `spending-user-aggr-id`
- Purpose:
  - Delete an entire spending day.
