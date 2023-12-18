import type { FindEmailById, UpdateEmailInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormEmail = NonNullable<FindEmailById['email']>

interface EmailFormProps {
  email?: FindEmailById['email']
  onSave: (data: UpdateEmailInput, id?: FormEmail['id']) => void
  error: RWGqlError
  loading: boolean
}

const EmailForm = (props: EmailFormProps) => {
  const onSubmit = (data: FormEmail) => {
    props.onSave(data, props?.email?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormEmail> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="to"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          To
        </Label>

        <TextField
          name="to"
          defaultValue={
            props.email?.to ||
            'RedwoodJS Mailer Service <onboarding@resend.dev>'
          }
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="to" className="rw-field-error" />

        <Label
          name="from"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          From
        </Label>

        <TextField
          name="from"
          defaultValue={
            props.email?.from ||
            'RedwoodJS Mailer Service <onboarding@resend.dev>'
          }
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="from" className="rw-field-error" />

        <Label
          name="subject"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Subject
        </Label>

        <TextField
          name="subject"
          defaultValue={props.email?.subject || 'Test Email'}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="subject" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default EmailForm
