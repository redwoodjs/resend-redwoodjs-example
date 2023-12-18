import type { FindEmailById } from 'types/graphql'

import { timeTag } from 'src/lib/formatters'

interface Props {
  email: NonNullable<FindEmailById['email']>
}

const Email = ({ email }: Props) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Email {email.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{email.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(email.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(email.updatedAt)}</td>
            </tr>
            <tr>
              <th>Resend id</th>
              <td>{email.resendId}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{email.to}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{email.from}</td>
            </tr>
            <tr>
              <th>Subject</th>
              <td>{email.subject}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group"></nav>
    </>
  )
}

export default Email
