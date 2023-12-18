import type { FindEmails } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { timeTag, truncate } from 'src/lib/formatters'

const EmailsList = ({ emails }: FindEmails) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Resend id</th>
            <th>To</th>
            <th>From</th>
            <th>Subject</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{truncate(email.id)}</td>
              <td>{timeTag(email.createdAt)}</td>
              <td>{timeTag(email.updatedAt)}</td>
              <td>{truncate(email.resendId)}</td>
              <td>{truncate(email.to)}</td>
              <td>{truncate(email.from)}</td>
              <td>{truncate(email.subject)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.email({ id: email.id })}
                    title={'Show email ' + email.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EmailsList
