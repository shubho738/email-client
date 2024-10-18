import React from 'react'

import EmailListView from './components/EmailListView/EmailListView'
import EmailBodyView from './components/EmailBodyView/EmailBodyView'
import './App.css'
import FilterEmails from './components/ui/FilterEmails'


export type SelectedEmail = {
  id: string;
  sender: string;
  subject: string;
  date: number;
}

const App = () => {

  const [selectedEmail, setSelectedEmail] = React.useState<SelectedEmail>()
  const [filter, setFilter] = React.useState<'all' | 'read' | 'unread' | 'favorites'>('all')

  const handleEmailSelect = (email: SelectedEmail) => {
    setSelectedEmail(email)
  }

  return (
    <main className={`app ${selectedEmail ? "app--split" : ""} | container`}>
      <FilterEmails filter={filter} setFilter={setFilter} />
      <section className="app__master-pane">
        <EmailListView onEmailSelect={handleEmailSelect} selectedEmailId={selectedEmail?.id ?? ""} filter={filter} />
      </section>

      {selectedEmail && (
        <aside className="app__detail-pane">
          <EmailBodyView email={selectedEmail} />
      </aside>
      )}
    </main>
  )
}

export default App