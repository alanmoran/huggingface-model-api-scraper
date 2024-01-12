import "dotenv/config";
import { listModels } from "./services/huggingFaceService";

(async () => {
  try {
    await listModels();
    console.log(
      "Data successfully fetched and saved to generated/modelData.json file."
    );
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
})();
