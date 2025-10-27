export enum DisabilityType {
  VISION_IMPAIRMENT = "VISION_IMPAIRMENT", // Khiếm thị / Mù / Thị lực yếu
  HEARING_IMPAIRMENT = "HEARING_IMPAIRMENT", // Khiếm thính / Điếc
  SPEECH_IMPAIRMENT = "SPEECH_IMPAIRMENT", // Khó nói / Không nói được
  PHYSICAL_DISABILITY = "PHYSICAL_DISABILITY", // Vận động (liệt, mất chi, yếu cơ, bại não,...)
  INTELLECTUAL_DISABILITY = "INTELLECTUAL_DISABILITY", // Khuyết tật trí tuệ
  MENTAL_DISABILITY = "MENTAL_DISABILITY", // Rối loạn tâm thần, trầm cảm, lo âu
  AUTISM_SPECTRUM = "AUTISM_SPECTRUM", // Rối loạn phổ tự kỷ
  LEARNING_DISABILITY = "LEARNING_DISABILITY", // Khó khăn học tập (ADHD, dyslexia,...)
  MULTIPLE_DISABILITIES = "MULTIPLE_DISABILITIES", // Đa khuyết tật
  OTHER = "OTHER", // Khác (ghi rõ)
}

export const DisabilityTypeLabel: Record<DisabilityType, string> = {
  [DisabilityType.VISION_IMPAIRMENT]: "Khiếm thị 👁️",
  [DisabilityType.HEARING_IMPAIRMENT]: "Khiếm thính 👂",
  [DisabilityType.SPEECH_IMPAIRMENT]: "Khó nói 🗣️",
  [DisabilityType.PHYSICAL_DISABILITY]: "Vận động ♿",
  [DisabilityType.INTELLECTUAL_DISABILITY]: "Trí tuệ 🧠",
  [DisabilityType.MENTAL_DISABILITY]: "Tâm thần 🕊️",
  [DisabilityType.AUTISM_SPECTRUM]: "Tự kỷ 🧩",
  [DisabilityType.LEARNING_DISABILITY]: "Khó học 📘",
  [DisabilityType.MULTIPLE_DISABILITIES]: "Đa khuyết tật 🔄",
  [DisabilityType.OTHER]: "Khác ✳️",
};
