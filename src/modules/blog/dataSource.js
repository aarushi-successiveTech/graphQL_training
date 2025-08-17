export const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com' }
];

export const posts = [
  {
    id: '101',
    title: 'GraphQL Basics',
    authorId: '1'
  },
  {
    id: '102',
    title: 'Advanced GraphQL',
    authorId: '2'
  }, 
  {
    id: '103', 
    title: 'nested queries', 
    authorId: '3'
  }, 
  {
    id: '104', 
    title: 'apollo graphql', 
    authorId: '2'
  },
];

export const comments = [
  {
    id: '1001',
    content: 'Great intro!',
    postId: '101'
  },
  {
    id: '1002',
    content: 'Looking forward to more.',
    postId: '102'
  }
];