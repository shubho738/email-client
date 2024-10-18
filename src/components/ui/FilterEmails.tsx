
type Props = {
    filter: 'all' | 'read' | 'unread' | 'favorites';
    setFilter: (filter: 'read' | 'unread' | 'favorites') => void;
  };
  
  const FilterEmails = ({ filter, setFilter }: Props) => {

    const filterOptions: ('read' | 'unread' | 'favorites')[] = ['unread', 'read', 'favorites']

  return (
    <nav 
      className="filter-emails"
      style={{display: "flex", gap: "1rem", alignItems: "center"}}
    >
      <span>Filter By:</span>

      {filterOptions.map(option => (
        <button 
          key={option}
          onClick={() => setFilter(option)}
          style={{
            background: filter === option ? "var(--clr-btn)" : "transparent", 
            paddingBlock: ".25rem",
            paddingInline: ".5rem",
            fontSize: "var(--fs-450)", 
            border: "none", 
            borderRadius: "1rem",
            cursor: "pointer"
        }}
        >
        {option}
      </button>
      ))}
    </nav>
  )
}

export default FilterEmails
  