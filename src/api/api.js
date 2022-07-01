import axios from "axios";
import { API, Storage } from "aws-amplify";
import { cuttlyErrors } from "./cuttlyErrors.js";

async function getPresignedUrl(file, username, tourID) {
  try {
    let filename = `user_${username}/tour_${tourID}/${file.name}`;
    console.log(filename);
    const response = await axios.get(
      "https://r91ns3kje6.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedUrl",
      {
        params: {
          filename: filename,
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

async function getUserProfile(username) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/profile_${username}`;

  return await API.get(apiName, path);
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

async function putProfile(username, domain_url) {
  const apiName = "toursApi";
  const path = "/tours";
  const myInit = {
    body: {
      PK: "user_" + username,
      SK: "profile_" + username,
      domain_url: domain_url,
    },
  };

  return await API.put(apiName, path, myInit);
}

async function postTour(
  username,
  tourID,
  tourUrl,
  itemsData,
  tourName,
  tourPreviewImg
) {
  const apiName = "toursApi";
  const path = "/tours";
  const myInit = {
    body: {
      PK: "user_" + username,
      SK: "tour_" + tourID,
      tourData: itemsData,
      tourName: tourName,
      tourUrl: tourUrl,
      tourPreviewImg: tourPreviewImg,
    },
  };

  return await API.post(apiName, path, myInit);
}

async function delTour(username, tourID) {
  const apiName = "toursApi";
  const path = `/tours/object/user_${username}/tour_${tourID}`;

  let apiDelResponse = {};

  try {
    apiDelResponse = await API.del(apiName, path);
    console.log(apiDelResponse);

    const items = await Storage.list(`user_${username}/tour_${tourID}`);
    console.log(items);
    items.forEach((item) => {
      try {
        Storage.remove(item.key);
        console.log("Successfully removed item: " + item.key);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return apiDelResponse;
}

async function shortenUrl(url) {
  console.log("Received url for shortening: " + url);
  const endpoint = `https://1o13z2dby3.execute-api.ap-southeast-2.amazonaws.com/default/shortenUrl?url=`;
  const encoded = encodeURIComponent(url);
  // console.log(encoded)
  // console.log(encoded.length)

  try {
    const urlResponse = await axios.post(endpoint + encoded);
    const data = urlResponse.data;

    console.log("Received data from url shortening lambda: ");
    console.log(data);

    const cuttlyStatus = data.url.status;
    if (urlResponse.status === 200 && cuttlyStatus === 7) {
      return { status: cuttlyStatus, url: data.url.shortLink };
    } else {
      return {
        status: cuttlyStatus,
        url: "",
        error: cuttlyErrors[cuttlyStatus],
      };
    }
  } catch (error) {
    console.error("Error occured due to: " + error);
    return null;
  }
}

export {
  getPresignedUrl,
  pushFileToS3,
  getTour,
  putTour,
  postTour,
  getUserTours,
  delTour,
  getUserProfile,
  putProfile,
  shortenUrl,
};
