export interface CardData {
  tags?: string | string[];
  language?: string | string[];
  license?: string;
  datasets?: string | string[];
}

export interface Config {
  architectures: string[];
  model_type: string;
}

export interface ApiModelInfo {
  _id: string;
  id: string;
  cardData: CardData;
  lastModified: string;
  likes: number;
  private: boolean;
  sha: string;
  config: Config;
  downloads: number;
  tags: string[];
  pipeline_tag: string;
  library_name: string;
  siblings: { rfilename: string }[];
  modelId: string;
}
export type Task =
  | "text-classification"
  | "token-classification"
  | "table-question-answering"
  | "question-answering"
  | "zero-shot-classification"
  | "translation"
  | "summarization"
  | "conversational"
  | "feature-extraction"
  | "text-generation"
  | "text2text-generation"
  | "fill-mask"
  | "sentence-similarity"
  | "text-to-speech"
  | "automatic-speech-recognition"
  | "audio-to-audio"
  | "audio-classification"
  | "voice-activity-detection"
  | "depth-estimation"
  | "image-classification"
  | "object-detection"
  | "image-segmentation"
  | "text-to-image"
  | "image-to-text"
  | "image-to-image"
  | "unconditional-image-generation"
  | "video-classification"
  | "reinforcement-learning"
  | "robotics"
  | "tabular-classification"
  | "tabular-regression"
  | "tabular-to-text"
  | "table-to-text"
  | "multiple-choice"
  | "text-retrieval"
  | "time-series-forecasting"
  | "visual-question-answering"
  | "document-question-answering"
  | "zero-shot-image-classification"
  | "graph-ml"
  | "other";
