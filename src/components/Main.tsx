'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { generateFakeProducts } from '../utils/faker'; 

type Interest = {
  id: string;
  name: string;
  isChecked: boolean;
};

const ITEMS_PER_PAGE = 6;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [InterestedCategory, setInterestedCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const totalPages = Math.ceil(interests.length / ITEMS_PER_PAGE);

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setInterests((prevInterests) =>
      prevInterests.map((interest) =>
        interest.id === id ? { ...interest, isChecked: !interest.isChecked } : interest
      )
    );
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Paginated interests
  const paginatedInterests = interests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle interested categories
  const handleInterestedCategory = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setInterestedCategory((prev) => [...prev, id]);
    } else {
      setInterestedCategory((prev) => prev.filter((value) => value !== id));
    }
  };

  // Save selected interests to backend
  const handlePostInterestData = async () => {
    try {
      const data = {
        id: localStorage.getItem('id'),
        categories: InterestedCategory,
      };
      console.log(data);

      setButtonState(true);
      setLoading(true);

      const response = await axios.post(`/api/store-category`, data);

      setLoading(false);
      setButtonState(false);

      if (response.data.status) {
        alert('Your interest is successfully saved');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Load saved interests or initialize with fake products
  useEffect(() => {
    const savedInterests = JSON.parse(localStorage.getItem('interests') || '[]') as Interest[];
    if (savedInterests.length > 0) {
      setInterests(savedInterests);
    } else {
      // Generate 100 fake products and initialize interests
      const fakeProducts = generateFakeProducts(100).map((product) => ({
        id: product.id,
        name: product.name,
        isChecked: false,
      }));
      setInterests(fakeProducts);
    }
  }, []);

  // Persist interests in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('interests', JSON.stringify(interests));
  }, [interests]);

  return (
    <div className="w-full pt-[50px] flex justify-center items-center">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-2">Please mark your interests!</h2>
        <p className="text-gray-500 mb-4">We will keep you notified.</p>
        <hr className="w-full border-t border-gray-200 mb-4" />

        <h3 className="text-lg font-medium mb-4">My saved interests!</h3>
        <div className="space-y-2">
          {paginatedInterests.map((interest) => (
            <label key={interest.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={interest.isChecked}
                onChange={(e) => {
                  handleCheckboxChange(interest.id);
                  handleInterestedCategory(e, interest.id);
                }}
                className="form-checkbox h-5 w-5 text-black border-gray-300 rounded"
              />
              <span className={interest.isChecked ? 'font-semibold' : 'text-gray-400'}>
                {interest.name}
              </span>
            </label>
          ))}
        </div>

        <div className="flex space-x-2 mt-4 text-gray-600">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;&lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-2 ${index + 1 === currentPage ? 'font-semibold text-black' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;&gt;
          </button>
        </div>
        <div>
          <button
            className="text-white bg-black w-[200px] h-[2.2rem] m-4 rounded-md"
            disabled={buttonState}
            onClick={handlePostInterestData}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
