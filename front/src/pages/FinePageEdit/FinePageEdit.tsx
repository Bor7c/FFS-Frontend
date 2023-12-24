import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./FinePageEdit.scss"
import { useFine } from "../../hooks/useFine";

const statuses: any = {
  active: 1,
  removed: 2,
};

const FinePageEdit = () => {
    const { id } = useParams();
    const FineId = id ? parseInt(id, 10) : null;
    const { fine, fetchFine, sentFine } = useFine();

    const navigate = useNavigate();

    const [fineData, setFineData] = useState({
        title: '',
        image: null, // для файла изображения используем null в качестве начального значения
        text: '',
        price: '',
        status: 'active', // начальное состояние с текстовым значением
    });

    useEffect(() => {
        if (FineId !== null) {
            fetchFine(FineId);
        }
    }, [FineId, fetchFine]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const update = (e.target.type === 'file') ? e.target.files[0] : value;
        setFineData({ ...fineData, [name]: update });
    };

    const handleStatusChange = (e: any) => {
        // Меняем статус на текстовое представление для отображения
        setFineData({ ...fineData, status: e.target.value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        const formData = new FormData();
        
        formData.append('title', fineData.title);
        formData.append('text', fineData.text);
        formData.append('price', fineData.price);
        // Преобразуем текстовое значение статуса в соответствующее ему числовое значение
        formData.append('status', statuses[fineData.status]);
        
        // Добавляем файл, если он был выбран
        if (fineData.image) {
            formData.append('image', fineData.image);
        }
        
        if (FineId !== null) {
            sentFine(FineId, formData).then(() => {
                navigate("/fines");
            });
        }
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
                    onChange={handleChange}
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
};

export default FinePageEdit;
