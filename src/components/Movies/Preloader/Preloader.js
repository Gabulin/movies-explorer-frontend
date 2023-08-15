import React, { useEffect, useState } from 'react';
import './Preloader.css'; 

const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="preloader">
      <div className="spinner"></div>
    </div>
  ) : null;
};

export default PreLoader;
