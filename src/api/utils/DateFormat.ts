import moment from "moment";

export function getNewDateString(){
  return moment().format("DD/MM/YYYY");
}
