import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./FinePageEdit.scss"
import "./FinePage.scss"
import { useFine } from "../../hooks/useFine";
import { useAuth } from '../../hooks/useAuth';

const statuses: any = {
  active: 1,
  removed: 2,
};

const FinePage = () => {
    const {is_moderator} = useAuth()
    const { id } = useParams();
    const FineId = id ? parseInt(id, 10) : null;
    if(!is_moderator){

    
        const {fine, fetchFine} = useFine()
    
        useEffect(() => {
            if (FineId !== null) {
                fetchFine(FineId)
            }
        }, [FineId]);
    
        if (!fine) {
            return <div>Loading...</div>;
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
    }

    if(is_moderator){
    
    const { fine, fetchFine, sendFine } = useFine();
    

    const [fileData, setFileData] = useState(null); // новое состояние для файла

    const navigate = useNavigate();


    const [fineData, setFineData] = useState({
        title: '',
        image: null, // для файла изображения используем null в качестве начального значения
        text: '',
        price: '',
        status: 'active', // начальное состояние с текстовым значением
    });

    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        // Загружаем данные только один раз
        if (FineId !== null && !isDataFetched) {
            fetchFine(FineId).then(() => {
                // после получения данных устанавливаем isDataFetched в true
                setIsDataFetched(true);
            });
        }
    }, [FineId, isDataFetched]);

    useEffect(() => {
        // Обновляем форму, когда данные fine изменились
        if (fine && isDataFetched) {
            setFineData({
                title: fine.title || '',
                image: fine.image || null,
                text: fine.text || '',
                price: fine.price || '',
                status: fine.status ? (fine.status === statuses.active ? 'active' : 'removed') : 'active',
            });
        }
    }, [fine, isDataFetched]);

    
    

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const update = (e.target.type === 'file') ? e.target.files[0] : value;
        setFineData({ ...fineData, [name]: update });
    };

    const handleStatusChange = (e: any) => {
        // Меняем статус на текстовое представление для отображения
        setFineData({ ...fineData, status: e.target.value });
    };


    const handleFileChange = (e: any) => {
        // Когда пользователь выбирает файл, сохраняем его в состояние
        const file = e.target.files[0];
        if(file) {
            setFileData(file); // сохраняем файл, а не url
            // Также обновите fineData, чтобы сохранить имя файла
            setFineData({ ...fineData, image: file.name }); // предполагаем, что sendFine использует имя файла
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
    
        formData.append('title', fineData.title);
        formData.append('text', fineData.text);
        formData.append('price', fineData.price);
        formData.append('status', statuses[fineData.status]);
    
        if (fileData) {
            formData.append('image', fileData);
        }
    
        sendFine(FineId, formData).then(() => {
            // navigate("/fines");
        });
    };
    
    

    const statusOptions = [
        { text: "Действует", value: "active" },
        { text: "Удалён", value: "removed" }
    ];

    return (
        <div className="container-1">
            <h1>Edit Fine</h1>
            <form onSubmit={handleSubmit} className="fine-form" encType="multipart/form-data">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={fineData.title}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={fineData.price}
                    onChange={handleChange}
                />

                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={fineData.status}
                    onChange={handleStatusChange}
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>

                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                />

                <label htmlFor="text">Description</label>
                <textarea
                    id="text"
                    name="text"
                    value={fineData.text}
                    onChange={handleChange}
                ></textarea>

                <button type="submit">Update Fine</button>
            </form>
        </div>
    );
    }
};

export default FinePage;
