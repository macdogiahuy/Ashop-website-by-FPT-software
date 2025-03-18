import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { message } from "antd";

const api = axios.create({});

createAuthRefreshInterceptor(api, () => axios.get("/api/auth/refresh"), {
  pauseInstanceWhileRefreshing: true,
});

export interface RequestError {
  message: string;
  code?: number;
  prettierMessage?: string;
}

export function handleRequestError(error: AxiosError): RequestError {
  if (error?.response) {
    const data = error.response.data as any;
    return {
      message: data?.message ? data?.message : error.message,
      code: error.response.status,
    };
  }

  if (error?.request) {
    return { message: "The request was made but no response was received" };
  }

  return {
    message: error?.message,
  };
}

export async function catchRequestError<T>(
  doRequest: () => Promise<T>,
  rejectWithValue?: (value: any) => any,
  showErrorUi?: boolean
): Promise<T | undefined> {
  try {
    return await doRequest();
  } catch (e: any) {
    const error = handleRequestError(e);
    if (showErrorUi) {
      message.warning(error.message);
    }
    if (rejectWithValue) {
      return rejectWithValue({ ...error, prettierMessage: error.message });
    }
    return undefined;
  }
}

export default api;
