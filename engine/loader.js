import { SimpleDirectoryReader } from "llamaindex";

//Read all of the documents in a directory.
// * By default, supports the list of file types
//txt,pdf,csv,md,docx,htm,html,jpg,jpeg,png,gif
export const getData = async (directoryPath) => {
  return await new SimpleDirectoryReader().loadData({
    directoryPath: directoryPath,
  });
};
