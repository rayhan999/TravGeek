import axios from "axios";
import { API_ROOT } from "../consts/consts";
import toast from "react-hot-toast";

const makeAPICalls = async (api, dataSetter, loaderSetter) => {
  let success = false;
  let attempts = 0;

  while (!success && attempts < 10) {
    try {
      const response = await axios.get(`${API_ROOT}${api}`);
      if (response.status === 200) {
        success = true;
        // console.log("API call successful");
        dataSetter && dataSetter(response.data);
        loaderSetter && loaderSetter(false);
        // Process the data or update state
      } else {
        // console.log("API call failed");
        attempts++;
      }
    } catch (error) {
      // console.error("API call failed with error:", error);
      attempts++;
    }
  }

  if (!success) {
    toast.error("API ColdStart Issue. Please Reload");
    // Handle the case where the API call was not successful after multiple attempts
  }
};
export default makeAPICalls;
