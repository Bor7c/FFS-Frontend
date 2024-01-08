import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FineAddPage.scss"

import { useFine } from "../../hooks/useFine";


const statuses: any = {
  active: 1,
  removed: 2,
};

const AddFinePage = () => {
 
    const { createFine } = useFine();
    

    const [fileData, setFileData] = useState(null); // новое состояние для файла

    const navigate = useNavigate();
    const [submitSuccess, setSubmitSuccess] = useState(false);


    const [fineData, setFineData] = useState({
        title: '',
        image: null, // для файла изображения используем null в качестве начального значения
        text: '',
        price: '',
        status: 'active', // начальное состояние с текстовым значением
    });



    useEffect(() => {
        let timer: any;
        if (submitSuccess) {
            // Показать сообщение
            const successMessage = document.querySelector('.submit-success-message');
            if (successMessage) successMessage.classList.add('show');
    
            // Скрыть сообщение после 3 секунд
            timer = setTimeout(() => {
                if (successMessage) successMessage.classList.remove('show');
                setSubmitSuccess(false); // Сбросить состояние, чтобы позволить повторное появление в будущем
            }, 3000);
        }
    
        // Очистка таймера, если компонент размонтируется до завершения таймаута
        return () => timer && clearTimeout(timer);
    }, [submitSuccess]); 

    
    

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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (isNaN(fineData.price)) {
            alert("Цена должна быть числом");
            return;
        }
    
        const formData = new FormData();
    
        formData.append('title', fineData.title);
        formData.append('text', fineData.text);
        formData.append('price', fineData.price);
        formData.append('status', statuses[fineData.status]);
    
        if (fileData) {
            formData.append('image', fileData);
        }
    
        createFine(formData).then(() => {
            setSubmitSuccess(true); // Only navigate or handle success if creation was successful
            // navigate("/fines"); // You could navigate to the fines page if required
        }).catch((error) => {
            // Handle error here, e.g., display a message to the user
            console.error("Failed to create fine:", error);
        });
    };
    
    

    const statusOptions = [
        { text: "Действует", value: "active" },
        { text: "Удалён", value: "removed" }
    ];

    return (
        <div className="container-1">
            <h1>Добавить Штраф</h1>
            {submitSuccess && <div className="submit-success-message">Штраф добавлен</div>}
            <form onSubmit={handleSubmit} className="fine-form" encType="multipart/form-data">
                <label htmlFor="title">Заголовок</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={fineData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Цена</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    value={fineData.price}
                    onChange={handleChange}
                    required
                />

                {/* <label htmlFor="status">Статус</label>
                <select
                    className='form select'
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
                </select> */}

                <label htmlFor="image">Картинка</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                />

                <label htmlFor="text">Описание</label>
                <textarea
                    id="text"
                    name="text"
                    value={fineData.text}
                    onChange={handleChange}
                    required
                ></textarea>

                <button type="submit">Добавить Штраф</button>
            </form>
        </div>
    );
};

export default AddFinePage;
