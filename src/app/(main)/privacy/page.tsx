"use client";

import React from "react";

import SessionEnd from "@/components/home/SessionEnd";
import HeroPrivacy from "@/components/privacy/HeroPrivacy";

function PrivacyPage() {
  return (
    <>
      <HeroPrivacy />
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
                Chào mừng bạn đến với Việc Lành. Việc truy cập và sử dụng nền
                tảng này đồng nghĩa với việc bạn chấp nhận và đồng ý tuân thủ
                các Điều khoản và Điều kiện sau đây.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                1. Chấp nhận điều khoản
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    1.1 Chấp nhận ràng buộc:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Các điều khoản này cấu thành thỏa thuận ràng buộc pháp lý
                    giữa bạn và Ban điều phối Việc Lành (sau đây gọi là "Việc
                    Lành" hoặc "Chúng tôi"). Nếu bạn không đồng ý với bất kỳ
                    điều khoản nào, vui lòng không sử dụng dịch vụ.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    1.2. Thay đổi Điều khoản:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Việc Lành có quyền cập nhật hoặc thay đổi các điều khoản này
                    bất kỳ lúc nào. Chúng tôi sẽ thông báo về các thay đổi quan
                    trọng trên trang web.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                2. Vai trò và trách nhiệm
              </h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                Hệ thống Việc Lành có ba vai trò chính:
              </p>

              <div className="space-y-6">
                {/* 2.1 */}
                <div className="">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    2.1. Người khuyết tật (User/NKT):
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Trách nhiệm:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Cung cấp thông tin hồ sơ (kỹ năng, loại khuyết tật, mong
                        muốn) chính xác và trung thực, hợp tác với Đại diện khu
                        vực (Rep) trong quá trình xác minh và ứng tuyển.
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Quyền lợi:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Được Rep và Admin hỗ trợ tìm việc làm, tư vấn sinh kế,
                        và tiếp cận các cơ hội hỗ trợ xã hội.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2.2 */}
                <div className="">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    2.2. Đại diện Khu vực (Rep):
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Trách nhiệm:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Xác minh tính chân thực của hồ sơ NKT tại khu vực phụ
                        trách. Cung cấp sự hỗ trợ và đồng hành trực tiếp trong
                        quá trình NKT ứng tuyển và phản ánh nhu cầu.
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Cam kết:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Phải duy trì đạo đức nghề nghiệp, bảo mật thông tin cá
                        nhân của NKT. Bất kỳ hành vi lạm dụng hoặc lợi dụng
                        thông tin Rep đều sẽ bị thu hồi quyền truy cập vĩnh
                        viễn.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2.3 */}
                <div className="">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    2.3. Ban điều phối (Admin):
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Trách nhiệm:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Quản lý hệ thống, phê duyệt hồ sơ NKT và Rep, nhập nguồn
                        việc làm, phân bổ nguồn lực và đảm bảo tính minh bạch,
                        công bằng của các hoạt động kết nối.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2.4 */}
                <div className="">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    2.4. Đối tác/Doanh nghiệp:
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-800">
                        Trách nhiệm:
                      </span>
                      <span className="ml-2 text-gray-700">
                        Cung cấp thông tin việc làm chính xác và cam kết tuân
                        thủ các quy định về lao động, đặc biệt đối với lao động
                        là NKT.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                3. Chính sách bảo mật dữ liệu
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    3.1.
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Việc Lành cam kết bảo mật thông tin cá nhân theo Chính sách
                    Bảo mật riêng biệt.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    3.2.
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Người dùng chấp nhận rằng dữ liệu về loại khuyết tật và kỹ
                    năng sẽ được sử dụng để tối ưu hóa việc gán việc làm và các
                    hình thức hỗ trợ.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                4. Giới hạn trách nhiệm
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    4.1. Tính chính xác của Dữ liệu:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Việc Lành không chịu trách nhiệm về tính chính xác tuyệt đối
                    của thông tin được cung cấp bởi NKT, Rep hoặc Đối tác.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    4.2. Quan hệ Lao động:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Việc Lành chỉ là nền tảng kết nối. Chúng tôi không phải là
                    nhà tuyển dụng và không chịu trách nhiệm về các tranh chấp
                    hoặc nghĩa vụ phát sinh từ quan hệ lao động giữa NKT và Đối
                    tác/Doanh nghiệp.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    4.3. Chấm dứt Dịch vụ:
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    Việc Lành có quyền từ chối hoặc chấm dứt dịch vụ đối với bất
                    kỳ người dùng nào vi phạm các điều khoản này mà không cần
                    thông báo trước.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SessionEnd />
    </>
  );
}

export default PrivacyPage;
