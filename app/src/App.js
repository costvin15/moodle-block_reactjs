import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';
import Provider from './provider';
import './App.css';

function App() {
  const [clicks, setClicks] = useState(0);
  const [courses, setCourses] = useState([]);

  const getRecentlyAccessedCourses = async () => {
    const {userid} = await Provider.callMoodleWebService('core_webservice_get_site_info');
    const courses = await Provider.callMoodleWebService('core_enrol_get_users_courses', {userid});
    courses.sort((a, b) => {
      if (a.lastaccess > b.lastaccess) {
        return -1;
      } else if (a.lastaccess < b.lastaccess) {
        return 1;
      } else {
        return 0;
      }
    });
    setCourses(courses);
  };

  useEffect(() => {
    getRecentlyAccessedCourses();
  }, []);

  return (
    <div className="App">
      {courses.map((course) => (
        <p>{course.displayname}</p>
      ))}
    </div>
  );
}

export default App;
