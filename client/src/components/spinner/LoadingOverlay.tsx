import { createPortal } from "react-dom";
import SpinnerDemo from "./Lucidespinner";

export const LoadingOverlay = () => {
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 9999,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <SpinnerDemo />
    </div>,
    document.body,
  );
};
