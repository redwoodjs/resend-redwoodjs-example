import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import EmailForm from 'src/components/Email/EmailForm'

import type { CreateEmailInput } from 'types/graphql'

const CREATE_EMAIL_MUTATION = gql`
  mutation CreateEmailMutation($input: CreateEmailInput!) {
    createEmail(input: $input) {
      id
    }
  }
`

const NewEmail = () => {
  const [createEmail, { loading, error }] = useMutation(CREATE_EMAIL_MUTATION, {
    onCompleted: () => {
      toast.success('Email created')
      navigate(routes.emails())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateEmailInput) => {
    createEmail({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Email</h2>
      </header>
      <div className="rw-segment-main">
        <EmailForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEmail
