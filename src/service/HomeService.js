import AxiosServices from "./AxiosServices";
const axiosServices = new AxiosServices();

const InsertApiURL = "https://localhost:7291/api/Crud/Post";
const UpdateApiURL = "https://localhost:7291/api/Crud/Put";
const GetApiURL = "https://localhost:7291/api/Crud/Get";
const DeleteApiURL = "https://localhost:7291/api/Crud/Delete?Id=";

export default class HomeService {
  Insert(data) {
    return axiosServices.Post(InsertApiURL, data, false);
  }

  Update(data) {
    return axiosServices.Put(UpdateApiURL, data, false);
  }

  Get() {
    return axiosServices.Get(GetApiURL, false);
  }

  Delete(data) {
    return axiosServices.Delete(DeleteApiURL + data, null, false);
  }
}
