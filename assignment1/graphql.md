# Efficient Data Fetching with GraphQL

## Problem in REST APIs

- Traditional REST APIs often lead to over-fetching or under-fetching:

- Over-fetching: You get more data than needed.
- - Example: Fetching /users gives 20 fields, but you only needed the name and email.

- Under-fetching: You get too little data, forcing multiple requests.
- - Example: Fetching /posts gives post info, but not author details—so you make another call to /users.

- How GraphQL Solves This
- - GraphQL allows clients to ask for exactly what they need—nothing more, nothing less.
- - Example : graphql { post(id: 1) { title author { name } comments { text } } }
- - Thus, No over-fetching (unused fields are excluded)
- - No under-fetching (nested related data is included in one go)