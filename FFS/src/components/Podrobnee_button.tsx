import React from 'react'
import { Button } from 'react-bootstrap'
import "../styles/Podrobnee_button.scss"

const Podrobnee_button: React.FC<{Btext: any}> = ({Btext}) => {
  return (
    <Button variant="primary" className="podrobnee_button">{Btext}</Button>
  )
}

export default Podrobnee_button

