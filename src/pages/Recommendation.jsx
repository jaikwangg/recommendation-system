import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Recommendation.css';

const Recommendation = () => {
  const location = useLocation();
  const { images, jsonData } = location.state || {}; // รับทั้ง URL ของภาพและ JSON

  return (
    <div>
      <h1>Recommendations</h1>
      <div className="recommendation-container"> {/* ใช้คลาส recommendation-container */}
        {images && images.map((image, index) => {
          const imageId = image.split('/').pop().split('.')[0]; // ดึง imageId จาก URL ของภาพ
          return (
            <Link
              key={index}
              to={`/image-details/${imageId}`} // ส่งเฉพาะ imageId ไปยังหน้าแสดงรายละเอียด
            >
              <img src={image} alt={`Recommendation ${index + 1}`} />
            </Link>
          );
        })}
      </div>

      {/* แสดงข้อมูล JSON */}
      {/*<pre>{JSON.stringify(jsonData, null, 2)}</pre>*/}
    </div>
  );
};

export default Recommendation;