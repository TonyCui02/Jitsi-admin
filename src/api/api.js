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

// Functions for amplify backend
async function getTour(username, tourID) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/tour_${tourID}`;

  return await API.get(apiName, path);
}

async function getUserTours(username) {
  const apiName = "toursApi";
  const path = `/tours/user_${username}`;
  const params = {
    queryStringParameters: {
      skBeginsWith: "tour",
    },
  };

  return await API.get(apiName, path, params);
}

async function putTour(username, tourID, itemsData, tourName, tourPreviewImg) {
  const apiName = "toursApi";
  const path = "/tours";
  const myInit = {
    body: {
      PK: "user_" + username,
      SK: "tour_" + tourID,
      tourData: itemsData,
      tourName: tourName,
      tourPreviewImg: tourPreviewImg,
    },
  };

  return await API.put(apiName, path, myInit);
}

async function postTour(username, tourID, itemsData, tourName, tourPreviewImg) {
  const apiName = "toursApi";
  const path = "/tours";
  const myInit = {
    body: {
      PK: "user_" + username,
      SK: "tour_" + tourID,
      tourData: itemsData,
      tourName: tourName,
      tourPreviewImg: tourPreviewImg,
    },
  };

  return await API.post(apiName, path, myInit);
}

async function delTour(username, tourID) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/tour_${tourID}`;

  return await API.del(apiName, path);
}

export {
  getPresignedUrl,
  pushFileToS3,
  getTour,
  putTour,
  postTour,
  getUserTours,
  delTour,
};
