export const schema = gql`
  type Email {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    resendId: String!
    to: String!
    from: String!
    subject: String!
  }

  type Query {
    emails: [Email!]! @requireAuth
    email(id: String!): Email @requireAuth
  }

  input CreateEmailInput {
    to: String!
    from: String!
    subject: String!
  }

  input UpdateEmailInput {
    resendId: String
    to: String
    from: String
    subject: String
  }

  type Mutation {
    createEmail(input: CreateEmailInput!): Email! @requireAuth
  }
`
