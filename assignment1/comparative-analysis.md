# comparative analysis between REST API and GraphQL
- let's consider the dataset contains : users, posts and comments 
1. Data Fetching: 
- Rest API: requires multiple end points(eg. /users, /users/:id)
- Graphql: requires single endpoint(/graphql) with flexible queries 

2. over-fetching / under-fetching: 
- Rest API: Often returns more or less data than needed; can't customize fields
- Graphql: Client specifies exactly what fields are needed thus, no over/under-fetching

3. Nested Data Handling: 
- Rest API: Requires multiple API calls or joins
- Graphql: Can fetch nested related data in a single query

4. versioning: 
- Rest API: Often requires creating new versions
- Graphql: No versioning needed i.e schema evolves with type changes

5. Performance: 
- Rest API: Can be slower due to multiple network requests
- Graphql: More efficient with a single request and less payload

Thus, GraphQL gives more control, flexibility, and efficiency when working with nested data while, 
REST is simpler for basic use cases but can become inefficient as data relationships get deeper.