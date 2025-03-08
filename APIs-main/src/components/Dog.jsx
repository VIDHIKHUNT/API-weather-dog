import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreeds, fetchSubBreeds, fetchBreedImage, fetchSubBreedImage } from '../features/dogSlice';
import { useNavigate } from 'react-router-dom';

const Dog = () => {
    const dispatch = useDispatch();
    const { breeds, subBreeds, breedImage, loading, error } = useSelector((state) => state.dog);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedSubBreed, setSelectedSubBreed] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBreeds());
    }, [dispatch]);

    const handleBreedChange = (e) => {
        const breed = e.target.value;
        setSelectedBreed(breed);
        setSelectedSubBreed('');
        dispatch(fetchSubBreeds(breed));
        dispatch(fetchBreedImage(breed));
    };

    const handleSubBreedChange = (e) => {
        const subBreed = e.target.value;
        setSelectedSubBreed(subBreed);
        dispatch(fetchSubBreedImage({ breed: selectedBreed, subBreed }));
    };

    return (
        <div>
            <h1>Dog Breed Selector</h1>

            <select onChange={handleBreedChange} value={selectedBreed}>
                <option value="">Select a breed</option>
                {breeds.map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
            </select>

            {subBreeds.length > 0 && (
                <select onChange={handleSubBreedChange} value={selectedSubBreed}>
                    <option value="">Select a sub-breed</option>
                    {subBreeds.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                    ))}
                </select>
            )}

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {breedImage && <img src={breedImage} alt="Dog" style={{ maxWidth: '300px', maxHeight: '300px' }} />}
            <button onClick={() => navigate('/')}>Go To Weather API</button>
            <button onClick={() => navigate('/movie')}>Go To Movie API</button>
        </div>
    );
};

export default Dog;
