import api from "./api-instance";

export const uploadBodyImage = async () => {
  return api.post("/posts", { data: "example" });
};
