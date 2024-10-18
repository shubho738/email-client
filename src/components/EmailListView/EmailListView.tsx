
import React from 'react'

import { type EmailListResponse } from '../../types'
import { type SelectedEmail } from '../../App'
import { fetchEmailList } from "../../dataFetch/email"
import { formatDate } from '../../utils'
import './EmailListView.css'
import Avatar from '../ui/Avatar'
import { useFavoriteEmailsContext } from '../../contexts/FavoriteEmailsContext'
import { useReadEmailsContext } from '../../contexts/ReadEmailsContext'


type Props = {
  onEmailSelect: (email: SelectedEmail) => void;
  selectedEmailId: string;
  filter: 'all' | 'read' | 'unread' | 'favorites';
}

const EmailListView = ({onEmailSelect, selectedEmailId, filter}: Props) => {

  const [emails, setEmails] = React.useState<EmailListResponse>()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()


  const {favorites} = useFavoriteEmailsContext()
  const {read: readMails} = useReadEmailsContext()

  const filteredEmails = React.useMemo(() => {

    if (!emails) return []

    switch (filter) {
      case 'read':
        return emails.list.filter((email) => readMails.includes(email.id));
      case 'unread':
        return emails.list.filter((email) => !readMails.includes(email.id));
      case 'favorites':
        return emails.list.filter((email) => favorites.includes(email.id));
      default:
        return emails.list;
    }
  }, [emails, filter, readMails, favorites])



  React.useEffect(() => {
    const fetchEmails = async () => {
      try {
        setIsLoading(true)
        const data: EmailListResponse = await fetchEmailList()
        setEmails(data)
      } 
      
      catch (err:any) {
        setError(err.message)
      } 
      
      finally {
        setIsLoading(false)
      }
    }

    fetchEmails()
  }, [])


  if (isLoading) return <div>Loading emails...</div>

  if (error) return <div>{error}</div>

  return (
    <div className="email-list">
      <ul className="email-list__items">
        {filteredEmails.map(email => (
          <li 
            key={email.id} 
            onClick={() => onEmailSelect({id: email.id, sender: email.from.name, subject: email.subject, date: email.date})}
            className={
              `email-list__item 
              ${selectedEmailId === email.id ? "email-list__item-selected" : ""} 
              ${readMails.includes(email.id) ? "email-list__item-read" : ""}`
            }
          >
            <article className="email-list__article">
              <div>
                <Avatar name={email.from.name} />              
              </div>
              <div>
                <h3 className="email-list__sender">From: <span className="email-list__sender-name">{email.from.name} &lt;{email.from.email}&gt;</span></h3>
                <h4 className="email-list__subject">Subject: <span className="email-list__subject-text">{email.subject}</span></h4>
                <p className="email-list__desc | truncate">{email.short_description}</p>
                <div className="email-list__footer">
                  <time dateTime={new Date(email.date).toISOString()} className="email-list__date">
                    {formatDate(email.date)}
                  </time>
                  {favorites.includes(email.id) && (
                    <span className="email-list__favorite">Favorite</span>
                  )}
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

    </div>
  )

}

export default EmailListView