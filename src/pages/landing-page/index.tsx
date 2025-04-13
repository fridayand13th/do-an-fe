"use client";
import Link from "next/link";
import { Col, Row } from "antd";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

export default function LandingPage() {
  return (
    <>
      <header
        className={`py-10 top-0 w-full h-[55px] flex items-center transition-all absolute left-0 right-0 top-0 z-10 bg-transparent`}
      >
        <div className="relative flex items-center justify-between px-10 w-full p-top-15">
          <div className="left-side flex items-center">
            <Link className="logo" href="/landing-page">
              <img
                src="/images/Untitled-222.png"
                className="h-[60px] w-auto"
                alt="Friday"
              />
            </Link>
            <nav className="ml-5"></nav>
          </div>
          <div className="right-side">
            <a
              href="/sign-in"
              type="button"
              className="h-[50px] rounded-[25px] bg-gradient-to-b from-[#ff4495] from-0% via-[#ff6d6d] via-100% to-[#7db9e8] to-100% px-[36px] py-[11px] text-lg font-medium text-white transition-all duration-500 ease-out"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className='flex h-[735px] items-center bg-[url("https://preview.colorlib.com/theme/calvino/assets/img/hero/h1_hero1.png.webp")] bg-cover bg-center bg-no-repeat'>
          <div className="container mx-auto px-20">
            <Row>
              <Col xs={8}>
                <h2 className="mb-[11px] mt-5 text-[40px] font-bold">
                  Lên kế hoạch cho ngày của bạn, từng nhiệm vụ một hoặc để
                  Friday làm thay bạn.
                </h2>
                <p className="mb-[48px] text-xl text-[#192839]">
                  Lấy lại quyền kiểm soát, sự sáng suốt và tập trung với Friday
                  - trợ lý lập kế hoạch hàng ngày để lên lịch các nhiệm vụ trong
                  lịch của bạn.
                </p>
                <button
                  onClick={() => window.open("/sign-up", "_self")}
                  type="button"
                  className="rounded-[30px] bg-gradient-to-b from-[#ff4495] from-0% via-[#ff6d6d] via-100% to-[#7db9e8] to-100% px-[36px] py-[15px] text-lg font-medium text-white transition-all duration-500 ease-out"
                >
                  Bắt đầu ngay
                </button>
              </Col>
              <Col xs={16} className="text-center" />
            </Row>
          </div>
        </div>
        <section className="relative pb-[120px]">
          <div className="container mx-auto px-20">
            <div className="section-tittle mx-auto mb-14 w-[29rem] text-center">
              <h2 className="mb-[12px] mt-4 uppercase text-[36px] font-bold">
                Lên kế hoạch cho ngày của bạn trong 30 giây...
              </h2>
            </div>
            <Row>
              <Col xs={24} sm={12} md={8}>
                <div className='group relative z-[1] mr-3 rounded-[5px] bg-white px-[21px] py-[40px] shadow-md transition-all duration-[0.4s] ease-out before:absolute before:bottom-0 before:left-0 before:-z-[1] before:h-0 before:w-full before:bg-[#192839] before:duration-[0.6s] before:content-[""] hover:text-white hover:before:h-full'>
                  <h5 className="h-[80px] mb-[21px] text-[22px] font-bold text-[#192839] group-hover:text-white">
                    Sắp xếp tất cả trong Trung tâm tác vụ
                  </h5>
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[50px] bg-[#FFE1EE]">
                    <img
                      src="https://preview.colorlib.com/theme/calvino/assets/img/icon/services1.svg"
                      alt=""
                    />
                  </div>
                  <p className="mt-[50px] text-lg text-[#192839] group-hover:text-white">
                    Sắp xếp mọi nhiệm vụ tốn nhiều thời gian của bạn vào một
                    trung tâm nhiệm vụ tích hợp với sự hỗ trợ của Friday.
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className='group relative z-[1] mx-3 rounded-[5px] bg-white px-[21px] py-[40px] shadow-md transition-all duration-[0.4s] ease-out before:absolute before:bottom-0 before:left-0 before:-z-[1] before:h-0 before:w-full before:bg-[#192839] before:duration-[0.6s] before:content-[""] hover:text-white hover:before:h-full'>
                  <h5 className="h-[80px] mb-[21px] text-[22px] font-bold text-[#192839] group-hover:text-white">
                    Lên lịch cho các nhiệm vụ của bạn một cách dễ dàng
                  </h5>
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[50px] bg-[#FFE1EE]">
                    <img
                      src="https://preview.colorlib.com/theme/calvino/assets/img/icon/services2.svg"
                      alt=""
                    />
                  </div>
                  <p className="mt-[50px] text-lg text-[#192839] group-hover:text-white">
                    Mỗi nhiệm vụ đều cần thời gian. Lên kế hoạch thực tế hàng
                    ngày và quản lý mọi thứ đang chiếm thời gian của bạn tại một
                    nơi.
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div className='group relative z-[1] mx-3 rounded-[5px] bg-white px-[21px] py-[40px] shadow-md transition-all duration-[0.4s] ease-out before:absolute before:bottom-0 before:left-0 before:-z-[1] before:h-0 before:w-full before:bg-[#192839] before:duration-[0.6s] before:content-[""] hover:text-white hover:before:h-full'>
                  <h5 className="h-[80px] mb-[21px] text-[22px] font-bold text-[#192839] group-hover:text-white">
                    Lên kế hoạch với các gợi ý AI phù hợp với bạn
                  </h5>
                  <div className="flex h-[78px] w-[78px] items-center justify-center rounded-[50px] bg-[#FFE1EE]">
                    <img
                      src="https://preview.colorlib.com/theme/calvino/assets/img/icon/services3.svg"
                      alt=""
                    />
                  </div>
                  <p className="mt-[50px] text-lg text-[#192839] group-hover:text-white">
                    Trí tuệ nhân tạo của Friday dự đoán thời gian tối ưu cho
                    từng nhiệm vụ của bạn, dưới dạng gợi ý lập lịch.
                  </p>
                </div>
              </Col>
            </Row>
          </div>
          <div className="absolute left-[3%] top-[13%] -z-[1] block">
            <img
              src="https://preview.colorlib.com/theme/calvino/assets/img/gallery/shape-1.png"
              alt=""
            />
          </div>
          <div className="absolute -top-[18%] right-[0%] -z-[1] block">
            <img
              src="https://preview.colorlib.com/theme/calvino/assets/img/gallery/shape-2.png"
              alt=""
            />
          </div>
        </section>
        <section>
          <Row className="container mx-auto px-20">
            <Col xs={12}>
              <img
                className="w-3/4"
                src="https://preview.colorlib.com/theme/calvino/assets/img/gallery/about1.png.webp"
                alt=""
              />
            </Col>
            <Col xs={9}>
              <div className="mb-[25px]">
                <h2 className="mb-[12px] mt-4 text-[36px] font-bold">
                  Friday được thiết kế để cung cấp cách trực quan và dễ dàng
                  nhất để tận dụng lợi ích của việc lập kế hoạch hàng ngày.
                </h2>
                <p className="mb-[15px] text-lg text-[#656565]">
                  Việc lập kế hoạch cho ngày mới giúp chúng ta hình dung mọi thứ
                  cần dành thời gian vào một nơi - các nhiệm vụ, cuộc họp và sự
                  kiện, giúp chúng ta minh bạch hơn và giảm căng thẳng.
                </p>
                <p className="mb-10 mt-[10px] text-lg text-[#656565]">
                  Việc lên lịch cho các nhiệm vụ sẽ tạo ra một kế hoạch hành
                  động thực tế và cho phép chúng ta dễ dàng theo dõi tiến độ,
                  tận hưởng cuộc sống có mục đích và kiểm soát được thời gian
                  của mình.
                </p>
              </div>
              <Link
                className='relative font-semibold text-[#192839] transition-all duration-[0.3s] ease-out before:absolute before:-bottom-[11px] before:h-[2px] before:w-full before:bg-[#ff4495] before:content-[""] hover:tracking-[1px]'
                href="/sign-up"
              >
                Khám phá thêm
              </Link>
            </Col>
          </Row>
        </section>
        <section className="bg-gradient-to-b from-white to-[#f3f4f6] py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#192839] mb-12 uppercase">
              Liên hệ
            </h2>
            <div className="flex justify-center gap-10">
              <a
                href="https://www.facebook.com/fridayand13th/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#4267B2] to-[#7db9e8] shadow-md">
                  <FaFacebook className="text-white text-2xl" />
                </div>
              </a>
              <a
                href="https://www.instagram.com/20.fridayand13th/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-110"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E1306C] to-[#ff6d6d] shadow-md">
                  <FaInstagram className="text-white text-2xl" />
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
