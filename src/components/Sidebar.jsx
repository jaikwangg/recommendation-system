import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import { X } from 'lucide-react';
import ThemeToggle from './ThemeToggle'; // Ensure this path is correct

import '../assets/styles/Sidebar.css';

const Sidebar = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recommendedImages, setRecommendedImages] = useState([]);
  const [fileName, setFileName] = useState("No selected file");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);//URL
  const [showUploadSection, setShowUploadSection] = useState(true); //add


  const handleFileChange = (event) => {
    // setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file != null) {
      setFileName(file.name);
      setSelectedFile(file);
      setUploadedImage(URL.createObjectURL(file));
    }
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      alert('กรุณาเลือกไฟล์ก่อน!');
      return;
    }

    // สร้าง form data เพื่อส่งไปยัง API
    const formData = new FormData();
    formData.append('img', selectedFile); // ใช้ 'img' เป็น key ตามที่ API กำหนด

    try {
      // ส่งคำขอ POST ไปยัง API
      const response = await axios.post('http://ffancy.xyz:5000/api/predict/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // จัดการผลลัพธ์ที่ได้จาก API ที่นี่ (เช่น การตั้งค่า URL รูปภาพ)
      const resultData = response.data;//รับเป็น json
      const imageUrls = response.data.similar_images.map((item) =>
        `http://ffancy.xyz:5000/static/images/${item.image}`
      );

      setImages(imageUrls); // อัปเดตสถานะด้วย URL ของภาพที่คล้ายกัน
      //navigate('/Recommendation');
      //navigate('/recommendation', { state: { images: imageUrls } });
      navigate('/recommendation', { state: { images: imageUrls, jsonData: resultData } });
      setShowUploadSection(false);//add

    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error); // จัดการข้อผิดพลาดที่เกิดขึ้น
    }
  };

  const handleNewUpload = () => {
    // รีเซ็ตค่าทั้งหมดเพื่อให้สามารถอัปโหลดภาพใหม่ได้

    // รีเซ็ตค่าที่จำเป็นสำหรับการอัพโหลดใหม่
    setFileName("No selected file");
    setSelectedFile(null);
    setUploadedImage(null);
    setImages([]); // รีเซ็ต URL ของภาพที่แนะนำ
    setShowUploadSection(true); // แสดงส่วนการอัพโหลดใหม่
    //setShowSidebar(true); // แสดง Sidebar ใหม่
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: isHovered ? '#e0e0e0' : '#ffffff',
    border: 'none',
    color: '#333',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease', // Smooth transition effect
    borderRadius: '4px'
  };

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const toggleModal = () => {
    if (isModalOpen) {
      // ถ้า modal ถูกเปิดอยู่ ก็ให้ทำการรีเซ็ตเมื่อปิด modal
      handleNewUpload();
    }
    setIsModalOpen(!isModalOpen);
  };


  return (
    <div className="container">
      <nav className="sidebar">
        <ul className="">
          <Link to="/">
            <h1 style={{
              fontSize: '35px',
              textAlign: 'left',
              margin: '20px',
              padding: 0
            }}>
              Fashion Recommender
            </h1>
          </Link>
        </ul>

        <button
          onClick={toggleModal}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={buttonStyle}
        >
          Upload File
        </button>
        <ThemeToggle />
      </nav>

      {isModalOpen && showUploadSection && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <button
              onClick={toggleModal}
              style={{
                position: 'absolute',
                left: '250px',
                top: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <X size={24} color="#333" />
            </button>

            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}>

              <p>Upload your photo</p>

              <form
                className="upload-form"
                onClick={() => document.querySelector(".input-field").click()}
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  height: '200px',
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backgroundColor: '#f8f8f8'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="input-field"
                  hidden
                  onChange={handleFileChange}
                />

                {uploadedImage ? (
                  <img src={uploadedImage}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '180px',
                      objectFit: 'contain'
                    }}
                    alt={fileName}
                  />
                ) : (
                  <>
                    <MdCloudUpload color="#333" size={60} />
                    <p style={{
                      margin: '10px 0 0',
                    }}>Browse Files to upload</p>
                  </>
                )}
              </form>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#666'
              }}>
                <AiFillFileImage />
                <span>{fileName}</span>
                {fileName !== "No selected file" && (
                  <MdDelete
                    onClick={() => {
                      setFileName("No selected file");
                      setUploadedImage(null);
                      setSelectedFile(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </div>

              <button
                onClick={handleUpload}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#8C8C8C',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#666666'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#8C8C8C'}
              >
                Get Recommendations
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="content">
        {/* Other page content */}
      </div>
    </div>
  );
};

export default Sidebar;