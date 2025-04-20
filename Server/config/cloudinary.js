import { v2 } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

v2.config({
  cloud_name: "db1wbfubj",
  api_key: "832981128216243",
  api_secret: "akazG9r-M98ft81FbOZBavMGnro",
});

export default v2;
