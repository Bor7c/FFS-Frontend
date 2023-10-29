import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "../styles/styles.css"

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
    // <Card style={{ width: '18rem' }} className="card">
    //   <Card.Img className="background-image" style={{ width: '100%', height: 'auto' }} variant="top" src={fineData.image} />
    //   <Card.Body>
    //     <Card.Title>{fineData.price}₽</Card.Title>
    //     <Card.Text>
    //       {fineData.title}
    //     </Card.Text>
    //     <Link to={`/fines/${fineData.fine_id}`}>
    //       <Button variant="primary" >Подробнее</Button>
    //     </Link>
    //   </Card.Body>
    // </Card>


<div className="card">
    <div className="background-img-white">
      <div className="background-img" style={{backgroundImage: `url(${fineData.image})`}}>
        <div className="background-img-black">
          <div className="box">
            <div className="content">
              <h2>{fineData.price}₽</h2>
              <h3>{fineData.title}</h3>
              <Link to={`/fines/${fineData.fine_id}`}>
                <Button variant="primary" className="full-red-button">Подробнее</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

  )
}

export default FineCard