/**
 * Enum mô tả các loại nhu cầu hỗ trợ phổ biến cho người khuyết tật.
 * Đồng bộ với enum NeedSupportCategory trong Prisma schema.
 */
export enum NeedReportCategory {
  JOB_SEEKING = "JOB_SEEKING", // Tìm việc làm
  TRAINING_EDUCATION = "TRAINING_EDUCATION", // Đào tạo / giáo dục nghề
  ASSISTIVE_DEVICES = "ASSISTIVE_DEVICES", // Hỗ trợ thiết bị
  FINANCIAL_ASSISTANCE = "FINANCIAL_ASSISTANCE", // Hỗ trợ tài chính
  HEALTHCARE_SUPPORT = "HEALTHCARE_SUPPORT", // Y tế / phục hồi chức năng
  HOUSING_SUPPORT = "HOUSING_SUPPORT", // Nhà ở
  TRANSPORTATION_SUPPORT = "TRANSPORTATION_SUPPORT", // Di chuyển
  LEGAL_SUPPORT = "LEGAL_SUPPORT", // Pháp lý / giấy tờ
  SOCIAL_INCLUSION = "SOCIAL_INCLUSION", // Hòa nhập xã hội
  COUNSELING_MENTAL_HEALTH = "COUNSELING_MENTAL_HEALTH", // Tư vấn tâm lý
  TECHNICAL_SUPPORT = "TECHNICAL_SUPPORT", // Hỗ trợ công nghệ
  VOLUNTEER_ASSISTANCE = "VOLUNTEER_ASSISTANCE", // Tình nguyện viên hỗ trợ
  OTHER = "OTHER", // Khác
}

/**
 * Nhãn hiển thị tiếng Việt cho từng loại nhu cầu.
 */
export const NeedSupportCategoryLabel: Record<NeedReportCategory, string> = {
  [NeedReportCategory.JOB_SEEKING]: "Tìm việc làm 💼",
  [NeedReportCategory.TRAINING_EDUCATION]: "Đào tạo / Giáo dục nghề 🎓",
  [NeedReportCategory.ASSISTIVE_DEVICES]: "Hỗ trợ thiết bị ♿",
  [NeedReportCategory.FINANCIAL_ASSISTANCE]: "Hỗ trợ tài chính 💰",
  [NeedReportCategory.HEALTHCARE_SUPPORT]: "Hỗ trợ y tế 🏥",
  [NeedReportCategory.HOUSING_SUPPORT]: "Hỗ trợ chỗ ở 🏠",
  [NeedReportCategory.TRANSPORTATION_SUPPORT]: "Hỗ trợ di chuyển 🚌",
  [NeedReportCategory.LEGAL_SUPPORT]: "Hỗ trợ pháp lý ⚖️",
  [NeedReportCategory.SOCIAL_INCLUSION]: "Hòa nhập xã hội 🤝",
  [NeedReportCategory.COUNSELING_MENTAL_HEALTH]: "Tư vấn tâm lý 💬",
  [NeedReportCategory.TECHNICAL_SUPPORT]: "Hỗ trợ công nghệ 💻",
  [NeedReportCategory.VOLUNTEER_ASSISTANCE]: "Tình nguyện viên 🤲",
  [NeedReportCategory.OTHER]: "Khác ✳️",
};

/**
 * Danh sách tùy chọn dùng trong form (dropdown / checkbox)
 */
export const NeedSupportCategoryOptions = Object.values(NeedReportCategory).map(
  (category) => ({
    value: category,
    label: NeedSupportCategoryLabel[category],
  }),
);
