"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./DemoModal.module.css";

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  fullName: string;
  clinicName: string;
  emailAddress: string;
  phoneNumber: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  fullName: "",
  clinicName: "",
  emailAddress: "",
  phoneNumber: "",
  website: "",
};

const FULL_NAME_REGEX = /^[A-Za-z][A-Za-z\s'\-]{1,79}$/;
const CLINIC_NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s'&.,()\-/]{1,99}$/;
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s()\-]{7,20}$/;

const normalizeText = (value: string) =>
  value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const hasEnoughPhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7;
};

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setValues(INITIAL_VALUES);
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const leftBullets = useMemo(
    () => ["Zero setup fees", "Seamless onboarding", "Cancel anytime"],
    [],
  );

  if (!isOpen) {
    return null;
  }

  const validate = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};
    const fullName = normalizeText(nextValues.fullName);
    const clinicName = normalizeText(nextValues.clinicName);
    const emailAddress = normalizeText(nextValues.emailAddress).toLowerCase();
    const phoneNumber = normalizeText(nextValues.phoneNumber);

    if (!fullName || !FULL_NAME_REGEX.test(fullName)) {
      nextErrors.fullName = "Enter a valid full name.";
    }

    if (!clinicName || !CLINIC_NAME_REGEX.test(clinicName)) {
      nextErrors.clinicName = "Enter a valid clinic name.";
    }

    if (!emailAddress || !EMAIL_REGEX.test(emailAddress)) {
      nextErrors.emailAddress = "Enter a valid email address.";
    }

    if (
      !phoneNumber ||
      !PHONE_REGEX.test(phoneNumber) ||
      !hasEnoughPhoneDigits(phoneNumber)
    ) {
      nextErrors.phoneNumber = "Enter a valid phone number.";
    }

    // Honeypot field should stay empty; bots often fill hidden inputs.
    if (nextValues.website.trim().length > 0) {
      nextErrors.website = "Invalid submission.";
    }

    return {
      errors: nextErrors,
      normalized: {
        ...nextValues,
        fullName,
        clinicName,
        emailAddress,
        phoneNumber,
      },
    };
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name as keyof FormErrors]) {
        return prev;
      }

      const next = { ...prev };
      delete next[name as keyof FormErrors];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { errors: nextErrors, normalized } = validate(values);
    const hasErrors = Object.keys(nextErrors).length > 0;

    if (hasErrors) {
      setErrors(nextErrors);
      return;
    }

    setValues(normalized);
    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-demo-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close demo modal"
        >
          ×
        </button>

        <div className={styles.leftPanel}>
          <h2 id="book-demo-title" className={styles.leftTitle}>
            <em>Ready</em> to modernise your practice?
          </h2>
          <p className={styles.leftSubtitle}>
            Book in a demo with us and see why 15+ clinics are switching to
            AI-first patient handling
          </p>

          <ul className={styles.bulletList}>
            {leftBullets.map((bullet) => (
              <li key={bullet} className={styles.bulletItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  ✓
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.rightPanel}>
          {!isSubmitted ? (
            <>
              <h3 className={styles.rightTitle}>Schedule a Live Demo</h3>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label className={styles.fieldLabel} htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className={styles.input}
                  value={values.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  maxLength={80}
                  required
                />
                {errors.fullName ? (
                  <p className={styles.errorText}>{errors.fullName}</p>
                ) : null}

                <label className={styles.fieldLabel} htmlFor="clinicName">
                  Clinic name
                </label>
                <input
                  id="clinicName"
                  name="clinicName"
                  type="text"
                  className={styles.input}
                  value={values.clinicName}
                  onChange={handleChange}
                  autoComplete="organization"
                  maxLength={100}
                  required
                />
                {errors.clinicName ? (
                  <p className={styles.errorText}>{errors.clinicName}</p>
                ) : null}

                <label className={styles.fieldLabel} htmlFor="emailAddress">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  className={styles.input}
                  value={values.emailAddress}
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={120}
                  required
                />
                {errors.emailAddress ? (
                  <p className={styles.errorText}>{errors.emailAddress}</p>
                ) : null}

                <label className={styles.fieldLabel} htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className={styles.input}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  autoComplete="tel"
                  maxLength={20}
                  required
                />
                {errors.phoneNumber ? (
                  <p className={styles.errorText}>{errors.phoneNumber}</p>
                ) : null}

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={handleChange}
                  />
                </div>

                {errors.website ? (
                  <p className={styles.errorText}>{errors.website}</p>
                ) : null}

                <button type="submit" className={styles.submitButton}>
                  Schedule my demo
                </button>
              </form>

              <p className={styles.helperText}>No card details required</p>
            </>
          ) : (
            <div className={styles.successWrap}>
              <p className={styles.successText}>
                Thank you for signing up! We will send you an email with details
                on getting your live demo set up.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
