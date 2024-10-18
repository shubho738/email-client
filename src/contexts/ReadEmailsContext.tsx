
import React from 'react'

type ReadEmailsContextType = {
    read: string[];
    addRead: (emailId: string) => void
    removeRead: (emailId: string) => void
}

export const ReadEmailsContext = React.createContext<ReadEmailsContextType | undefined>(undefined)

export const ReadEmailsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [readEmails, setReadEmails] = React.useState(() => {
        const savedReadEmails = localStorage.getItem('readEmails')
        return savedReadEmails ? JSON.parse(savedReadEmails) : []
    })

    React.useEffect(() => {
        localStorage.setItem('readEmails', JSON.stringify(readEmails))
    }, [readEmails])

    const addRead = (emailId: string) => {
        setReadEmails((prev: string[]) => {
            if (!prev.includes(emailId)) {
                return [...prev, emailId]
            }
            return prev
        })
    }

    const removeRead = (emailId: string) => {
        setReadEmails((prev: string[]) =>
            prev.filter((id) => id !== emailId)
        )
    }

    return (
        <ReadEmailsContext.Provider value={{ read: readEmails, addRead, removeRead }}>
            {children}
        </ReadEmailsContext.Provider>
    )
}

export const useReadEmailsContext = () => {
    const context = React.useContext(ReadEmailsContext)
    if (!context) {
        throw new Error("useReadEmails must be used within a ReadEmailsProvider")
    }
    return context
}
