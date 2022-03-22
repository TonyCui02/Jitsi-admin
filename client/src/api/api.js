import axios from "axios";

async function getPresignedUrl(file) {
  try {
    const response = await axios.get("https://r91ns3kje6.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedUrl", {
      params: {
        filename: file.name,
        filetype: file.type,
      },
    });
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

export { getPresignedUrl, pushFileToS3 };
