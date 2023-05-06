const Footer = () => {
  const date = new Date()
  const year = new Intl.DateTimeFormat('en-US', {
    year: 'numeric'
  }).format(date)

  return (
    <footer className="footer">
        <p>Expressive</p>
        <p>&copy; {year}</p>
    </footer>
  )
}

export default Footer
