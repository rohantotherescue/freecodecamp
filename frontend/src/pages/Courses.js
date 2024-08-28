import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Courses = () => {
    console.log("in courses")
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
//   const location = useLocation();
//   const token = location.state?.token;

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    // console.log('Cookie get:', Cookies.get('jwtToken'));
    if (!token) {
      // If no token is provided, redirect to sign-in page
      console.log("token is null here");
      navigate('/sign-in');
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            credentials: 'include'
          },
        });

        console.log("response came \n");
        console.log(response);
        if (response.status === 200) {
          const data = await response.json();
          setCourses(data); 
        }else if (response.status === 401 || response.status === 400) {
            // If token is invalid or expired, redirect to sign-in page
            navigate('/sign-in');
        } else {

          console.error('Failed to fetch courses.');
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
    <div className="container mt-5">
      <h1>Courses</h1>
      {courses.length > 0 ? (
        <ul className="list-group">
          {courses.map((course, index) => (
            <li key={index} className="list-group-item">
              {course.name} {/* Display course details here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default Courses;
