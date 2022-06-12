import axios from "axios";
import { API } from "aws-amplify";

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

async function shortenUrl(url) {
  let cuttlyApiKey = process.env.REACT_APP_PROD_CUTTLY_KEY;
  try {
    const res = await axios.get(
      `http://cutt.ly/api/api.php?key=${cuttlyApiKey}&short=${url}`
    );
    console.log(res);
    let data = res.data;
    let status = data?.url?.status;
    let shortLink;
    if (status === 7) {
      shortLink = data?.url?.shortLink;
      // console.log(shortLink)
      return shortLink;
    } else {
      console.error("error fetching from cuttly API");
      return "";
    }
  } catch (err) {
    console.error(err);
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
