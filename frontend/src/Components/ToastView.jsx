import { useEffect } from "react"
import PropTypes from "prop-types";
import useToastStore from "../Stores/ToastStore";

export default function ToastView({ data }) {
  const removeToast = useToastStore((state) => state.removeToast);

  function closeToast() {
    removeToast(data);
  }

  useEffect(() => {
    setTimeout(() => {
      removeToast(data);
    }, 4000);
  }, [])

  return (
    <div
      className={`px-2 py-1 font-roboto text-[calc(12px+0.2dvw)] items-center tracking-wide flex justify-between gap-x-4 max-ssm:gap-x-2 w-fit max-w-[500px] rounded-md shadow-md text-[#f5f5f5] ${
        data.type == "success"
          ? "bg-green-500"
          : data.type == "error"
          ? "bg-[#DD3B11]"
          : "bg-[#ffa22e]"
      }`}
    >
      <span>{data.message}</span>
      <button onClick={closeToast}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-6 stroke-[#f5f5f5cf] rotate-45 hover:stroke-[#f5f5f5] transition-all"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

ToastView.propTypes = {
  data: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired
}