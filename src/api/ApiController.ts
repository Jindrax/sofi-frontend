import axios from "axios";
import {userStore} from "src/store/userStore";

export class ApiController {
  static userStore = userStore();

  private static url: string = process.env.NODE_ENV==="development"? "http://localhost:443" : location.protocol + "//" + location.hostname + (location.port? ":" + location.port : "");

  static async post(path: string, data: any) {
    console.log("ENV: " + process.env.NODE_ENV);
    console.log("URL:" + ApiController.url);
    return await axios.post(ApiController.url + path, data, ApiController.userStore.token !== "" ? {
      headers: {
        Authorization: "Bearer " + ApiController.userStore.token
      }
    } : {});
  }

  static async catalog<T>(path: string): Promise<T[]> {
    return (await axios.get(ApiController.url + path + "/catalog", ApiController.userStore.token !== "" ? {
      headers: {
        Authorization: "Bearer " + ApiController.userStore.token
      }
    } : {})).data;
  }

}
