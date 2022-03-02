import axios from "axios";

async function getPresignedUrl(file) {
  const params = new URLSearchParams();
  params.append("filename", file.name);
  params.append("filetype", file.type);

  const response = await axios.get(
    "https://38s9wt4cb8.execute-api.ap-southeast-2.amazonaws.com/default/getPresignedURL",
    {
      params: {
        filename: file.name,
        filetype: file.type,
      },
    }
  );

  const presignedUrl = response.data.uploadURL;
  return presignedUrl;
  // axios
  //   .post("http://localhost:5000/api/s3/upload", {
  //     filename: file.name,
  //     filetype: file.type,
  //   })
  //   .then(function (result) {
  //     var signedUrl = result.data.data;

  //     var options = {
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //     };

  //     console.log(signedUrl);

  //     return axios.put(signedUrl, file, options);
  //   })
  //   .then(function (result) {
  //     console.log(result);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
}

async function pushFileToS3(presignedUrl, file) {
  // axios
  //   .post("http://localhost:5000/api/s3/upload", {
  //     filename: file.name,
  //     filetype: file.type,
  //   })
  //   .then(function (result) {
  //     var signedUrl = result.data.data;

  //     var options = {
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //     };

  //     console.log(signedUrl);

  //     return axios.put(signedUrl, file, options);
  //   })
  //   .then(function (result) {
  //     console.log(result);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
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
