import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', image);

    axios.post('http://localhost:3001/upload', formData)
      .then(response => {
        setImageUrl(response.data.fileUrl);  
      })
      .catch(error => {
        console.error('Şəkil yüklənərkən xəta:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Şəkil Yüklə</button>

      {imageUrl && (
        <div>
          <h3>Şəkil:</h3>
          <img src={`http://localhost:3001${imageUrl}`} alt="Yüklənmiş şəkil" style={{ width: '300px', height: 'auto' }} />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
