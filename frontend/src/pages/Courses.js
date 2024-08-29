import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../App.css'; 

const Courses = () => {
    console.log("in courses")
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (!token) {
      // If no token is provided, redirect to sign-in page
      navigate('/sign-in');
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/courses`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: 'include'
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setCourses(data); 
        }else if (response.status === 401 || response.status === 400) {
            // If token is invalid or expired, redirect to sign-in page
            navigate('/sign-in');
        } else {
          window.alert('Failed to fetch courses.');
        }
      } catch (error) {
        console.error('Error fetching courses:', error.message);
        window.alert('An error occurred while fetching courses.');
      }
    };

    fetchCourses();
  }, [navigate]); //token,

  return (
    <div className="courses-container">
      <h1 className="welcome-message">Welcome to FreeCodeCamp! Excited to learn something new today?</h1>
      {courses.length > 0 ? (
        <ul className="courses-list">
          {courses.map((course, index) => (
            <li key={index} className="courses-list-item">
              <h2 className="course-name">{course.name}</h2>
              <div className="course-details">
              <p className="course-detail">
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p className="course-detail">
                <strong>Duration:</strong> {course.duration} hours
              </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Courses;
