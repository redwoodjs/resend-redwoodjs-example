import type { FindEmailById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Email from 'src/components/Email/Email'

export const QUERY = gql`
  query FindEmailById($id: String!) {
    email: email(id: $id) {
      id
      createdAt
      updatedAt
      resendId
      to
      from
      subject
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Email not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ email }: CellSuccessProps<FindEmailById>) => {
  return <Email email={email} />
}
