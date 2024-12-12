import React, { useRef } from "react";
import HomeService from "../service/HomeService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const homeService = new HomeService();

const SOMETHING_WENT_WRONG = "";
const INSERT_DATA_SUCCESSFULLY = "";

export default function Home() {
  const toastRef = useRef(null);
  const [IsDefault, setIsDefault] = React.useState(true);
  const [row, setRow] = React.useState([]);
  const [id, setId] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleSave = () => {
    let data = {
      id: id,
      runType: document.getElementById("RunType").value,
      release: document.getElementById("Release").value,
      kb: document.getElementById("KB").value,
      build: document.getElementById("Build").value,
      machinepool: document.getElementById("Machinepool").value,
    };

    if (validation(data)) isEdit ? UpdateData(data) : InsertData(data);
  };

  const clearField = () => {
    document.getElementById("RunType").value = "";
    document.getElementById("Release").value = "";
    document.getElementById("KB").value = "";
    document.getElementById("Build").value = "";
    document.getElementById("Machinepool").value = "";
    setIsEdit(false);
  };

  const validation = (data) => {
    let result = true;

    let element = document.getElementById("runtypeHelper");
    if (!data.runType) {
      element.classList.remove("d-none");
      result = false;
    } else element.classList.add("d-none");

    element = document.getElementById("releaseHelper");
    if (!data.kb) {
      element.classList.remove("d-none");
      result = false;
    } else element.classList.add("d-none");

    element = document.getElementById("kbHelper");
    if (!data.build) {
      element.classList.remove("d-none");
      result = false;
    } else element.classList.add("d-none");

    element = document.getElementById("buildHelper");
    if (!data.machinepool) {
      element.classList.remove("d-none");
      result = false;
    } else element.classList.add("d-none");

    element = document.getElementById("machinepoolHelper");
    if (!data.release) {
      element.classList.remove("d-none");
      result = false;
    } else element.classList.add("d-none");

    return result;
  };

  const handleEditData = async (data) => {
    await setIsDefault(true);
    setId(data.id);
    document.getElementById("RunType").value = data.runType;
    document.getElementById("Release").value = data.release;
    document.getElementById("KB").value = data.kb;
    document.getElementById("Build").value = data.build;
    document.getElementById("Machinepool").value = data.machinePool;
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    await DeleteData(id);
  };

  const InsertData = (data) => {
    let _data = data;
    homeService
      .Insert(_data)
      .then((res) => {
        console.log(res);
        clearField();
        handleToastpopUp("Insert Data Successfully", true);
      })
      .catch((err) => {
        console.log(err);
        handleToastpopUp("Something Went Wrong", false)
      });
  };

  const UpdateData = (data) => {
    let _data = data;
    homeService
      .Update(_data)
      .then((res) => {
        console.log(res);
        clearField();
        handleToastpopUp("Update Data Successfully", true);
      })
      .catch((err) => {
        console.log(err);
        handleToastpopUp("Something Went Wrong", false)
      });
  };

  const GetData = () => {
    homeService
      .Get()
      .then((res) => {
        console.log(res.data);
        setRow(res.data);
        handleToastpopUp("Fetch Data Successfully", true);
      })
      .catch((err) => {
        console.log(err);
        handleToastpopUp("Something Went Wrong", false)
      });
  };

  const DeleteData = (id) => {
    homeService
      .Delete(id)
      .then((res) => {
        console.log(res);
        GetData();
      })
      .catch((err) => {
        console.log(err);
        handleToastpopUp("Something Went Wrong", false)
      });
  };

  const handleDisplayData = async () => {
    await GetData();
    setIsDefault(!IsDefault);
  };

  const handleToastpopUp = (message, IsSuccess) => {
    if (toastRef.current) {
      const toastInstance = window.bootstrap.Toast.getOrCreateInstance(
        toastRef.current
      );
      document.getElementById("toastHeader").innerText = "SUCCESS";
      document.getElementById("toastBody").innerText = message;
      document
        .getElementById("liveToast")
        .classList.add(IsSuccess ? "text-bg-primary" : "text-bg-danger");
      toastInstance.show();
    }
  };

  return (
    <div className="container bg-light p-5 mt-5">
      {IsDefault && (
        <div>
          <div className="mb-3 h4 w-100 text-center">Sample OCAS Page</div>
          <div className="mb-4 w-50">
            <label htmlFor="RunType" className="form-label">
              Runtype
            </label>
            <input type="text" className="form-control" id="RunType" />
            <div id="runtypeHelper" className="form-text text-danger d-none">
              Required *
            </div>
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="Release" className="form-label">
              Release
            </label>
            <input type="text" className="form-control" id="Release" />
            <div id="releaseHelper" className="form-text text-danger d-none">
              Required *
            </div>
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="KB" className="form-label">
              KB
            </label>
            <input type="text" className="form-control" id="KB" />
            <div id="kbHelper" className="form-text text-danger d-none">
              Required *
            </div>
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="Build" className="form-label">
              Build
            </label>
            <input type="text" className="form-control" id="Build" />
            <div id="buildHelper" className="form-text text-danger d-none">
              Required *
            </div>
          </div>
          <div className="mb-4 w-50">
            <label htmlFor="Machinepool" className="form-label">
              Machinepool
            </label>
            <input type="text" className="form-control" id="Machinepool" />
            <div
              id="machinepoolHelper"
              className="form-text text-danger d-none"
            >
              Required *
            </div>
          </div>
          <div className="mb-3">
            <button
              className="btn btn-primary rounded-0"
              onClick={() => {
                handleSave();
              }}
            >
              Save
            </button>
            <button
              className="btn btn-dark ms-5 rounded-0"
              onClick={() => {
                handleDisplayData();
              }}
            >
              Display
            </button>
          </div>
        </div>
      )}
      {!IsDefault && (
        <div>
          <div className="mb-3">
            <button
              className="btn btn-secondary rounded-0"
              onClick={() => {
                setIsDefault(!IsDefault);
              }}
            >
              Back To Home
            </button>
          </div>
          <table className="table table-striped">
            <thead>
              <tr className="table-row-data">
                <th className="flex-1">Id</th>
                <th className="flex-2">Runtype</th>
                <th className="flex-2">Release</th>
                <th className="flex-2">KB</th>
                <th className="flex-2">Build</th>
                <th className="flex-2">Machinepool</th>
                <th className="flex-2">Setting</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(row) &&
                row.length > 0 &&
                row.map(function (data, index) {
                  return (
                    <tr key={index} className="table-row-data">
                      <td className="flex-1">{data.id}</td>
                      <td className="flex-2">{data.runType}</td>
                      <td className="flex-2">{data.release}</td>
                      <td className="flex-2">{data.kb}</td>
                      <td className="flex-2">{data.build}</td>
                      <td className="flex-2">{data.machinePool}</td>
                      <td className="flex-2">
                        <button
                          className="btn btn-primary rounded-0"
                          onClick={() => {
                            handleEditData(data);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-dark rounded-0 mx-1"
                          onClick={() => {
                            handleDelete(data.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={toastRef}
        >
          <div className="toast-header">
            <strong className="me-auto" id="toastHeader"></strong>
            <small>just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body" id="toastBody"></div>
        </div>
      </div>
    </div>
  );
}
