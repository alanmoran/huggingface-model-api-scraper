import fs from "fs";
import { HUGGING_FACE_ACCESS_TOKEN, HUGGING_FACE_HUB_URL } from "../constants";
import { ApiModelInfo } from "../types/huggingFaceServiceTypes";

function getArchitectureString(architectures: any): string {
  if (Array.isArray(architectures)) {
    return architectures.join(",");
  } else if (architectures && Array.isArray(architectures.value)) {
    return architectures.value.join(",");
  }
  return "";
}

function getValueString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value || "";
}

function processModelData(model: ApiModelInfo): any {
  const autotrain = model.tags.includes("autotrain_compatible")
    ? "true"
    : "false";
  const languageStr = getValueString(model.cardData?.language);
  const tagsStr = getValueString(model.cardData?.tags);
  const licenseStr = getValueString(model.cardData?.license);
  const datasetsStr = getValueString(model.cardData?.datasets);

  return {
    _id: model._id,
    id: model.id,
    modelId: model.modelId,
    task: model.pipeline_tag,
    downloads: model.downloads,
    likes: model.likes,
    updatedAt: new Date(model.lastModified).toISOString(),
    tags: model.tags.join(", "),
    libraryName: model.library_name,
    modelType: model.config?.model_type || "",
    modelArch: getArchitectureString(model.config?.architectures),
    tagsStr,
    languageStr,
    licenseStr,
    datasetsStr,
    autotrain,
  };
}

export async function listModels(): Promise<void> {
  const outputFilename = "generated/modelData.json";
  const output = fs.createWriteStream(outputFilename);
  let isFirstBatch = true;

  let url:
    | string
    | null = `${HUGGING_FACE_HUB_URL}/api/models/?full=true&limit=2000&cardData=true&config=true`;

  output.write("["); // Start the JSON array

  while (url) {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${HUGGING_FACE_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const models: ApiModelInfo[] = await response.json();

    for (const model of models) {
      if (!isFirstBatch) {
        output.write(",");
      } else {
        isFirstBatch = false;
      }

      output.write(JSON.stringify(processModelData(model)));
    }

    const linkHeader = response.headers.get("Link");
    url = linkHeader?.match(/<([^>]+)>;\s*rel="next"/)?.[1] || null;
  }

  output.write("]"); // End the JSON array
  output.end();

  console.log("Finished writing to JSON.");
  // Reading the file after it's written
  output.on("finish", async () => {
    try {
      const rawData = await fs.promises.readFile(outputFilename, "utf8");
      const modelsArray = JSON.parse(rawData);
      console.log(`Total models in JSON file: ${modelsArray.length}`);
    } catch (error) {
      console.error("Error reading JSON file:", error);
    }
  });
}
