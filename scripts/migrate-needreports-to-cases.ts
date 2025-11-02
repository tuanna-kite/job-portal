/**
 * Migration Script: Tạo Cases cho tất cả NeedReports cũ có category = JOB_SEEKING
 *
 * Chạy: npx tsx scripts/migrate-needreports-to-cases.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Get all needReportIds that already have cases
  const casesWithReports = await prisma.case.findMany({
    where: { needReportId: { not: null } } as any,
    select: { needReportId: true } as any,
  });
  const linkedReportIds = (casesWithReports as any[])
    .map((c: any) => c.needReportId)
    .filter(Boolean) as string[];

  // Get JOB_SEEKING reports without cases
  const needReports = await prisma.needReport.findMany({
    where: {
      category: "JOB_SEEKING",
      id: { notIn: linkedReportIds },
    },
    include: { user: true },
  });

  for (const report of needReports) {
    await prisma.case.create({
      data: {
        userId: report.userId,
        needReportId: report.id,
        status: "pending",
        notes: `[Migration] Tự động tạo từ yêu cầu hỗ trợ: ${report.description.substring(0, 100)}${report.description.length > 100 ? "..." : ""}`,
      } as any,
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
