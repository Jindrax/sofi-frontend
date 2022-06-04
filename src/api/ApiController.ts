import axios from "axios";
import {userStore} from "src/store/userStore";

export class ApiController {

  private static url: string = process.env.NODE_ENV === "development" ? "http://localhost:443" : location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");

  static async setToken(token: string) {
    const header = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    console.log(header);
    await userStore().setToken(header);
  }

  static async post(path: string, data: any) {
    console.log(ApiController.url);
    console.log(userStore().token);
    return (await axios.post(ApiController.url + path, data, userStore().token)).data;
  }

  static async catalog<T>(path: string): Promise<T[]> {
    console.log(ApiController.url);
    console.log(userStore().token);
    return (await axios.get(ApiController.url + path + "/catalog", userStore().token)).data;
  }

  static async get(path: string) {
    return (await axios.get(ApiController.url + path, userStore().token)).data;
  }

  static async patch(path: string, data: any) {
    return (await axios.patch(ApiController.url + path, data, userStore().token)).data;
  }

  static async delete(path: string) {
    return (await axios.delete(ApiController.url + path, userStore().token)).data;
  }
}
