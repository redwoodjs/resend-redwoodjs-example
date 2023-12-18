import EmailCell from 'src/components/Email/EmailCell'

type EmailPageProps = {
  id: string
}

const EmailPage = ({ id }: EmailPageProps) => {
  return <EmailCell id={id} />
}

export default EmailPage
