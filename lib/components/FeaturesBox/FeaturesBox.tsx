"use client";

import React from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaRegCommentDots,
  FaLock,
  FaMicrophone,
  FaPlug,
} from "react-icons/fa";
import { COLORS } from "@/lib/theme";
import styles from "./FeaturesBox.module.css";

interface SchedulingBar {
  day: string;
  percent: number;
  heightClassName: string;
}

const SCHEDULING_BARS: SchedulingBar[] = [
  { day: "Mon", percent: 84, heightClassName: styles.barH84 },
  { day: "Tue", percent: 70, heightClassName: styles.barH70 },
  { day: "Wed", percent: 92, heightClassName: styles.barH92 },
  { day: "Thu", percent: 66, heightClassName: styles.barH66 },
  { day: "Fri", percent: 80, heightClassName: styles.barH80 },
  { day: "Sat", percent: 52, heightClassName: styles.barH52 },
  { day: "Sun", percent: 58, heightClassName: styles.barH58 },
];

const INTEGRATION_SYSTEMS = [
  "Dentally",
  "Cliniko",
  "NHS mail",
  "EMIS",
] as const;

const COMPLIANCE_CHECKS = [
  "Encrypted recordings",
  "Role-based access",
  "Data retention controls",
] as const;

const SOUNDWAVE_BARS = [
  styles.waveH24,
  styles.waveH38,
  styles.waveH56,
  styles.waveH32,
  styles.waveH68,
  styles.waveH44,
  styles.waveH72,
  styles.waveH36,
  styles.waveH62,
  styles.waveH28,
  styles.waveH78,
  styles.waveH34,
  styles.waveH64,
  styles.waveH42,
  styles.waveH48,
] as const;

export const FeaturesBox: React.FC = () => {
  return (
    <div className={styles.box} aria-label="Feature highlights">
      <div className={styles.mosaic}>
        <article className={`${styles.card} ${styles.cardScheduling}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>Smart</em> Scheduling
            </h3>
            <FaCalendarAlt className={styles.iconGreen} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            Ara fills in your schedule gaps so you can see more patients and
            reduce no-shows.
          </p>

          <div className={styles.schedulePanel} aria-hidden="true">
            <div className={styles.scheduleBars}>
              {SCHEDULING_BARS.map((bar) => (
                <div key={bar.day} className={styles.scheduleBarItem}>
                  <span className={styles.schedulePercent}>{bar.percent}%</span>
                  <div className={styles.scheduleTrack}>
                    <div
                      className={`${styles.scheduleFill} ${bar.heightClassName}`}
                    />
                  </div>
                  <span className={styles.scheduleDay}>{bar.day}</span>
                </div>
              ))}
            </div>

            <div className={styles.scheduleStats}>
              <span className={styles.statPill}>14 booking slots opened</span>
              <span className={styles.statPill}>
                11 auto-reschedules completed
              </span>
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardAlwaysOn}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>24/7</em> Availability
            </h3>
            <FaClock className={styles.iconBlue} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            Never miss a call. Ara works nights, weekends, and holidays.
          </p>

          <div className={styles.dayNightDiagram} aria-hidden="true">
            <div className={styles.clockOrbit}>
              <span className={styles.clockOuterRing} />
              <span className={styles.clockInnerRing} />
              <span className={styles.clockSweepHand} />

              <span
                className={`${styles.orbitMarker} ${styles.orbitMarkerTop}`}
              >
                06
              </span>
              <span
                className={`${styles.orbitMarker} ${styles.orbitMarkerRight}`}
              >
                12
              </span>
              <span
                className={`${styles.orbitMarker} ${styles.orbitMarkerBottom}`}
              >
                18
              </span>
              <span
                className={`${styles.orbitMarker} ${styles.orbitMarkerLeft}`}
              >
                00
              </span>

              <span className={styles.orbitSun}>
                <span className={styles.sunCenter} />
                <span className={styles.sunAura} />
              </span>

              <span className={styles.orbitMoon}>
                <span className={styles.moonCenter} />
                <span className={styles.moonCutout} />
                <span className={styles.moonAura} />
              </span>
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardConversations}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>Natural</em> Conversations
            </h3>
            <FaRegCommentDots className={styles.iconGold} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            Human-like dialogue that patients trust. No robotic scripts.
          </p>

          <div className={styles.chatPreview} aria-hidden="true">
            <div className={`${styles.chatBubble} ${styles.chatBubblePatient}`}>
              Can I move tomorrow&apos;s appointment to Friday?
            </div>
            <div className={`${styles.chatBubble} ${styles.chatBubbleAra}`}>
              Of course! We have 3:30pm or 4:15pm available.
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardIntegration}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>Instant</em> Integration
            </h3>
            <FaPlug className={styles.iconGreen} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            Connects seamlessly with EHR, PMS, CRM and scheduling systems.
          </p>

          <div className={styles.integrationFlow} aria-hidden="true">
            <svg
              className={styles.flowSvg}
              viewBox="0 0 320 120"
              preserveAspectRatio="none"
            >
              <polyline
                className={styles.flowLine}
                points="22,24 84,24 84,60 130,60"
              />
              <polyline
                className={styles.flowLine}
                points="22,60 84,60 130,60"
              />
              <polyline
                className={styles.flowLine}
                points="22,96 84,96 84,60 130,60"
              />

              <polyline
                className={styles.flowLine}
                points="190,60 236,60 298,60"
              />
              <polyline
                className={styles.flowLine}
                points="190,60 236,60 236,24 298,24"
              />
              <polyline
                className={styles.flowLine}
                points="190,60 236,60 236,96 298,96"
              />
            </svg>

            <span className={`${styles.flowNode} ${styles.flowNodeInTop}`} />
            <span className={`${styles.flowNode} ${styles.flowNodeInMid}`} />
            <span className={`${styles.flowNode} ${styles.flowNodeInBottom}`} />

            <div className={styles.flowCore}>
              <FaPlug className={styles.flowCoreIcon} aria-hidden="true" />
              <span className={styles.flowCoreTitle}>Core Engine</span>
            </div>

            <span className={`${styles.flowNode} ${styles.flowNodeOutTop}`} />
            <span className={`${styles.flowNode} ${styles.flowNodeOutMid}`} />
            <span
              className={`${styles.flowNode} ${styles.flowNodeOutBottom}`}
            />
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardCompliance}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>Medical-Grade</em> Security
            </h3>
            <FaLock className={styles.iconGreen} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            GDPR Compliant. Your patients&apos; data stays protected.
          </p>

          <ul className={styles.complianceList}>
            {COMPLIANCE_CHECKS.map((item) => (
              <li key={item} className={styles.complianceItem}>
                <FaCheckCircle
                  className={styles.complianceCheck}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={`${styles.card} ${styles.cardVoice}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <em>Adaptive</em> Voice Recognition
            </h3>
            <FaMicrophone className={styles.iconBlue} aria-hidden="true" />
          </div>
          <p className={styles.cardCopy}>
            Serve diverse patient populations with intelligent accent
            recognition.
          </p>

          <div className={styles.soundwaveWrap} aria-hidden="true">
            <div className={styles.soundwaveTrack}>
              {SOUNDWAVE_BARS.map((barClass, index) => (
                <span
                  key={`wave-${index}`}
                  className={`${styles.voiceWaveBar} ${barClass}`}
                />
              ))}
            </div>
          </div>
        </article>
      </div>

      <style jsx>{`
        :global(.${styles.box}) {
          --panel-bg: ${COLORS.darkerPurple};
          --panel-border: ${COLORS.araGlassGradient};
          --panel-soft-bg: ${COLORS.darkPurple};
          --panel-ink: ${COLORS.lightLavender};
          --panel-white: ${COLORS.white};
        }
      `}</style>
    </div>
  );
};
