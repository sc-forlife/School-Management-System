import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react"; // icons

export default function AlertPopup({ show, type, message, onClose }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timer = setTimeout(() => handleClose(), 4000); // auto close after 4s
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  // colors for backgrounds and icons
  const colors = {
    success: {
      bg: "rgba(0, 200, 83, 0.85)",
      iconColor: "#b9ffd1",
      icon: <CheckCircle size={24} />,
    },
    danger: {
      bg: "rgba(220, 53, 69, 0.85)",
      iconColor: "#ffbfbf",
      icon: <XCircle size={24} />,
    },
    info: {
      bg: "rgba(13, 110, 253, 0.85)",
      iconColor: "#bcd6ff",
      icon: <Info size={24} />,
    },
  };

  const current = colors[type] || colors.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="position-fixed top-0 start-50 translate-middle-x mt-4"
          style={{
            zIndex: 1050,
            width: "90%",
            maxWidth: "480px",
          }}
        >
          <div
            style={{
              background: current.bg,
              backdropFilter: "blur(8px)",
              color: "#fff",
              padding: "14px 18px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              fontWeight: 500,
              letterSpacing: "0.3px",
            }}
          >
            {/* Icon + Message */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 1,
              }}
            >
              <span style={{ color: current.iconColor }}>{current.icon}</span>
              <span style={{ flex: 1 }}>{message}</span>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "none",
                color: "#fff",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255,255,255,0.2)")
              }
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
