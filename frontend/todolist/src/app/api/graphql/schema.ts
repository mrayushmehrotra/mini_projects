const typeDefs = `#graphql
  type Task {
id: !ID 
  taskName:String 
  description: String 
  }
  type Query {
tasks[Task]
  }
type Mutation {
createTask(input: TaskInput!): Task
}
`;

export default typeDefs;
