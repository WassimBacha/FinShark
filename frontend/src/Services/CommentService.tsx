import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { handlEerror } from "../Helpers/ErrorHandler";

const api = "https://localhost:7051/backend/comment/";

export const commentPostAPI = async (
  title: string,
  content: string,
  symbol: string
) => {
  try {
    const data = await axios.post<CommentPost>(api + `${symbol}`, {
      title: title,
      content: content,
    });
    return data;
  } catch (error) {
    handlEerror(error);
  }
};

export const commentGetAPI = async (symbol: string) => {
  try {
    const data = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
    return data;
  } catch (error) {
    handlEerror(error);
  }
};