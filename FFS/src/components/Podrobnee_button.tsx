import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import "../styles/Podrobnee_button.scss"

export default class Podrobnee_button extends Component {
  render() {
    return (
        <Button variant="primary" className="podrobnee_button">Подробнее</Button>
    )
  }
}
