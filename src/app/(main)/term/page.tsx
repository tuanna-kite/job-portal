"use client";

import React from "react";

import SessionEnd from "@/components/home/SessionEnd";
import HeroTerm from "@/components/term/HeroTerm";

function TermsPage() {
  return (
    <>
      <HeroTerm />
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10">
          <div className="prose prose-lg max-w-none">
            {/* Last Updated */}
            <div className="mb-8 text-sm text-gray-500">
              Cập nhật lần cuối: 12/01/2025
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Chính sách này mô tả cách Việc Lành thu thập, sử dụng và bảo vệ
                thông tin cá nhân của Người khuyết tật, Đại diện Khu vực và các
                bên liên quan.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                1. Thông tin chúng tôi thu thập
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                Chúng tôi thu thập thông tin để phục vụ mục đích kết nối việc
                làm và hỗ trợ xã hội.
              </p>

              <div className="space-y-6">
                {/* 1.1 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    1.1. Thông tin Định danh và Liên hệ:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">
                        Họ tên, ngày sinh, địa chỉ, số điện thoại, email.
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">
                        Thông tin này được sử dụng để xác minh danh tính và liên
                        hệ hỗ trợ.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1.2 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    1.2. Thông tin Nhạy cảm (Được sự đồng ý của NKT):
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">
                        Loại khuyết tật, mức độ khuyết tật, tình trạng sức khỏe
                        liên quan đến khả năng làm việc.
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">
                        Thông tin này là cốt lõi để Admin/Rep tìm kiếm và gán
                        việc làm, cũng như phân loại yêu cầu hỗ trợ (Y tế, Thiết
                        bị) một cách phù hợp.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1.3 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    1.3. Thông tin Kỹ năng và Nhu cầu:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-700">
                        Trình độ học vấn, kỹ năng đã có, mong muốn công việc,
                        mức lương mong muốn.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                2. Mục đích sử dụng dữ liệu
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                Việc Lành sử dụng thông tin cá nhân cho các mục đích chính sau:
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Xác minh và Kích hoạt Hồ sơ:
                    </span>
                    <span className="ml-2 text-gray-700">
                      Đảm bảo tính hợp lệ của NKT và Rep.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Kết nối Việc làm:
                    </span>
                    <span className="ml-2 text-gray-700">
                      Phân tích kỹ năng để gán User với Cơ hội việc làm phù hợp
                      nhất.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Phân bổ Hỗ trợ:
                    </span>
                    <span className="ml-2 text-gray-700">
                      Chuyển các yêu cầu Phản ánh (Y tế, Sinh kế) đến các đối
                      tác/tổ chức có khả năng hỗ trợ.
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gray-400"></div>
                  <div>
                    <span className="font-semibold text-gray-800">
                      Thống kê và Báo cáo (Ẩn danh):
                    </span>
                    <span className="ml-2 text-gray-700">
                      Tổng hợp dữ liệu về nhu cầu và khó khăn NKT để báo cáo cho
                      chính quyền và tổ chức phi lợi nhuận (Dữ liệu cá nhân sẽ
                      được ẩn danh).
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                3. Chia sẻ và tiết lộ dữ liệu
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                Chúng tôi cam kết không bán hoặc cho thuê thông tin cá nhân.
                Thông tin chỉ được chia sẻ trong phạm vi cần thiết:
              </p>

              <div className="space-y-6">
                {/* 3.1 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    3.1. Chia sẻ nội bộ:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Thông tin hồ sơ NKT được chia sẻ giữa Admin và Rep phụ trách
                    khu vực đó để thực hiện công tác xác minh và hỗ trợ.
                  </p>
                </div>

                {/* 3.2 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    3.2. Chia sẻ với Đối tác:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Thông tin kỹ năng và kinh nghiệm của NKT sẽ được chia sẻ với
                    Đối tác/Doanh nghiệp khi NKT đồng ý ứng tuyển vào vị trí
                    việc làm cụ thể do đối tác đó cung cấp.
                  </p>
                </div>

                {/* 3.3 */}
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    3.3. Chia sẻ Hỗ trợ:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Thông tin liên quan đến các yêu cầu Phản ánh (ví dụ: cần xe
                    lăn, hỗ trợ y tế) sẽ được chia sẻ với các tổ chức từ
                    thiện/cơ quan y tế liên quan để cung cấp sự hỗ trợ cần
                    thiết.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                4. Bảo mật và lưu trữ
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    4.1.
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn (mã hóa
                    SSL, lưu trữ trên nền tảng đám mây bảo mật) để bảo vệ dữ
                    liệu khỏi truy cập trái phép.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    4.2.
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Rep và Admin được yêu cầu tuân thủ các giao thức bảo mật
                    nghiêm ngặt để đảm bảo an toàn dữ liệu trên Dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                5. Quyền của người dùng
              </h2>
              <p className="leading-relaxed text-gray-700">
                NKT có quyền yêu cầu truy cập, chỉnh sửa, hoặc xóa thông tin cá
                nhân của mình bằng cách liên hệ với Đại diện Khu vực hoặc Admin.
              </p>
            </div>
          </div>
        </div>
      </section>
      <SessionEnd />
    </>
  );
}

export default TermsPage;
