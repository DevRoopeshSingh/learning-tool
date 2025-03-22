// src/components/LiveAnnouncer.tsx
import React, { useEffect, useState } from "react";

interface LiveAnnouncerProps {
  message: string;
}

export const LiveAnnouncer: React.FC<LiveAnnouncerProps> = ({ message }) => {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    if (message) {
      setAnnouncement(message);
      const timer = setTimeout(() => setAnnouncement(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only">
      {announcement}
    </div>
  );
};
