import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import "../styles/card_item.css"

interface Fine {
    fine_id: number;
    picture_url: string;
    title: string;
    price: string;
    fine_status: string;
    image: string;
}


const FineCard: React.FC<{fineData: Fine}> = ({fineData}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img style={{ width: '100%', height: 'auto' }} variant="top" src={fineData.image} />
      <Card.Body>
        <Card.Title>{fineData.price}₽</Card.Title>
        <Card.Text>
          {fineData.title}
        </Card.Text>
        <Link to={`/fines/${fineData.fine_id}`}>
          <Button variant="primary" >Подробнее</Button>
        </Link>
      </Card.Body>
    </Card>

  )
}

export default FineCard