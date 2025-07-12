import toast from "react-hot-toast";

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "14px",
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "14px",
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      position: "top-right",
      style: {
        background: "#F59E0B",
        color: "#fff",
        borderRadius: "8px",
        fontSize: "14px",
      },
    });
  },
};

export const handleApiError = (
  error: any,
  defaultMessage: string = "Something went wrong"
) => {
  let message = defaultMessage;
  
  if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (error?.message) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  showToast.error(message);
  
  // Log error for debugging
  // Debug logging removed
};
