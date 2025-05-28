import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // you are at the server side and  have to target the container of ther service
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // you are in the browser and will have to pass the domain as ''
    return axios.create({
      baseURL: '/',
    });
  }
};
