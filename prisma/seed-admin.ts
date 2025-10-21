// prisma/seed.ts
import { PrismaClient, RegionLevel } from "@prisma/client";

const prisma = new PrismaClient();

// 5 thành phố trực thuộc TW
const MUNICIPALITIES: Array<{ name: string; level: RegionLevel }> = [
  { name: "Hà Nội", level: RegionLevel.municipality },
  { name: "Hải Phòng", level: RegionLevel.municipality },
  { name: "Đà Nẵng", level: RegionLevel.municipality },
  { name: "Hồ Chí Minh", level: RegionLevel.municipality },
  { name: "Cần Thơ", level: RegionLevel.municipality },
];

// 58 tỉnh
const PROVINCES: Array<{ name: string; level: RegionLevel }> = [
  { name: "An Giang", level: RegionLevel.province },
  { name: "Bà Rịa - Vũng Tàu", level: RegionLevel.province },
  { name: "Bắc Giang", level: RegionLevel.province },
  { name: "Bắc Kạn", level: RegionLevel.province },
  { name: "Bạc Liêu", level: RegionLevel.province },
  { name: "Bắc Ninh", level: RegionLevel.province },
  { name: "Bến Tre", level: RegionLevel.province },
  { name: "Bình Dương", level: RegionLevel.province },
  { name: "Bình Định", level: RegionLevel.province },
  { name: "Bình Phước", level: RegionLevel.province },
  { name: "Bình Thuận", level: RegionLevel.province },
  { name: "Cà Mau", level: RegionLevel.province },
  { name: "Cao Bằng", level: RegionLevel.province },
  { name: "Đắk Lắk", level: RegionLevel.province },
  { name: "Đắk Nông", level: RegionLevel.province },
  { name: "Điện Biên", level: RegionLevel.province },
  { name: "Đồng Nai", level: RegionLevel.province },
  { name: "Đồng Tháp", level: RegionLevel.province },
  { name: "Gia Lai", level: RegionLevel.province },
  { name: "Hà Giang", level: RegionLevel.province },
  { name: "Hà Nam", level: RegionLevel.province },
  { name: "Hà Tĩnh", level: RegionLevel.province },
  { name: "Hải Dương", level: RegionLevel.province },
  { name: "Hậu Giang", level: RegionLevel.province },
  { name: "Hòa Bình", level: RegionLevel.province },
  { name: "Hưng Yên", level: RegionLevel.province },
  { name: "Khánh Hòa", level: RegionLevel.province },
  { name: "Kiên Giang", level: RegionLevel.province },
  { name: "Kon Tum", level: RegionLevel.province },
  { name: "Lai Châu", level: RegionLevel.province },
  { name: "Lâm Đồng", level: RegionLevel.province },
  { name: "Lạng Sơn", level: RegionLevel.province },
  { name: "Lào Cai", level: RegionLevel.province },
  { name: "Long An", level: RegionLevel.province },
  { name: "Nam Định", level: RegionLevel.province },
  { name: "Nghệ An", level: RegionLevel.province },
  { name: "Ninh Bình", level: RegionLevel.province },
  { name: "Ninh Thuận", level: RegionLevel.province },
  { name: "Phú Thọ", level: RegionLevel.province },
  { name: "Phú Yên", level: RegionLevel.province },
  { name: "Quảng Bình", level: RegionLevel.province },
  { name: "Quảng Nam", level: RegionLevel.province },
  { name: "Quảng Ngãi", level: RegionLevel.province },
  { name: "Quảng Ninh", level: RegionLevel.province },
  { name: "Quảng Trị", level: RegionLevel.province },
  { name: "Sóc Trăng", level: RegionLevel.province },
  { name: "Sơn La", level: RegionLevel.province },
  { name: "Tây Ninh", level: RegionLevel.province },
  { name: "Thái Bình", level: RegionLevel.province },
  { name: "Thái Nguyên", level: RegionLevel.province },
  { name: "Thanh Hóa", level: RegionLevel.province },
  { name: "Thừa Thiên Huế", level: RegionLevel.province },
  { name: "Tiền Giang", level: RegionLevel.province },
  { name: "Trà Vinh", level: RegionLevel.province },
  { name: "Tuyên Quang", level: RegionLevel.province },
  { name: "Vĩnh Long", level: RegionLevel.province },
  { name: "Vĩnh Phúc", level: RegionLevel.province },
  { name: "Yên Bái", level: RegionLevel.province },
];

// Gộp tất cả vùng cấp tỉnh/thành (parentId = null)
const ALL_TOP_REGIONS = [...MUNICIPALITIES, ...PROVINCES].map((r) => ({
  name: r.name,
  level: r.level,
  parentId: null as string | null,
}));

async function main() {
  // Khuyến nghị: đảm bảo có unique để tránh trùng (xem gợi ý bên dưới)
  // Nếu chưa có unique, createMany với skipDuplicates sẽ dựa vào unique keys hiện có (nếu không có thì không tác dụng).
  await prisma.region.createMany({
    data: ALL_TOP_REGIONS,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
