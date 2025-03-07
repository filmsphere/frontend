import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  customClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  disableBackdropClose = false,
}) {
  const modalRef = useRef(null);
  const prevFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusedElement.current = document.activeElement;
    modalRef.current?.focus();

    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      prevFocusedElement.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-[calc(100vw-1rem)] sm:max-w-md",
    md: "max-w-[calc(100vw-1rem)] sm:max-w-lg md:max-w-xl",
    lg: "max-w-[calc(100vw-1rem)] sm:max-w-xl md:max-w-2xl",
    xl: "max-w-[calc(100vw-1rem)] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl",
  };

  const handleBackdropClick = () => !disableBackdropClose && onClose();

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 px-2 sm:px-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex="-1"
        className={`p-4 sm:p-6 rounded-lg shadow-lg w-full ${sizeClasses[size]} bg-neutral-100 dark:bg-neutral-800 text-foreground max-h-[90vh] overflow-y-auto ${customClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div
            className={`flex justify-between items-center mb-4 ${headerClassName}`}
          >
            <h2
              id="modal-title"
              className="text-lg sm:text-xl font-semibold tracking-wide drop-shadow-sm break-words"
            >
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground text-xl sm:text-2xl font-bold transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
            )}
          </div>
        )}
        <div className={`mb-4 text-sm sm:text-base text-muted-foreground ${bodyClassName}`}>
          {children}
        </div>
        {footer && (
          <div
            className={`flex justify-end space-x-2 mt-4 ${footerClassName}`}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  showCloseButton: PropTypes.bool,
  customClassName: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  disableBackdropClose: PropTypes.bool,
};

export default Modal;
