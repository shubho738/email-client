
import { useFavoriteEmailsContext } from "../../contexts/FavoriteEmailsContext"

type Props = {
  emailId: string;
}

const MarkFavorite = ({emailId}: Props) => {

  const {favorites ,addFavorite, removeFavorite} = useFavoriteEmailsContext()

  const isFavorite = favorites.includes(emailId)

  const handleClick = async (emailId: string) => {
    try {
      if (isFavorite) {
        removeFavorite(emailId)
        return
      }
      addFavorite(emailId)
    } 
    
   catch (error) {
      console.error("Error updating favorite status:", error);
    }
  }

  return (
    <button
      style={{
        background: "var(--clr-accent)", 
        color: "var(--clr-neutral-light)", 
        paddingBlock: ".25rem", 
        paddingInline: ".65rem",
        border: "1px solid var(--clr-border)",
        borderRadius: "1rem",
        cursor: "pointer"
      }}
      
      onClick={() => handleClick(emailId)}
    >
      {isFavorite ? "Remove from favorite" : "Mark as favorite"}
    </button>
  )
}

export default MarkFavorite