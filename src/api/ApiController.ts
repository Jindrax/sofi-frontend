import axios from "axios";
import {userStore} from "src/store/userStore";

export class ApiController {
  static userStore = userStore();

  private static url: string = process.env.NODE_ENV === "development" ? "http://localhost:443" : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
  private static headers: any = {};

  static setToken(token: string) {
    ApiController.headers = {
      headers: {
        Authorization: "Bearer " + token
      }
    }
  }

  static async post(path: string, data: any) {
    console.log(ApiController.url);
    return (await axios.post(ApiController.url + path, data, ApiController.headers)).data;
  }

  static async catalog<T>(path: string): Promise<T[]> {
    console.log(ApiController.headers);
    return (await axios.get(ApiController.url + path + "/catalog", ApiController.headers)).data;
  }

  static async get(path: string) {
    return (await axios.get(ApiController.url + path, ApiController.headers)).data;
  }

  static async patch(path: string, data: any) {
    return (await axios.patch(ApiController.url + path, data, ApiController.headers)).data;
  }

  static async delete(path: string) {
    return (await axios.delete(ApiController.url + path, ApiController.headers)).data;
  }
}
