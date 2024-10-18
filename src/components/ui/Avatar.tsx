
type Props = {
  name: string;
}

const Avatar = ({name}: Props) => {

  return (
    <div 
      style={{
        background: "var(--clr-accent)", 
        color: "#fff", 
        width: "40px", 
        height: "40px", 
        borderRadius: "50%", 
        display: "grid", 
        placeItems: "center"
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export default Avatar