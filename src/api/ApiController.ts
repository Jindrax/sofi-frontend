import axios from "axios";
import {userStore} from "src/store/userStore";

export class ApiController {
  static userStore = userStore();

  private static url: string = "http://" + location.hostname + ":8443";
  // private static url: string = "https://sofiplus.com.co:8443";

  static async post(path: string, data: any) {
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
