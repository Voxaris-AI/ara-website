"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ChatBox.module.css";

type Message = {
  id: number;
  role: "ai" | "caller";
  text: string;
};

const MESSAGES: Message[] = [
  {
    id: 1,
    role: "ai",
    text: "Hi this is Ara from Acme Health Osteopathy Clinic, how can I help today?",
  },
  {
    id: 2,
    role: "caller",
    text: "Hi this is Ethan. I have lower back pain and I want to book an osteopathy appointment this Thursday morning.",
  },
  {
    id: 3,
    role: "ai",
    text: "Let me check the diary for you now. We have an 11:15am initial assessment on Thursday. Would you like me to book that for you?",
  },
  {
    id: 4,
    role: "caller",
    text: "Yes please, 11:15am works for me.",
  },
  {
    id: 5,
    role: "ai",
    text: "Perfect, you are booked in for Thursday at 11:15am. You will receive a text confirmation and intake form shortly.",
  },
];

const BAR_CLASSES = [
  styles.bar1,
  styles.bar2,
  styles.bar3,
  styles.bar4,
  styles.bar5,
  styles.bar6,
  styles.bar7,
  styles.bar8,
  styles.bar9,
  styles.bar10,
  styles.bar11,
  styles.bar12,
];

const INITIAL_VISIBLE_COUNT = 2;
const MESSAGE_STEP_MS = 1600;
const FADE_OUT_MS = 420;

export function ChatBox() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (isResetting) {
        return;
      }

      setVisibleCount((prev) => {
        if (prev >= MESSAGES.length) {
          setIsResetting(true);
          return prev;
        }

        return prev + 1;
      });
    }, MESSAGE_STEP_MS);

    return () => window.clearInterval(intervalId);
  }, [isResetting]);

  useEffect(() => {
    if (!isResetting) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      setIsResetting(false);
    }, FADE_OUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [isResetting]);

  const visibleMessages = useMemo(
    () => MESSAGES.slice(0, visibleCount),
    [visibleCount],
  );

  return (
    <div className={styles.chatShell} aria-label="Live call preview">
      <div className={styles.chatInner}>
        <header className={styles.chatHeader}>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} aria-hidden="true" />
            <span className={styles.liveText}>Live Call</span>
          </div>

          <svg
            viewBox="0 0 24 24"
            className={styles.signalIcon}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 20h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M7 20v-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 20v-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 20V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M22 4v16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </header>

        <div
          className={`${styles.messageList} ${isResetting ? styles.messageListResetting : ""}`}
        >
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "ai"
                  ? styles.aiMessageRow
                  : styles.callerMessageRow
              }
            >
              {message.role === "ai" ? (
                <>
                  <div className={styles.aiChip} aria-hidden="true">
                    AI
                  </div>
                  <p className={styles.aiMessage}>{message.text}</p>
                </>
              ) : (
                <p className={styles.callerMessage}>{message.text}</p>
              )}
            </div>
          ))}
        </div>

        <footer className={styles.controls}>
          <div className={styles.iconButton} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className={styles.micIcon}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M19 10v2a7 7 0 1 1-14 0v-2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="9"
                y="2"
                width="6"
                height="13"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className={styles.waveform} aria-hidden="true">
            {BAR_CLASSES.map((barClassName) => (
              <span
                key={barClassName}
                className={`${styles.waveBar} ${barClassName}`}
              />
            ))}
          </div>

          <div className={styles.hangupButton} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className={styles.hangupIcon}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </footer>
      </div>
    </div>
  );
}
