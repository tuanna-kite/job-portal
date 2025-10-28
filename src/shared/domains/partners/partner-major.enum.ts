// src/constants/partner-major.ts
export enum PartnerMajor {
  EMPLOYER_GENERAL = "EMPLOYER_GENERAL",
  TRAINING_EDUCATION = "TRAINING_EDUCATION",
  ASSISTIVE_DEVICES_PROVIDER = "ASSISTIVE_DEVICES_PROVIDER",
  ASSISTIVE_TECH_SOFTWARE = "ASSISTIVE_TECH_SOFTWARE",
  HEALTHCARE_REHABILITATION = "HEALTHCARE_REHABILITATION",
  NGO_NONPROFIT = "NGO_NONPROFIT",
  GOVERNMENT_AGENCY = "GOVERNMENT_AGENCY",
  IT_SOFTWARE = "IT_SOFTWARE",
  BPO_CALL_CENTER = "BPO_CALL_CENTER",
  MANUFACTURING = "MANUFACTURING",
  RETAIL_ECOMMERCE = "RETAIL_ECOMMERCE",
  LOGISTICS_TRANSPORT = "LOGISTICS_TRANSPORT",
  HOSPITALITY_TOURISM = "HOSPITALITY_TOURISM",
  FINANCIAL_SERVICES = "FINANCIAL_SERVICES",
  LEGAL_SERVICES = "LEGAL_SERVICES",
  MEDIA_COMMUNICATIONS = "MEDIA_COMMUNICATIONS",
  HOUSING_SERVICES = "HOUSING_SERVICES",
  ACCESSIBILITY_SERVICES = "ACCESSIBILITY_SERVICES",
  DATA_ANNOTATION_TRANSLATION = "DATA_ANNOTATION_TRANSLATION",
  AGRICULTURE_CONSTRUCTION = "AGRICULTURE_CONSTRUCTION",
  COMMUNITY_VOLUNTEER = "COMMUNITY_VOLUNTEER",
  OTHER = "OTHER",
}

/** Nhãn hiển thị tiếng Việt (có icon để dễ nhận diện trong UI) */
export const PartnerMajorLabel: Record<PartnerMajor, string> = {
  [PartnerMajor.EMPLOYER_GENERAL]: "Doanh nghiệp tuyển dụng 💼",
  [PartnerMajor.TRAINING_EDUCATION]: "Đào tạo / Giáo dục nghề 🎓",
  [PartnerMajor.ASSISTIVE_DEVICES_PROVIDER]: "Thiết bị trợ giúp ♿",
  [PartnerMajor.ASSISTIVE_TECH_SOFTWARE]: "Công nghệ trợ năng 💻",
  [PartnerMajor.HEALTHCARE_REHABILITATION]: "Y tế / Phục hồi chức năng 🏥",
  [PartnerMajor.NGO_NONPROFIT]: "Tổ chức phi lợi nhuận 🤝",
  [PartnerMajor.GOVERNMENT_AGENCY]: "Cơ quan nhà nước 🏛️",
  [PartnerMajor.IT_SOFTWARE]: "CNTT / Phần mềm 👨‍💻",
  [PartnerMajor.BPO_CALL_CENTER]: "BPO / Tổng đài ☎️",
  [PartnerMajor.MANUFACTURING]: "Sản xuất 🏭",
  [PartnerMajor.RETAIL_ECOMMERCE]: "Bán lẻ / TMĐT 🛍️",
  [PartnerMajor.LOGISTICS_TRANSPORT]: "Logistics / Vận chuyển 🚚",
  [PartnerMajor.HOSPITALITY_TOURISM]: "NH-KS / Du lịch 🏨",
  [PartnerMajor.FINANCIAL_SERVICES]: "Tài chính / NH / BH 💳",
  [PartnerMajor.LEGAL_SERVICES]: "Dịch vụ pháp lý ⚖️",
  [PartnerMajor.MEDIA_COMMUNICATIONS]: "Truyền thông / Nội dung 📣",
  [PartnerMajor.HOUSING_SERVICES]: "Nhà ở / Cơ sở lưu trú 🏠",
  [PartnerMajor.ACCESSIBILITY_SERVICES]: "Dịch vụ tiếp cận ♿️",
  [PartnerMajor.DATA_ANNOTATION_TRANSLATION]:
    "Gán nhãn dữ liệu / Dịch thuật 📝",
  [PartnerMajor.AGRICULTURE_CONSTRUCTION]: "Nông nghiệp / Xây dựng 🚜",
  [PartnerMajor.COMMUNITY_VOLUNTEER]: "Cộng đồng / Tình nguyện 🙌",
  [PartnerMajor.OTHER]: "Khác ✳️",
};

/** Dùng cho select/combobox */
export const PartnerMajorOptions = Object.values(PartnerMajor).map((value) => ({
  value,
  label: PartnerMajorLabel[value],
}));
