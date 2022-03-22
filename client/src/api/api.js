import axios from "axios";

async function getPresignedUrl(file) {
  const params = new URLSearchParams();
  params.append("filename", file.name);
  params.append("filetype", file.type);

  const response = await axios.get(
    process.env.PRESIGNED_URL_LAMBDA,
    {
      params: {
        filename: file.name,
        filetype: file.type,
      },
    }
  );

  const presignedUrl = response.data.uploadURL;
  return presignedUrl;
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
