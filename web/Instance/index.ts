import axios from "axios";
import { environment } from "@/environment";

 const instance = axios.create({
    baseURL: environment.production ? environment.prodUrl : environment.devUrl,
  });

  instance.interceptors.request.use(
    (config) => {
      // No Authorization header for an open API
      return config;
    },
    (error) => {
      // router.push('/');
      Promise.reject(error);
    }
  );
  export default instance;
