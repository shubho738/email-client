
import React from 'react'

import { type EmailBodyResponse } from "../../types"
import { type SelectedEmail } from '../../App'
import { useReadEmailsContext } from "../../contexts/ReadEmailsContext"
import { fetchEmailBody } from "../../dataFetch/email"
import { formatDate } from '../../utils'
import './EmailBodyView.css'
import Avatar from '../ui/Avatar'
import MarkFavorite from '../ui/MarkFavorite'

type Props = {
  email: SelectedEmail;
}

const EmailBodyView = ({email}: Props) => {

  const [emailContent, setEmailContent] = React.useState<EmailBodyResponse>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()

  const { addRead } = useReadEmailsContext()


  React.useEffect(() => {
    const fetchEmail = async () => {
      try {
        setIsLoading(true)
        const data: EmailBodyResponse = await fetchEmailBody(email.id)
        setEmailContent(data)
        addRead(email.id)
      } 
      
      catch (err:any) {
        setError(err.message)
      } 
      
      finally {
        setIsLoading(false)
      }
    }

    fetchEmail()
  }, [email.id, addRead])


  if (isLoading) return (
    <article className="email-body">
        <div>
          <Avatar name={email.sender} />
        </div>
        <div className="email-body__details">
          <h2 className="email-body__subject">Loading...</h2>
          <time className="email-body__date">Loading...</time>
          <div className="email-body__content">
            <p>Loading content...</p>
          </div>
        </div>
    </article>
  )

  if (error) return <div>{error}</div>


  return (
    <article className="email-body">

      <div>
        <Avatar name={email.sender} />
      </div>

      <div className="email-body__details">
        <div className="email-body__header">
          <div>
            <h2 className="email-body__subject">{email.subject}</h2>
            <time 
              dateTime={new Date(email.date).toISOString()}
              className="email-body__date" 
            >
              {formatDate(email.date)}
            </time>
          </div>

          <MarkFavorite emailId={email.id} />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: emailContent?.body ?? "" }}
          className="email-body__content"
        />
      </div>
    </article>
  )
}

export default EmailBodyView