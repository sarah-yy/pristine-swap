import { useCallback } from "react";
import { capitalize } from "../utils";
import useToastContext from "./useToastContext";

export default () => {
  const toast = useToastContext();

  const fallbackCopy = useCallback((text: string, type: string = "text"): void => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // avoid scrolling to bottom
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
      document.execCommand("copy");
      toast.success({
        title: "Copy Success",
        message: `${capitalize(type)} copied to clipboard.`,
      });
    } catch (err) {
      console.error("Fallback copy failed:", err);
      toast.error({
        title: "Copy Error",
        message: `Unable to copy ${type}. Please try again or let us know about this issue.`,
      });
    } finally {
      document.body.removeChild(textarea);
    }
  }, [toast])

  return useCallback((text?: string, type: string = "text"): void => {
    if (!text?.length) return;
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text)
        .catch(() => fallbackCopy(text, type))
        .then(() => {
          toast.success({
            title: "Copy Success",
            message: `${capitalize(type)} copied to clipboard.`,
          });
        });
    } else {
      fallbackCopy(text, type);
    }
  }, [fallbackCopy]);
};