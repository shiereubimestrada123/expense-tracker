import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useThrottledToast = (delay = 2000) => {
  const [lastToastTime, setLastToastTime] = useState(0);

  const showToast = useCallback(
    (message, type = "success") => {
      const now = Date.now();
      if (now - lastToastTime >= delay) {
        if (type === "success") {
          toast.success(message);
        } else if (type === "error") {
          toast.error(message);
        }
        setLastToastTime(now);
      }
    },
    [lastToastTime, delay]
  );

  return showToast;
};

export default useThrottledToast;
