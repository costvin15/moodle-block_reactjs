import React, {useEffect, useState} from 'react';
import Provider from './provider';
import './App.css';
import {Card, CardHeader} from '@material-ui/core';

function App() {
  const [courses, setCourses] = useState([]);

  const getCourseImage = async url => {
    const response = await fetch(url + '?token=' + document.wstoken);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  const getRecentlyAccessedCourses = async () => {
    const {userid} = await Provider.callMoodleWebService('core_webservice_get_site_info');
    const courses = await Provider.callMoodleWebService('core_enrol_get_users_courses', {userid});

    for (const course of courses) {
      course.image = await getCourseImage(course.overviewfiles[0]?.fileurl);
    }

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
      <ul style={{listStyleType: 'none'}}>
        {courses.map((course) => (
          <li>
            <div style={{float: "left", paddingRight: 15}}>
              <Card>
                <CardHeader title={course.displayname} />
                <img src={course.image} height="200" width="345" style={{objectFit: 'cover'}} />
              </Card>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
