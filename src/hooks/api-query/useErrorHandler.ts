import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { handleRequestError } from "../../utils/api";

export function useErrorHandler() {
  const history = useHistory();
  return useCallback(
    (err) => {
      const errorDetails = handleRequestError(err as any);
      if (errorDetails.code) {
        history.replace(history.location.pathname, {
          errorStatusCode: errorDetails.code,
          errorMessage: errorDetails.message,
        });
      }
    },
    [history]
  );
}
