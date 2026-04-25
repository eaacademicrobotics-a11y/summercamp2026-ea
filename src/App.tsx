/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Cpu,
  Box,
  Globe,
  Notebook,
  Rocket,
  Target,
  Clock,
  Users,
  Zap,
  Award,
  Terminal,
  Layers,
  Sparkles,
  X,
  Calendar,
  ChevronRight,
  Info
} from "lucide-react";
import { useState } from "react";
import mascotEdi from "./assets/EDI-1.png";

/// Curriculum Data
const juniorCurriculum = [
  { week: 1, session: 1, stage: "UPGRADE", title: "Robot bảo vệ đôi mắt", product: "Robot Cú mèo", description: "Robot vỗ cánh nhắc nhở khi học sinh ngồi quá sát mặt bàn.", goal: "Hiểu cảm biến khoảng cách và logic phản xạ cơ học.", activities: "Thử thách ngồi sai tư thế; Lắp ráp & lập trình Cú mèo.", notebook: "Chụp ảnh robot, nạp vào kho dữ liệu; AI hỗ trợ HS mô tả.", tags: ["Robotics", "Lego"], image: "https://roboinstruction.com/wp-content/uploads/edd/2020/11/owl-render.png" },
  { week: 1, session: 2, stage: "UPGRADE", title: "Két sắt bí mật", product: "Hộp bí mật thông minh", description: "Hộp đựng đồ mở khóa bằng mật mã nghiêng hoặc vỗ tay.", goal: "Cơ cấu khóa cài bánh răng; lập trình điều kiện đa tầng.", activities: "Tìm hiểu ổ khóa thật; Chế tạo 'mật mã' bằng chuyển động.", notebook: "Ghi âm thuyết minh cách hoạt động của khóa bảo mật.", tags: ["Robotics", "Security"], image: "https://этоделотехники.рф/wp-content/uploads/2025/01/%D0%A1%D0%B5%D0%B9%D1%84-Lego-Wedo-2.0.png" },
  { week: 2, session: 3, stage: "UPGRADE", title: "Đấu trường bóng bàn (P1)", product: "Ping Pong Arcade", description: "Bàn đấu đối kháng sử dụng hệ thống ròng rọc trượt.", goal: "Hiểu hệ ròng rọc; Phối hợp động cơ thực hiện nhiệm vụ.", activities: "Xây dựng khung đấu trường; Lắp ráp cơ cấu gạt bóng.", notebook: "Quay clip thử nghiệm; AI tóm tắt thông số vật lý.", tags: ["Robotics", "Physics"], image: "https://i.ytimg.com/vi/u1T5qvrWKJU/maxresdefault.jpg" },
  { week: 2, session: 4, stage: "UPGRADE", title: "Đấu trường bóng bàn (P2)", product: "Ping Pong Arcade", description: "Hoàn thiện bàn đấu đối kháng và tổ chức giải đấu.", goal: "Điều khiển đa động cơ; Kỹ thuật truyền động phức hợp.", activities: "Lập trình đối kháng; Tổ chức giải đấu bóng bàn.", notebook: "Quay clip trận đấu; AI tóm tắt chiến thuật.", tags: ["Robotics", "Competition"], image: "https://i.ytimg.com/vi/u1T5qvrWKJU/maxresdefault.jpg" },
  { week: 3, session: 5, stage: "OPTIMIZE", title: "Thợ săn từ vựng AI (P1)", product: "App Vocab AI", description: "Ứng dụng nhận diện đồ vật thật qua camera và phát âm.", goal: "Huấn luyện máy học (Machine Learning); Xử lý hình ảnh.", activities: "Thu thập dữ liệu đồ vật; Huấn luyện mô hình AI.", notebook: "Lưu danh sách từ vựng thành Từ điển AI cá nhân.", tags: ["AI", "Coding"], image: "https://ai.thestempedia.com/wp-content/uploads/2022/06/Object-Detection.png" },
  { week: 3, session: 6, stage: "OPTIMIZE", title: "Thợ săn từ vựng AI (P2)", product: "App Vocab AI", description: "Lập trình giao diện học tập thông minh hoàn chỉnh.", goal: "Xử lý dữ liệu thời gian thực; Lập trình giao diện App.", activities: "Lập trình phát âm tự động; Thiết kế giao diện tương tác.", notebook: "Ghi chú về logic máy học; AI gợi ý phương pháp học.", tags: ["AI", "GenAI"], image: "https://ai.thestempedia.com/wp-content/uploads/2022/06/Object-Detection.png" },
  { week: 4, session: 7, stage: "LEVEL UP", title: "Thẻ học tập ma thuật AR", product: "Flashcards 3D", description: "Soi iPad hiện mô hình 3D sinh động từ thẻ giấy.", goal: "Công nghệ AR Markers; Thiết kế vật thể không gian ảo.", activities: "Thiết kế thẻ tri thức; Trải nghiệm tương tác AR 3D.", notebook: "Chụp ảnh tương tác AR; AI viết nội dung mô tả tri thức.", tags: ["AR/VR", "Visual Art"], image: "https://cdn.prod.website-files.com/5b7529a016d8f25106c56acf/6551cd589632569c7d6d0626_Screenshot%20(36).png" },
  { week: 4, session: 8, stage: "LEVEL UP", title: "Mê cung ảo trên tay", product: "Merge Cube Maze", description: "Điều khiển bi ảo qua khối Merge Cube trên tay.", goal: "Tương tác trọng lực ảo; Tư duy mê cung 6 mặt.", activities: "Xây dựng bẫy và phần thưởng ảo; Thi giải mã mê cung.", notebook: "Ghi lại kỷ lục phá đảo; AI viết hướng dẫn chơi.", tags: ["AR/VR", "Logic"], image: "https://drawandcode.com/wp-content/uploads/2023/06/Merge-Cube-Banner-1024x576.jpg" },
  { week: 5, session: 9, stage: "FEATURE", title: "Dự án PBL: Future World (P1)", product: "My Smart Station", description: "Lên kế hoạch kết nối các sản phẩm tuần 1-4 thành hệ thống.", goal: "Tư duy hệ thống; Quản trị dự án; Lập kế hoạch showcase.", activities: "Phác thảo sơ đồ liên kết; Lập trình giao thức kết nối.", notebook: "Nạp bản phác thảo vào NotebookLM; AI gợi ý logic.", tags: ["PBL", "System"], image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300" },
  { week: 5, session: 10, stage: "FEATURE", title: "Dự án PBL: Future World (P2)", product: "My Smart Station", description: "Kết nối Robot, App AI và Không gian AR thành hệ sinh thái.", goal: "Tư duy liên kết đa nền tảng; Hoàn thiện sản phẩm.", activities: "Lắp ráp gian hàng; Kết nối các module công nghệ.", notebook: "AI Studio tóm tắt tính năng đột phá của hệ thống.", tags: ["PBL", "Integration"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300" },
  { week: 6, session: 11, stage: "SHOWCASE", title: "Hoàn thiện & Tập dượt", product: "My Smart Station", description: "Đóng gói hành trình chuyên nghiệp với Portfolio số.", goal: "Kỹ năng thuyết trình; Sử dụng NotebookLM tạo nội dung.", activities: "Xuất bản Podcast giới thiệu; Tập dượt trình diễn.", notebook: "Hoàn thiện bản Podcast AI 3 phút giới thiệu dự án.", tags: ["Final", "Showcase"], image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300" },
  { week: 6, session: 12, stage: "SHOWCASE", title: "Lễ ra mắt STEM Showcase", product: "MY SMART STATION", description: "Trình diễn hệ sinh thái công nghệ trước gia đình & bạn bè.", goal: "Sự tự tin & Bản lĩnh sáng tạo; Tổng kết hành trình.", activities: "Setup gian hàng; Trình diễn Showcase toàn diện.", notebook: "Nhận chứng chỉ; Xuất bản mã QR Portfolio cá nhân.", tags: ["Event", "Granduation"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
];

const proCurriculum = [
  { week: 1, session: 1, stage: "UPGRADE", title: "Dàn nhạc kỹ thuật số (P1)", product: "DJ Robot", description: "Khám phá cấu trúc âm thanh và nốt nhạc số.", goal: "Xử lý cảm biến đa điểm; Cấu trúc nhạc cụ điện tử.", activities: "Khám phá MIDI; Lắp ráp trạm DJ tương tác.", notebook: "Lưu sơ đồ nốt nhạc; AI gợi ý bản phối khí.", tags: ["Robotics", "Audio"], image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=300" },
  { week: 1, session: 2, stage: "UPGRADE", title: "Dàn nhạc kỹ thuật số (P2)", product: "DJ Robot", description: "Robot phát nhạc và tạo beat theo cử chỉ tay không chạm.", goal: "Xử lý dữ liệu thời gian thực; Lập trình trạm DJ.", activities: "Lập trình sơ đồ âm thanh; Biểu diễn nhạc cụ robot.", notebook: "AI Studio phân tích cấu trúc bản phối âm thanh.", tags: ["Robotics", "MIDI"], image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=300" },
  { week: 2, session: 3, stage: "UPGRADE", title: "Trợ lý Cyber Buddy (P1)", product: "Robot Cyber Buddy", description: "Thiết kế bộ khung xoay đa hướng quét không gian.", goal: "Cơ cấu xoay trục đứng; Lập trình khung xoay 180 độ.", activities: "Lắp ráp trục xoay; Thiết kế biểu cảm LED AI.", notebook: "Lưu ảnh cấu tạo; AI tóm tắt nguyên lý Mắt thần.", tags: ["Robotics", "Engineering"], image: "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?auto=format&fit=crop&q=80&w=300" },
  { week: 2, session: 4, stage: "UPGRADE", title: "Trợ lý Cyber Buddy (P2)", product: "Robot Cyber Buddy", description: "Robot nhắc giờ học và biểu lộ cảm xúc LED cho góc học tập.", goal: "Giao diện người máy (HCI); Quản trị thời gian thực.", activities: "Lập trình Robot 'theo dõi' chủ nhân; Quản lý lịch học.", notebook: "Lưu sơ đồ logic code; AI viết kịch bản phản hồi.", tags: ["Robotics", "HCI"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=300" },
  { week: 3, session: 5, stage: "OPTIMIZE", title: "Gia sư trí tuệ Chatbot (P1)", product: "Study Bot", description: "Nạp dữ liệu tri thức vào AI và xây dựng kịch bản.", goal: "AI tạo sinh (GenAI); Kỹ nghệ câu lệnh (Prompt Engineering).", activities: "Thiết kế Persona cho Bot; Nạp tài liệu tri thức.", notebook: "Nạp tài liệu; 'Dạy' Chatbot trả lời thông minh.", tags: ["AI", "GenAI"], image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=300" },
  { week: 3, session: 6, stage: "OPTIMIZE", title: "Gia sư trí tuệ Chatbot (P2)", product: "Study Bot", description: "Chatbot giải đáp kiến thức và tự soạn đề ôn tập hoàn chỉnh.", goal: "Lập trình logic trắc nghiệm; Tối ưu hóa phản hồi AI.", activities: "Kết nối Chatbot; Thiết lập kịch bản tự soạn đề Quiz.", notebook: "AI Studio xây dựng kịch bản hội thoại chuẩn sư phạm.", tags: ["AI", "Productivity"], image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=300" },
  { week: 4, session: 7, stage: "LEVEL UP", title: "Bảo tàng tri thức VR (P1)", product: "History/Science Portal", description: "Kiến tạo bối cảnh 3D sống động bằng AI.", goal: "Môi trường thực tế ảo 360 độ; Skybox AI generation.", activities: "Dùng AI tạo cảnh quan ảo; Thiết kế không gian 3D bối cảnh.", notebook: "Lưu kịch bản hành trình; AI hỗ trợ dịch thuật nội dung.", tags: ["AR/VR", "Immersive"], image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300" },
  { week: 4, session: 8, stage: "LEVEL UP", title: "Bảo tàng tri thức VR (P2)", product: "History/Science Portal", description: "Lập trình điểm tương tác khám phá tri thức nhập vai.", goal: "Lập trình điểm tương tác (Info-points); Logic điều hướng VR.", activities: "Xây dựng phòng thí nghiệm/bảo tàng; Lập trình info-points.", notebook: "Quay phim màn hình tương tác VR; AI mô tả kiến trúc.", tags: ["AR/VR", "Multimedia"], image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=300" },
  { week: 5, session: 9, stage: "FEATURE", title: "Dự án PBL: Future World (P1)", product: "Future World Ecosystem", description: "Phác thảo kiến trúc kết nối Robot, AI và VR hoàn chỉnh.", goal: "Tư duy hệ thống đồng bộ; Quản trị dữ liệu đa nền tảng.", activities: "Phác thảo logic hệ thống; Thiết lập giao thức tích hợp.", notebook: "Ghi chú kiến trúc hệ thống; AI kiểm tra tính logic.", tags: ["PBL", "System"], image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=300" },
  { week: 5, session: 10, stage: "FEATURE", title: "Dự án PBL: Future World (P2)", product: "Future World Ecosystem", description: "Hoàn thiện hệ sinh thái công nghệ đa năng độc bản.", goal: "Tối ưu hóa tương tác tổng thể; Debug hệ thống phức hợp.", activities: "Hoàn thiện code tích hợp; Kiểm thử tính ổn định toàn chặng.", notebook: "AI Studio viết bài luận tổng kết tầm nhìn dự án.", tags: ["PBL", "Full-stack"], image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=300" },
  { week: 6, session: 11, stage: "SHOWCASE", title: "Hoàn thiện Portfolio & Tập dượt", product: "Digital Portfolio (Pro)", description: "Xây dựng hồ sơ năng lực số đỉnh cao và luyện tập showcase.", goal: "Leadership & Branding; Quản trị NotebookLM Studio.", activities: "Xuất bản Podcast giới thiệu; Tập diễn thuyết chuyên sâu.", notebook: "Audio Overview giới thiệu hệ sinh thái dài 3 phút.", tags: ["Final", "Leadership"], image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=300" },
  { week: 6, session: 12, stage: "SHOWCASE", title: "Lễ ra mắt STEM Showcase", product: "FUTURE WORLD ECOSYSTEM", description: "Trình diễn bản lĩnh Kỹ sư trưởng và hệ sinh thái thông minh.", goal: "Thuyết trình chuyên nghiệp; Khẳng định năng lực cá nhân.", activities: "Setup mạng VR/AI; Trình diễn Showcase toàn diện.", notebook: "Bàn giao Portfolio mã QR; Nhận chứng chỉ Kỹ sư trưởng.", tags: ["Event", "Professional"], image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=300" },
];

const phases = [
  {
    id: 1,
    title: "UPGRADE MY SPACE",
    subtitle: "ROBOTICS",
    weeks: "Tuần 1 - 2 (4 buổi)",
    icon: <Bot className="w-5 h-5" />,
    colorClass: "bg-indigo-600 text-white",
    badgeClass: "bg-indigo-50 text-indigo-600",
    description: "Con tự tay chế tạo \"Trợ thủ vật lý\" (Robot nhắc tư thế ngồi, Két sắt bảo mật) để rèn luyện tính kỷ luật và làm chủ không gian sống.",
    products: ["Robot Cú mèo", "Két sắt bí mật", "DJ Robot"],
    fullGoal: "Làm chủ không gian sống thông qua việc cơ giới hóa và tự động hóa các vật dụng xung quanh bằng cảm biến và động cơ.",
    techValue: "Tự động hóa, Cơ khí ứng dụng (bánh răng, đòn bẩy), Cảm biến thông minh (siêu âm, nghiêng, màu sắc).",
    juniorProducts: ["Robot Cú mèo bảo vệ mắt", "Hộp bí mật thông minh", "Đấu trường bóng bàn Arcade"],
    proProducts: ["Dàn nhạc DJ Robot không chạm", "Trợ lý Cyber Buddy quản trị bàn học"],
    notebookActivity: "Khởi tạo nhật ký kỹ sư số, nạp ảnh cấu tạo robot và dùng AI để phân tích nguyên lý chuyển động."
  },
  {
    id: 2,
    title: "OPTIMIZE MY MIND",
    subtitle: "CODING AI",
    weeks: "Tuần 3 (2 buổi)",
    icon: <Cpu className="w-5 h-5" />,
    colorClass: "bg-emerald-600 text-white",
    badgeClass: "bg-emerald-50 text-emerald-600",
    description: "Thay vì lệ thuộc vào AI, con học cách điều phối nó. Huấn luyện máy tính nhận diện và lập trình Chatbot gia sư để tối ưu hiệu suất học tập.",
    products: ["App Vocab AI", "Study Bot"],
    fullGoal: "Ứng dụng AI để giải quyết bài toán ghi nhớ, tập trung và quản lý tri thức, biến công nghệ thành trợ lý đắc lực.",
    techValue: "Máy học (Machine Learning) nhận diện hình ảnh, AI tạo sinh (GenAI) xây dựng kịch bản hội thoại thông minh.",
    juniorProducts: ["Thợ săn từ vựng App Vocab AI"],
    proProducts: ["Gia sư trí tuệ Study Bot tự soạn đề"],
    notebookActivity: "Huấn luyện AI cá nhân hóa, tóm tắt kịch bản tương tác và lưu trữ kho dữ liệu máy học vào Portfolio."
  },
  {
    id: 3,
    title: "LEVEL UP MY WORLD",
    subtitle: "VR/AR",
    weeks: "Tuần 4 (2 buổi)",
    icon: <Globe className="w-5 h-5" />,
    colorClass: "bg-purple-600 text-white",
    badgeClass: "bg-purple-50 text-purple-600",
    description: "Phá bỏ mọi giới hạn thực tại. Con kiến tạo không gian ảo 360 độ và mê cung tương tác, biến kiến thức sách vở thành trải nghiệm chạm vào được.",
    products: ["Flashcards 3D", "Merge Cube", "VR Portal"],
    fullGoal: "Mở rộng trải nghiệm tri thức và giải trí vào không gian ảo, nơi ý tưởng không còn bị giới hạn bởi ranh giới vật lý.",
    techValue: "Công nghệ nhập vai VR/AR, Thực tế hỗn hợp Merge Cube, AI tạo cảnh quan 360 độ và điểm tương tác ảo.",
    juniorProducts: ["Thẻ học tập ma thuật Flashcards 3D", "Mê cung Merge Cube Maze"],
    proProducts: ["Bảo tàng tri thức VR (History/Science Portal)"],
    notebookActivity: "Phác thảo kiến trúc 3D, lưu kịch bản hành trình ảo và quay phim màn hình tương tác thực tế ảo."
  },
  {
    id: 4,
    title: "FUTURE ME SYSTEM",
    subtitle: "Dự án PBL",
    weeks: "Tuần 5 - 6 (4 buổi)",
    icon: <Rocket className="w-5 h-5" />,
    colorClass: "bg-orange-500 text-white",
    badgeClass: "bg-orange-50 text-orange-600",
    description: "Chặng về đích bùng nổ! Con hội quân cùng bè bạn trong vai trò \"Kỹ sư trưởng\", rèn luyện kỹ năng lãnh đạo, làm việc nhóm và giải quyết vấn đề thực tế để xây dựng một hệ sinh thái công nghệ vì cộng đồng.",
    products: ["My Smart Station", "Future World Ecosystem"],
    fullGoal: "Kết nối toàn bộ Robot, App AI và Không gian ảo thành một trạm công nghệ FUTURE WORLD đồng bộ và trình diễn.",
    techValue: "Tư duy hệ thống (System Thinking), Giải quyết vấn đề (PBL), Xây dựng Portfolio số qua NotebookLM.",
    juniorProducts: ["Trạm học tập My Smart Station"],
    proProducts: ["Hệ điều hành Future World Ecosystem"],
    notebookActivity: "AI Studio tổng hợp hành trình 6 tuần, xuất bản kịch bản thuyết trình và Podcast giới thiệu dự án."
  },
];

// Components
const LessonModal = ({ item, onClose }: { item: any, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.95, y: 20 }}
      className="bg-white w-full max-w-3xl rounded-[2rem] border-2 border-slate-900 brutalist-shadow-sm overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg italic shadow-md">
            {item.session < 10 ? `0${item.session}` : item.session}
          </div>
          <div>
            <div className="label-caps !text-slate-400 text-[10px] uppercase tracking-widest">Tuần {item.week} / Buổi {item.session}</div>
            <h3 className="font-black text-lg uppercase tracking-tight italic">{item.title}</h3>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="label-caps mb-1.5 text-brand-blue text-[10px] uppercase tracking-widest">Sản phẩm bài học</div>
              <p className="font-black text-xl text-slate-800 uppercase italic leading-tight tracking-tight">{item.product}</p>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed font-medium italic border-l-2 border-brand-blue/20 pl-3">{item.description}</p>
            </div>

            <div className="aspect-video bg-slate-100 rounded-2xl border border-slate-900 brutalist-shadow-sm overflow-hidden relative group">
              <img
                src={item.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={item.title}
              />

            </div>

            <div>
              <div className="label-caps mb-1 text-slate-500 text-[8px] uppercase tracking-widest">Mục tiêu cốt lõi</div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.goal}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
              <div className="label-caps mb-3 text-slate-900 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Target className="w-4 h-4 text-brand-blue" /> Hoạt động chính
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic font-medium">{item.activities}</p>
            </div>

            <div className="p-6 bg-brand-blue/5 rounded-2xl border border-brand-blue/20 shadow-sm rotate-1">
              <div className="flex items-center gap-2 mb-3">
                <Notebook className="w-5 h-5 text-brand-blue" />
                <span className="font-black text-[10px] uppercase tracking-widest text-brand-blue italic">NotebookLM Studio Trace</span>
              </div>
              <p className="text-sm text-slate-700 italic leading-relaxed font-bold">
                "{item.notebook}"
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
          {item.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-mono border border-slate-200 uppercase font-black tracking-widest">
              #{tag}
            </span>
          ))}
        </div>
      </div>


    </motion.div>
  </motion.div>
);

const PhaseModal = ({ phase, onClose }: { phase: any, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      className="bg-white w-full max-w-4xl rounded-[2.5rem] border-2 border-slate-900 brutalist-shadow-sm overflow-hidden flex flex-col md:flex-row relative"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 bg-white/20 hover:bg-white/40 md:bg-slate-100 md:hover:bg-slate-200 rounded-full transition-colors backdrop-blur-sm border border-white/30 md:border-slate-200"
      >
        <X className="w-5 h-5 text-white md:text-slate-900" />
      </button>
      {/* Sidebar: Icon & Basic Info */}
      <div className={`md:w-1/3 p-10 flex flex-col items-center justify-center text-center gap-6 ${phase.colorClass} border-b-2 md:border-b-0 md:border-r-2 border-slate-900 shadow-lg`}>
        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 rotate-3 shadow-xl">
          {phase.icon && (
            <div className="scale-[2] text-white">
              {phase.icon}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <span className="bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-1 inline-block shadow-sm">
            {phase.weeks}
          </span>
          <h3 className="text-2xl font-black uppercase italic leading-none tracking-tighter drop-shadow-lg">
            {phase.title}
          </h3>
          <div className="label-caps mt-1 opacity-90 text-[10px] font-bold tracking-widest uppercase text-white shadow-sm">{phase.subtitle}</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[80vh] bg-slate-50 md:bg-white">
        <div className="space-y-12">
          {/* Section: Overview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="label-caps !text-slate-400 text-[9px] uppercase tracking-widest">Tổng quan chặng</span>
            </div>
            <p className="text-lg font-black text-slate-600 italic leading-relaxed border-l-4 border-slate-100 pl-4">
              "{phase.description}"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Subsection: Goals */}
            <div className="space-y-6">
              <div>
                <div className="label-caps text-brand-blue mb-1 text-[10px] uppercase tracking-widest">Mục tiêu cốt lõi</div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{phase.fullGoal}</p>
              </div>
              <div>
                <div className="label-caps text-indigo-600 mb-1 text-[10px] uppercase tracking-widest">Giá trị công nghệ</div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{phase.techValue}</p>
              </div>
            </div>

            {/* Subsection: NotebookLM */}
            <div className="bg-brand-blue/5 p-6 rounded-2xl border-2 border-brand-blue/20 rotate-1 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2 mb-3 text-brand-blue relative z-10">
                <Notebook className="w-5 h-5" />
                <span className="label-caps !text-brand-blue text-[10px] uppercase tracking-widest">NotebookLM Studio Trace</span>
              </div>
              <p className="text-sm font-black text-slate-700 italic leading-relaxed relative z-10">
                "{phase.notebookActivity}"
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-100">
            <h4 className="label-caps flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
              <Layers className="w-5 h-5 text-brand-blue" /> Sản phẩm tiêu biểu sau chặng
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-[9px] font-black uppercase text-slate-400 bg-slate-100 px-3 py-1 rounded-md inline-block tracking-widest">Junior Makers</div>
                <ul className="space-y-2">
                  {phase.juniorProducts.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-600 tracking-tight leading-tight">
                      <span className="text-brand-blue mt-0.5 shrink-0">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-[9px] font-black uppercase text-indigo-100 bg-indigo-600 px-3 py-1 rounded-md inline-block tracking-widest">Pro Makers</div>
                <ul className="space-y-2">
                  {phase.proProducts.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-bold text-slate-600 tracking-tight leading-tight">
                      <span className="text-indigo-600 mt-0.5 shrink-0">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<"junior" | "pro">("junior");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedPhase, setSelectedPhase] = useState<any>(null);
  const [showNotebookDetail, setShowNotebookDetail] = useState(false);
  const [showShowcaseDetail, setShowShowcaseDetail] = useState(false);

  const currentData = activeTab === "junior" ? juniorCurriculum : proCurriculum;

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col tech-grid-dense text-slate-900">
      <div className="max-w-[1080px] mx-auto w-full flex-1 flex flex-col gap-10">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src="https://static.ybox.vn/2021/6/4/1622738337045-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20(7).png"
              alt="Logo Edison STEM Academy"
              className="h-16 md:h-20 object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-brand-blue font-black tracking-[0.2em] text-[10px] uppercase">
                <span className="bg-brand-blue text-white px-2 py-0.5 rounded-sm">EDISON STEM ACADEMY</span>
                <span>CHƯƠNG TRÌNH HÈ 2026</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-none mb-2 tracking-tighter uppercase italic">FUTURE ME - FUTURE WORLD</h1>
              <p className="text-sm md:text-lg font-black text-brand-blue uppercase tracking-[0.15em] flex items-center justify-center md:justify-start gap-2 italic">
                <Sparkles className="w-5 h-5" /> EA SUMMER CAMP STEM TREK 2026
              </p>
            </div>
          </div>
        </header>

        {/* Level Path Intro Section */}
        <section className="bg-slate-900 text-white p-6 md:p-12 rounded-[3rem] border-2 border-slate-900 brutalist-shadow relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 tech-grid-dense rounded-[3rem]"></div>

          <div className="relative z-10 space-y-12">
            {/* Header Area - Justified Layout Like Description */}
            <div className="space-y-8 border-b border-white/5 pb-12 w-full">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight text-white drop-shadow-xl w-full text-justify whitespace-normal">
                HÀNH TRÌNH PHÁT HÀNH PHIÊN BẢN <span className="text-brand-yellow">TƯƠNG LAI CỦA CHÍNH CON</span>
              </h2>
              <p className="text-slate-200 text-base md:text-xl leading-relaxed w-full text-justify italic font-medium">
                Ba mẹ đang băn khoăn chọn trại hè cho con? Đừng để mùa hè của con trôi qua vô nghĩa trước màn hình điện thoại hay những lớp học khô khan. <strong className="text-white font-black">EA SUMMER CAMP STEM TREK 2026</strong> mang đến câu trả lời hoàn hảo: Nơi con không chỉ "học" công nghệ, mà dùng công nghệ để kiến tạo thế giới của riêng mình.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Middle Section: 4 Stages */}
              <div className="lg:col-span-7 space-y-12">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">
                  <span className="w-16 h-px bg-slate-800"></span>
                  LỘ TRÌNH 4 CHẶNG ĐỘT PHÁ
                  <span className="w-16 h-px bg-slate-800"></span>
                </div>

                <div className="relative space-y-0">
                  {/* Vertical Connector Line */}
                  <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-brand-blue via-emerald-500 to-orange-500 opacity-20"></div>

                  <div className="space-y-10">
                    {[
                      {
                        id: 1,
                        tag: "Tuần 1 - 2",
                        title: "UPGRADE MY SPACE",
                        icon: <Bot className="w-6 h-6 text-brand-blue" />,
                        color: "brand-blue",
                        desc: <>Con tự tay chế tạo <strong>"Trợ thủ vật lý"</strong> (Robot nhắc tư thế ngồi, Két sắt bảo mật) để rèn luyện tính kỷ luật và làm chủ không gian sống.</>
                      },
                      {
                        id: 2,
                        tag: "Tuần 3",
                        title: "OPTIMIZE MY MIND",
                        icon: <Cpu className="w-6 h-6 text-emerald-500" />,
                        color: "emerald-500",
                        desc: <>Thay vì lệ thuộc vào AI, con học cách điều phối nó. Huấn luyện máy tính nhận diện và lập trình Chatbot gia sư để tối ưu hiệu suất học tập.</>
                      },
                      {
                        id: 3,
                        tag: "Tuần 4",
                        title: "LEVEL UP MY WORLD",
                        icon: <Globe className="w-6 h-6 text-purple-500" />,
                        color: "purple-500",
                        desc: <>Phá bỏ mọi giới hạn thực tại. Con kiến tạo không gian ảo 360 độ và mê cung tương tác, biến kiến thức sách vở thành trải nghiệm chạm vào được.</>
                      },
                      {
                        id: 4,
                        tag: "Tuần 5 - 6",
                        title: "FUTURE ME SYSTEM",
                        icon: <Rocket className="w-6 h-6 text-orange-500" />,
                        color: "orange-500",
                        desc: <>Chặng về đích bùng nổ! Con hội quân cùng bè bạn trong vai trò <strong>"Kỹ sư trưởng"</strong>, giải quyết vấn đề thực tế để xây dựng một hệ sinh thái công nghệ vì cộng đồng.</>
                      }
                    ].map(chặng => (
                      <div key={chặng.id} className="relative pl-16 group">
                        <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl bg-${chặng.color}/10 border-2 border-${chặng.color} flex items-center justify-center z-10 group-hover:scale-110 transition-transform shadow-xl`}>
                          {chặng.icon}
                        </div>
                        <div className="pt-1">
                          <div className={`text-[10px] font-black text-${chặng.color} uppercase tracking-[0.2em] mb-1`}>CHẶNG {chặng.id}: {chặng.tag}</div>
                          <h3 className="text-xl font-black text-white leading-tight uppercase italic mb-2 tracking-tight">{chặng.title}</h3>
                          <p className="text-base text-slate-400 leading-relaxed italic font-medium">
                            {chặng.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Mascot */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative group w-full max-w-[400px]">
                  <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full group-hover:bg-brand-blue/30 transition-colors animate-pulse"></div>
                  <img
                    src={mascotEdi}
                    alt="Mascot EDI"
                    className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Area - Tags Orange Box */}
            <div className="pt-12 border-t border-white/5 flex flex-wrap justify-center lg:justify-end gap-3 relative z-20">
              {phases.map(p => (
                <div key={p.id} className="flex items-center gap-3 bg-slate-800/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 group hover:border-brand-blue hover:bg-slate-800 transition-all cursor-default shadow-2xl">
                  <div className={`w-6 h-6 rounded-md ${p.colorClass} flex items-center justify-center scale-75`}>
                    {p.icon}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-300">{p.subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="mt-16">
          <h2 className="text-3xl font-black uppercase mb-10 italic tracking-tighter text-slate-900 border-l-8 border-brand-blue pl-6">
            GIÁ TRỊ KHÁC BIỆT TẠI EA SUMMER CAMP STEM TREK 2026
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 border-2 border-slate-900 rounded-[2rem] p-8 brutalist-shadow-sm flex flex-col gap-4">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-xl flex items-center justify-center border-2 border-slate-900 shadow-lg">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-black text-2xl text-slate-900 uppercase italic leading-none tracking-tight">Năng lực thật</h3>
              <p className="text-lg text-slate-600 italic leading-relaxed">Từ người tiêu thụ màn hình trở thành người sáng tạo công nghệ.</p>
            </div>

            <div className="bg-indigo-50 border-2 border-slate-900 rounded-[2rem] p-8 brutalist-shadow-sm flex flex-col gap-4">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-xl flex items-center justify-center border-2 border-slate-900 shadow-lg">
                <Notebook className="w-7 h-7" />
              </div>
              <h3 className="font-black text-2xl text-slate-900 uppercase italic leading-none tracking-tight">Công cụ NotebookLM</h3>
              <p className="text-lg text-slate-600 italic leading-relaxed">AI Studio giúp con lưu trữ tri thức và xuất bản Portfolio năng lực số chuyên nghiệp.</p>
            </div>

            <div className="bg-purple-50 border-2 border-slate-900 rounded-[2rem] p-8 brutalist-shadow-sm flex flex-col gap-4">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-xl flex items-center justify-center border-2 border-slate-900 shadow-lg">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-black text-2xl text-slate-900 uppercase italic leading-none tracking-tight">Showcase rực rỡ</h3>
              <p className="text-lg text-slate-600 italic leading-relaxed">Buổi trình diễn hệ sinh thái thông minh giúp con tự tin khẳng định bản sắc trước phụ huynh.</p>
            </div>
          </div>
        </section>

        {/* Phase Details Section */}
        <section className="pt-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div className="border-l-4 border-brand-blue pl-4">
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-900 leading-none">
                Chi tiết 4 chặng nâng cấp
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Bấm vào từng chặng để xem mục tiêu và sản phẩm chi tiết.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5" /> Tổng thời lượng: 6 tuần / 12 buổi
            </div>
          </div>

          <main className="grid grid-cols-12 gap-8">
            {/* Notebook highlight */}
            <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <motion.div
                onClick={() => setShowNotebookDetail(true)}
                className="bg-brand-blue text-white p-8 rounded-3xl flex-1 relative overflow-hidden flex flex-col border-2 border-slate-900 brutalist-shadow-sm cursor-pointer group hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Notebook className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                  <h3 className="font-black text-xl leading-tight uppercase tracking-tight italic">NotebookLM Studio Highlight</h3>
                </div>
                <p className="text-base text-blue-100 mb-6 leading-relaxed flex-1 italic font-medium">
                  "Trợ lý tri thức giúp học sinh lưu trữ dữ liệu, xây dựng hồ sơ năng lực số (Portfolio) và sáng tạo kịch bản thuyết trình chuyên nghiệp."
                </p>
                <ul className="space-y-3">
                  {[
                    "Nhật ký kỹ sư số",
                    "Audio Podcast giới thiệu",
                    "Kịch bản thuyết trình AI"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-black uppercase tracking-wider">
                      <div className="w-5 h-5 rounded-full bg-white/20 mt-0.5 shrink-0 flex items-center justify-center font-bold text-[10px]">✓</div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase opacity-70 group-hover:opacity-100 transition-opacity tracking-widest">
                  Xem chi tiết chiến thuật <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              </motion.div>

              <div className="bg-slate-900 text-white p-8 rounded-3xl border-4 border-slate-900 brutalist-shadow-sm">
                <div className="label-caps text-slate-400 mb-6 flex items-center gap-3 text-xs">
                  <Terminal className="w-4 h-4" /> Công cụ cốt lõi
                </div>
                <div className="flex flex-wrap gap-3">
                  {["NOTEBOOKLM", "Assemblr EDU", "TINKER CAD", "MAKER EMPIRE", "Delightex Edu", "Lego", "Scratch", "Pictoblox"].map(tech => (
                    <span key={tech} className="px-3 py-2 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono font-bold tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            {/* Featured Phases Gallery/Info */}
            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {phases.map((phase) => (
                <div
                  key={phase.id}
                  onClick={() => setSelectedPhase(phase)}
                  className="bg-white p-8 rounded-3xl border-2 border-slate-900 brutalist-shadow-sm flex flex-col cursor-pointer group hover:border-brand-blue hover:translate-y-[-4px] transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black tracking-widest shadow-sm uppercase ${phase.badgeClass}`}>
                      {phase.weeks}
                    </span>
                    <div className={`w-12 h-12 rounded-xl ${phase.colorClass} flex items-center justify-center border-2 border-slate-900 group-hover:rotate-6 transition-transform shadow-md`}>
                      <div className="scale-100">{phase.icon}</div>
                    </div>
                  </div>
                  <div className="label-caps mb-1.5 text-slate-400 font-black tracking-widest text-[9px] uppercase">{phase.subtitle}</div>
                  <h4 className="font-black text-xl text-slate-900 mb-3 leading-none uppercase tracking-tight italic flex items-center justify-between">
                    {phase.title}
                    <Info className="w-5 h-5 text-slate-200 group-hover:text-brand-blue transition-colors" />
                  </h4>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed font-medium italic">
                    {phase.description}
                  </p>
                  <div className="mt-auto">
                    <div className="grid grid-cols-3 gap-2">
                      {phase.products.map(item => (
                        <div key={item} className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-[8px] font-black text-slate-700 leading-tight flex items-center justify-center text-center italic group-hover:bg-brand-blue/5 transition-colors shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </section>

        {/* Curriculum Section - Moved down */}
        <section className="space-y-8 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2 border-l-4 border-brand-blue pl-4">
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">Lộ trình bài học chi tiết</h3>
              <p className="text-slate-500 text-sm">Chọn cấp độ để xem tiến độ 12 buổi bài học.</p>
            </div>
            <div className="flex bg-slate-200 p-2 rounded-2xl gap-2">
              <button
                onClick={() => setActiveTab("junior")}
                className={`px-10 py-4 rounded-xl font-black text-sm uppercase transition-all ${activeTab === "junior" ? "bg-white text-slate-900 brutalist-shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Junior Makers (6-9T)
              </button>
              <button
                onClick={() => setActiveTab("pro")}
                className={`px-10 py-4 rounded-xl font-black text-sm uppercase transition-all ${activeTab === "pro" ? "bg-white text-slate-900 brutalist-shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Pro Makers (10-13T)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedLesson(item)}
                className="bg-white group cursor-pointer border-2 border-slate-200 rounded-[2rem] p-6 hover:border-slate-900 hover:translate-y-[-4px] transition-all relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <span className="text-[10px] font-black italic text-brand-blue uppercase">BUỔI {item.session < 10 ? `0${item.session}` : item.session}</span>
                  <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <Info className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-black text-xl uppercase tracking-tighter leading-[1.1] mb-2 italic grow relative z-10 text-slate-900">{item.title}</h4>
                <div className="flex items-center gap-2.5 text-brand-blue mb-5 relative z-10 bg-white/50 backdrop-blur-sm p-1.5 rounded-lg inline-flex border border-brand-blue/10">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase truncate">{item.product}</span>
                </div>

                {/* Floating Product Image Illustration */}
                <div className="absolute -bottom-3 -right-3 w-28 md:w-36 h-28 md:h-36 opacity-25 blur-[2px] group-hover:opacity-60 group-hover:blur-0 transition-all duration-500 transform group-hover:scale-110 pointer-events-none">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover mix-blend-multiply drop-shadow-2xl transition-all"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center relative z-10">
                  <span className="px-2.5 py-0.5 bg-brand-blue/5 rounded-md text-[10px] font-bold text-brand-blue uppercase tracking-widest italic">
                    Tuần {item.week}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Showcase Footer */}
        <footer
          onClick={() => setShowShowcaseDetail(true)}
          className="bg-brand-yellow p-6 rounded-[1.5rem] border-2 border-slate-900 brutalist-shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6 overflow-hidden relative mt-10 cursor-pointer group hover:translate-y-[-3px] transition-all"
        >
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <Rocket className="w-24 h-24 rotate-12" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            <div className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-black text-[10px] uppercase rotate-[-1deg] tracking-widest flex items-center gap-2 shadow-md">
              <Award className="w-3.5 h-3.5 text-brand-yellow" /> Sự kiện Ra mắt
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-900/10"></div>
            <h5 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">
              Future World Showcase (Tuần 5 - 6)
            </h5>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-3 relative">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black group-hover:scale-110 transition-transform shadow-md">09</span>
              <div className="flex flex-col">
                <span className="label-caps text-slate-900 text-[7px] uppercase tracking-widest leading-none mb-0.5">Buổi 09</span>
                <span className="text-slate-900 text-xs font-black leading-none">Ý tưởng & Phác thảo PBL</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black group-hover:scale-110 transition-transform shadow-md">10</span>
              <div className="flex flex-col">
                <span className="label-caps text-slate-900 text-[7px] uppercase tracking-widest leading-none mb-0.5">Buổi 10</span>
                <span className="text-slate-900 text-xs font-black leading-none">Phát triển Hệ sinh thái</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black group-hover:scale-110 transition-transform shadow-md">11</span>
              <div className="flex flex-col">
                <span className="label-caps text-slate-900 text-[7px] uppercase tracking-widest leading-none mb-0.5">Buổi 11</span>
                <span className="text-slate-900 text-xs font-black leading-none">Hoàn thiện Portfolio số</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px] font-black group-hover:scale-110 transition-transform shadow-md">12</span>
              <div className="flex flex-col">
                <span className="label-caps text-slate-900 text-[7px] uppercase tracking-widest leading-none mb-0.5">Buổi 12</span>
                <span className="text-slate-900 text-xs font-black leading-none">Lễ ra mắt STEM Showcase</span>
              </div>
            </div>
            <div className="flex items-center self-center pl-2 text-slate-900 opacity-40 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </footer>

        {/* Final CTA Area */}
        <section className="py-12 flex flex-col items-center text-center gap-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-none">Sẵn sàng kiến tạo <br /> <span className="text-brand-blue underline decoration-brand-yellow decoration-[6px] underline-offset-2">Tương lai?</span></h2>
          <p className="text-base text-slate-500 max-w-lg font-medium">Bắt đầu hành trình nâng cấp bản thân và sở hữu hệ sinh thái công nghệ cá nhân đầu tiên của bạn ngay hôm nay.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button className="px-10 py-4 bg-brand-blue text-white rounded-xl font-black text-lg uppercase brutalist-shadow hover:translate-y-[-4px] transition-all">Đăng ký tham gia ngay</button>
            <button className="px-10 py-4 bg-white border-2 border-slate-900 rounded-xl font-black text-lg uppercase brutalist-shadow-sm hover:bg-slate-50 transition-all text-slate-900">Tư vấn lộ trình</button>
          </div>
        </section>

        {/* Small Footer Credits */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 border-t border-slate-200 mt-6 italic">
          <div className="flex items-center gap-6">
            <img
              src="https://static.ybox.vn/2021/6/4/1622738337045-Thi%E1%BA%BFt%20k%E1%BA%BF%20kh%C3%B4ng%20t%C3%AAn%20(7).png"
              alt="Logo Edison STEM Academy"
              className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 fill-slate-400" /> FUTURE ME - FUTURE WORLD / BROCHURE CHÍNH THỨC
            </div>
          </div>
          <div>© 2026 EDISON STEM ACADEMY / BẢO LƯU MỌI QUYỀN</div>
        </div>

        {/* Modal Portal */}
        <AnimatePresence mode="wait">
          {selectedLesson && <LessonModal item={selectedLesson} onClose={() => setSelectedLesson(null)} />}
          {selectedPhase && <PhaseModal phase={selectedPhase} onClose={() => setSelectedPhase(null)} />}

          {/* Notebook Detail Modal */}
          {showNotebookDetail && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-blue/90 backdrop-blur-xl"
              onClick={() => setShowNotebookDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
                className="bg-white w-full max-w-3xl rounded-[2rem] border-2 border-slate-900 brutalist-shadow-sm p-8 space-y-6 relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowNotebookDetail(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 text-brand-blue">
                  <Notebook className="w-8 h-8" />
                  <h3 className="text-xl font-black uppercase italic leading-none tracking-tight">Chiến thuật NotebookLM</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Xây dựng Portfolio từng buổi", desc: "Học sinh nạp ảnh, video và ghi chú bài học vào Notebook mỗi ngày để AI hệ thống hóa tri thức thành di sản cá nhân." },
                    { title: "Audio Overview (Podcast dự án)", desc: "Sử dụng tính năng phòng thu của NotebookLM để tạo ra một bản âm thanh giới thiệu dự án chuyên nghiệp dưới dạng đối thoại AI." },
                    { title: "FAQ & Thuyết trình", desc: "AI giúp học sinh xây dựng bộ câu hỏi phản biện và kịch bản thuyết trình phong cách sự kiện ra mắt sản phẩm chuẩn Pro." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-xs shrink-0">{i + 1}</span>
                      <div>
                        <h4 className="font-black uppercase text-base mb-0.5">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium italic">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Showcase Detail Modal */}
          {showShowcaseDetail && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-yellow/90 backdrop-blur-xl"
              onClick={() => setShowShowcaseDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
                className="bg-white w-full max-w-3xl rounded-[2rem] border-2 border-slate-900 brutalist-shadow-sm p-8 space-y-6 relative"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowShowcaseDetail(false)}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-900" />
                </button>

                <div className="flex items-center gap-3 text-slate-900">
                  <Award className="w-8 h-8" />
                  <h3 className="text-xl font-black uppercase italic leading-none tracking-tight">Future World Showcase</h3>
                </div>
                <p className="text-base font-black text-slate-500 italic leading-snug">"Hành trình 4 buổi cuối khóa tập trung vào việc thực hiện dự án PBL và kết nối hệ sinh thái tương lai."</p>

                <div className="space-y-3">
                  {[
                    { session: 9, title: "Ý tưởng & Phác thảo PBL", desc: "Lập kế hoạch kết nối các sản phẩm tuần 1-4 và phác thảo kịch bản trải nghiệm tri thức." },
                    { session: 10, title: "Xây dựng Hệ sinh thái", desc: "Liên kết Robot, App AI và Không gian ảo thành một trạm công nghệ đồng bộ FUTURE WORLD." },
                    { session: 11, title: "Hoàn thiện & Tập dượt", desc: "Dùng AI Studio đóng gói hành trình 6 tuần thành Portfolio số và luyện tập trình diễn Showcase." },
                    { session: 12, title: "Sự kiện Ra mắt (The Big Day)", desc: "Học sinh trình diễn hệ sinh thái công nghệ và thuyết trình về hành trình nâng cấp bản thân." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 rounded-xl border-2 border-slate-900 bg-brand-yellow/10">
                      <div className="px-3 py-1 bg-slate-900 text-white rounded-lg font-black text-[10px] uppercase shrink-0">Buổi {item.session}</div>
                      <div>
                        <h4 className="font-black uppercase text-base mb-0.5">{item.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium italic">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


