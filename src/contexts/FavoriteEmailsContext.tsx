
import React from 'react'

type FavoriteEmailsContext = {
    favorites: string[];
    addFavorite: (emailId: string) => void;
    removeFavorite: (emailId: string) => void;
}

    export const FavoriteEmailsContext = React.createContext<FavoriteEmailsContext | undefined>(undefined)


export const FavoriteEmailsContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [favorites, setFavorites] = React.useState(() => {
        
        const savedFavorites = localStorage.getItem('favorites')
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    
    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])

   
    const addFavorite = (emailId: string) => {
        setFavorites((prev: string[]) => {
            if (!prev.includes(emailId)) {
                return [...prev, emailId]
            }
            return prev
        })
    }

    
    const removeFavorite = (emailId: string) => {
        setFavorites((prev: string[]) =>
            prev.filter((id) => id !== emailId)
        )
    }

    return (
        <FavoriteEmailsContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoriteEmailsContext.Provider>
    )
}



export const useFavoriteEmailsContext = () => {
    const context = React.useContext(FavoriteEmailsContext)
    if (!context) {
        throw new Error("useFavorites must be used within a FavoriteProvider")
    }
    return context
}
