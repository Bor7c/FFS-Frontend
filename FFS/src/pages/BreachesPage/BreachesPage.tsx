import {useState, useEffect} from 'react'

import { Breach } from '../../components/Interfaces.ts';
import BreachCard from './BreachCard.tsx';



const Breaches = () => {
    const [Breaches, setBreaches] = useState<Breach[]>([]);

    const searchBreaches = async () => {
        try {

            const response = await fetch(`http://127.0.0.1:8000/breaches/`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    'Cookie': document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('session_id='))
                        .map(c => c.split('=')[1])[0]
                },
                signal: AbortSignal.timeout(1000)
            })
            if (!response.ok) {
                return;
            }
            const breaches: Breach[] = await response.json()
            setBreaches(breaches)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        searchBreaches()
    }, [])


    return (
<>

        <div className="container">
            {Breaches.map((object) => (
                <BreachCard BreachData={object}/>
            ))}
        </div>

        </>
    )
}

export default Breaches;

