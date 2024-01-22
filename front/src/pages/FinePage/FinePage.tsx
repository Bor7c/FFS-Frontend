import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./FinePage.scss"
import { useFine } from "../../hooks/useFine";
import { mockFines } from '../../assets/Mock';



const FinePage = () => {
    const { id } = useParams();
    const FineId = id ? parseInt(id, 10) : 0;
    const {fine, fetchFine,setFine} = useFine()
    useEffect(() => {
        if (FineId !== null) {
            fetchFine(FineId)
        }
    }, [FineId]);
    
    if (!fine) {
        const mockFine = mockFines.find(fine => fine.id === FineId);
        if (mockFine) {
            setFine(mockFine);
        } else {
            return <div>Fine not found</div>;
        }
    }

    
    return (
        <div className="container-2">
            <span className='circle-image'>
                <img src={fine.image} alt=""/>
            </span>

            <h1 className="short_text">{fine.title}</h1>

            <hr className="line" />

            <div className="container">
                <p className="info">
                    {fine.text}
                </p>
            </div>
        </div>

    );
  };


export default FinePage;
