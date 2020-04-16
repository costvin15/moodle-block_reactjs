export const callMoodleWebService = async (wsfunction, ...params) => {
  var url = `${document.wwwroot}/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=${wsfunction}`;

  if (typeof params.wstoken === 'undefined') {
    const token = document.wstoken;
    if (token) {
      url += `&wstoken=${token}`;
    }
  }

  params.forEach(param => {
    Object.keys(param).forEach(key => {
      url += `&${key}=${param[key]}`;
    });
  });

  const response = await fetch(url);
  const data = await response.json();

  if (data.errorcode) {
    throw data;
  }

  return data;
};

export default {callMoodleWebService};
