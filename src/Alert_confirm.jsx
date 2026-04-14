import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmAlert({ show, message, onConfirm, onCancel }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const handleClose = () => {
    setVisible(false);
    if (onCancel) onCancel();
  };

  const handleYes = () => {
    setVisible(false);
    if (onConfirm) onConfirm();
  };

  const handleNo = () => {
    setVisible(false);
    if (onCancel) onCancel();
  };

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
            maxWidth: "400px",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              padding: "20px",
              borderRadius: "14px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontWeight: 500,
            }}
          >
            {/* Message */}
            <div style={{ fontSize: "16px" }}>{message}</div>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={handleNo}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(220,53,69,0.85)",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                No
              </button>
              <button
                onClick={handleYes}
                style={{
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(0,200,83,0.85)",
                  color: "#fff",
                  fontWeight: 500,
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
