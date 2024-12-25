import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetail = () => {
    const { id: studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`https://api.nf-edu.com/students/${studentId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }

                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
                setMessage('Error fetching student data');
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleBackClick = () => {
        navigate('/main'); // Возвращаемся на предыдущую страницу
    };

    if (message) {
        return <div>{message}</div>;
    }

    if (!student) {
        return <div>Yüklənir...</div>;
    }

    const handleEditClick = () => {
        navigate(`/edit-student/${studentId}`); // Переход на страницу редактирования
    };

    return (
        <div style={styles.container}>
            <button onClick={handleBackClick} style={styles.backButton}>← Geri</button>
            <h2>Tələbə haqqında</h2>
            <div style={styles.detail}>
                <p><strong>Ad:</strong> {student.name}</p>
                <p><strong>Soyad:</strong> {student.surname}</p>
                <p><strong>Valideyn Adı:</strong> {student.parentName}</p>
                <p><strong>Institut:</strong> {student.study}</p>
                <p><strong>Sessia:</strong> {student.isSessionOpen ? 'Achig' : 'Bagli'}</p>
                <p><strong>Nastrikaciya olunub:</strong> {student.isNastrfication ? 'Olunub' : 'Olunmayib'}</p>
                <p><strong>Nastrikaciya odenilib:</strong> {student.isNastrficationPayed ? 'Odenilib' : 'Odenilmeyib'}</p>
                <p><strong>Fakulte:</strong> {student.prof}</p>
                <p><strong>Mobile:</strong> {student.mobile}</p>
                <p><strong>Valideyn nömrəsi:</strong> {student.parentMobile}</p>
                <p><strong>Xidmət haqqi:</strong> {student.serviceCost}</p>
                <p><strong>Xidmət haqqi Ödənilmişdir:</strong> {student.servicePayed}</p>
                <p><strong>İl:</strong> {student.year}</p>
                <p><strong>İllik haqqı:</strong> {student.annualCost}</p>
                <p><strong>İllik haqqı Ödənilmişdir:</strong> {student.annualPayed}</p>
                {student.passport && <p><strong>Passport:</strong> <a href={`http://localhost:3000/${student.passport}`} target="_blank" rel="noopener noreferrer">View Passport</a></p>}
                {student.diplom && <p><strong>Diplom:</strong> <a href={`http://localhost:3000/${student.diplom}`} target="_blank" rel="noopener noreferrer">View Diplom</a></p>}
                {student.image && <p><strong>Image:</strong> <a href={`http://localhost:3000/${student.image}`} target="_blank" rel="noopener noreferrer">View Image</a></p>}
            </div>
            <button onClick={handleEditClick} style={styles.button}>Edit Student</button>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '5px 10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    detail: {
        margin: '10px 0',
    },
    button: {
        padding: '10px 15px',
        marginTop: '10px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default StudentDetail;
