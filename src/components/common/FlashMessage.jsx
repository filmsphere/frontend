import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import useFlashMessageStore from "../../stores/flashMessageStore";

const FlashMessage = () => {
  const { messages, removeMessage } = useFlashMessageStore();
  const [touchStates, setTouchStates] = useState({});
  const touchStartXRef = useRef({});

  useEffect(() => {
    const timers = messages.map((msg) =>
      setTimeout(() => removeMessage(msg.id), 3000),
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [messages, removeMessage]);

  const handleTouchStart = (id, e) => {
    touchStartXRef.current[id] = e.touches[0].clientX;
    setTouchStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], touching: true, offset: 0 },
    }));
  };

  const handleTouchMove = (id, e) => {
    if (!touchStartXRef.current[id]) return;
    const diffX = e.touches[0].clientX - touchStartXRef.current[id];
    if (diffX < 0) {
      setTouchStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], offset: diffX },
      }));
    }
  };

  const handleTouchEnd = (id) => {
    const offset = touchStates[id]?.offset || 0;
    if (offset < -100) {
      setTouchStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], touching: false, removing: true },
      }));
      setTimeout(() => removeMessage(id), 200);
    } else {
      setTouchStates((prev) => ({
        ...prev,
        [id]: { ...prev[id], touching: false, offset: 0 },
      }));
    }
    touchStartXRef.current[id] = null;
  };

  const getMessageStyle = (index, total) => {
    const baseSize = 1;
    const scaleFactor = 0.03;
    const spacingFactor = 0.6;

    const freshness = 1 - (index / (total > 1 ? total - 1 : 1)) * scaleFactor;
    const yOffset = index * spacingFactor;
    const isMobile = window.innerWidth < 640;

    return {
      transform: `translateY(${yOffset}rem) scale(${freshness})`,
      zIndex: 50 - index,
      top: `${baseSize}rem`,
      right: isMobile ? "1rem" : "2rem",
      left: isMobile ? "1rem" : "auto",
      maxWidth: isMobile ? "calc(100% - 2rem)" : "24rem",
      width: isMobile ? "calc(100% - 2rem)" : "auto",
      opacity: Math.max(0.8, freshness * 0.9 + 0.1),
      pointerEvents: index === 0 ? "auto" : "none",
    };
  };

  const getMessageClasses = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700";
      case "error":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700";
      case "info":
      default:
        return "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-700";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-live="polite">
      {messages.map((msg, index) => {
        const touchState = touchStates[msg.id] || {};
        const touchTransform = touchState.offset
          ? `translateX(${touchState.offset}px)`
          : "";
        const messageStyle = {
          ...getMessageStyle(index, messages.length),
          transform: touchTransform
            ? `${touchTransform} ${getMessageStyle(index, messages.length).transform}`
            : getMessageStyle(index, messages.length).transform,
          opacity: touchState.removing
            ? 0
            : getMessageStyle(index, messages.length).opacity,
          transition: touchState.touching
            ? "none"
            : "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.3s ease, scale 0.3s ease",
        };

        return (
          <div
            key={msg.id}
            role="alert"
            className={`fixed rounded-lg border shadow-lg backdrop-blur-sm ${getMessageClasses(msg.type)} flex items-center gap-3 pointer-events-auto`}
            style={messageStyle}
            onTouchStart={(e) => handleTouchStart(msg.id, e)}
            onTouchMove={(e) => handleTouchMove(msg.id, e)}
            onTouchEnd={() => handleTouchEnd(msg.id)}
          >
            <div className="p-4 flex-grow overflow-hidden text-ellipsis">
              <span>{msg.message}</span>
            </div>
            <button
              onClick={() => removeMessage(msg.id)}
              aria-label="Close message"
              className="p-2 mr-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FlashMessage;
