// interface IUploadFile {
//   success: string
//   file_name: string
// }

// export const uploadFile = async (file: any, type: "post" | "image"): Promise<IUploadFile> => {
//   const formData = new FormData()

//   formData.append("file", file)

//   // console.log(image)
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_FILES_SERVER_URL}/upload/${type}`,
//     {
//       body: formData,
//       method: "POST",
//       headers: {
//         enctype: "multipart/form-data",
//       },
//     }
//   )

//   const json = await resp.json()

//   const { file_name, success } = json

//   if (success)
//     return json
// }
