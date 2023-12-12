import React from 'react'
import { Button } from 'react-bootstrap'
import "./CustomButton.scss"

const CustomButton = ({text, onClick}) => {
  return (
    <Button variant="primary" className="podrobnee_button" onClick={onClick}>{text}</Button>
  )
}

export default CustomButton

