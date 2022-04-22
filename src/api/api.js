import axios from "axios";
import { API } from "aws-amplify";

async function getPresignedUrl(file) {
  try {
    const response = await axios.get(
      "https://r91ns3kje6.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedUrl",
      {
        params: {
          filename: file.name,
          filetype: file.type,
        },
      }
    );
    console.log(response);
    const presignedUrl = response.data.uploadURL;
    console.log(presignedUrl);
    return presignedUrl;
  } catch (err) {
    console.log(err);
  }
}

async function pushFileToS3(presignedUrl, file) {
  console.log(file);
  const options = {
    headers: {
      "Content-Type": file.type,
    },
  };
  const response = await axios.put(presignedUrl, file, options);
  return response;
}

function getTour(username, tourID) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/tour_${tourID}`;

  return API.get(apiName, path);
}

function getUserTours(username) {
  const apiName = "toursApi";
  const path = `/tours/user_${username}`;

  return API.get(apiName, path);
}

function putTour(username, tourID, itemsData, tourName) {
  const apiName = "toursApi";
  const path = "/tours";
  const myInit = {
    body: {
      PK: "user_" + username,
      SK: "tour_" + tourID,
      tourData: itemsData,
      tourName: tourName
    },
  };

  return API.put(apiName, path, myInit);
}

function delTour(username, tourID) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/tour_${tourID}`;

  return API.del(apiName, path);
}

export { getPresignedUrl, pushFileToS3, getTour, putTour, getUserTours, delTour };
