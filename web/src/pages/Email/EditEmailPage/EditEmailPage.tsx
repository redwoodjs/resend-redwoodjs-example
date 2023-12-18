import EditEmailCell from 'src/components/Email/EditEmailCell'

type EmailPageProps = {
  id: string
}

const EditEmailPage = ({ id }: EmailPageProps) => {
  return <EditEmailCell id={id} />
}

export default EditEmailPage
