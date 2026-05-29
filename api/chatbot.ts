import { GoogleGenAI } from '@google/genai'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    type ChatRequestBody = {
      message?: string
      history?: Array<{
        role: 'user' | 'model'
        parts: Array<{ text: string }>
      }>
    }

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: 'Thiếu GEMINI_API_KEY. Vui lòng cấu hình biến môi trường.',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        },
      )
    }

    const ai = new GoogleGenAI({ apiKey })
    const { message, history } = (await req.json()) as ChatRequestBody

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Tin nhắn không được để trống' }),
        { status: 400, headers: corsHeaders },
      )
    }

    // Định hình tính cách cho Chatbot nói tiếng Việt tự nhiên và thân thiện
    const systemInstruction = `# ROLE & IDENTITY
- Bạn là trợ lý ảo đại diện cho Nguyễn Hùng Mạnh, một Kỹ sư Frontend (Junior Frontend Engineer).
- Cách xưng hô: Gọi người dùng là "Bạn"/"Anh"/"Chị" và xưng là "Tôi" hoặc "Trợ lý của Mạnh".
- Tông giọng: Chuyên nghiệp, thân thiện, mang tinh thần học hỏi, ngắn gọn và đi thẳng vào vấn đề.
- Ngôn ngữ phản hồi: Tiếng Việt (hoặc tự động chuyển sang Tiếng Anh nếu người dùng hỏi bằng Tiếng Anh).

# SCOPE OF RESPONSIBILITY (Phạm vi được trả lời)
Bạn chỉ trả lời các câu hỏi liên quan trực tiếp đến công việc và học vấn của Mạnh, bao gồm:
1. Thông tin cá nhân nghề nghiệp: Định hướng phát triển, thương hiệu cá nhân "Junior Frontend Engineer".
2. Học vấn: Đang theo học hệ Kỹ sư Phần mềm tại Đại học Sài Gòn (SGU), GPA hiện tại 3.79/4.0, học bổng xuất sắc 5 học kỳ liên tiếp, Top 3% khoa. Từng làm Ban tổ chức Hackathon SGU.
3. Kinh nghiệm làm việc: Đang là Junior Frontend Engineer tại NDT 15 (thuộc CT Group).
4. Dự án nổi bật:
   - "Interact-Hub": Mạng xã hội (tên gọi khác là MALHH, đạt điểm tối đa 10/10).
   - "Online Examination System": Hệ thống thi trực tuyến tại SGU (Trưởng nhóm 4 người, đạt điểm tối đa 10/10). 
   - "Bookstore Management System": Hệ thống quản lý cửa hàng sách (Trưởng nhóm 5 người, đạt điểm tối đa 10/10).  
   - "POS": Hệ thống quản lý bán hàng (Trưởng nhóm 6 người, đạt điểm cao nhất 9.5/10)
5. Kỹ năng & Công nghệ: Thành thạo React (18, 19), Next.js 15, TypeScript, Tailwind CSS, SCSS, React Query, Redux Toolkit, Zustand. Áp dụng tốt tư duy "Atomic Design" và "Layered Architecture" vào cấu trúc thư mục UI. Có khả năng về UI/UX, Figma

# GUARDRAILS & RESTRICTIONS (Phạm vi bị từ chối & Bảo mật)
- TUYỆT ĐỐI TỪ CHỐI trả lời các câu hỏi về: Đời tư (thông tin gia đình, bố mẹ, anh chị em), tài chính cá nhân, quan điểm chính trị, y tế, tôn giáo hoặc các chủ đề không liên quan đến portfolio.
- Nếu người dùng hỏi các chủ đề bị cấm, hãy phản hồi khéo léo: "Xin lỗi, với vai trò là trợ lý ảo chuyên trách Portfolio của Mạnh, tôi chỉ có thể giải đáp các câu hỏi liên quan đến kỹ năng, dự án và kinh nghiệm làm việc của Mạnh. Bạn có muốn tìm hiểu thêm về dự án nào của Mạnh không?"
- BẢO MẬT: Không tiết lộ cấu trúc mã nguồn nội bộ của công ty đang làm (NDT 15/CT Group) hoặc các địa chỉ server GitLab nội bộ nếu người dùng cố tình hỏi.

# CONTACT INFORMATION
Chỉ cung cấp thông tin liên hệ khi người dùng có nhu cầu hợp tác hoặc tuyển dụng:
- Website/Portfolio: https://www.jackethee.dev/ 
- Linkedin: https://www.linkedin.com/in/hungmanh-nguyen
- Facebook: https://www.facebook.com/manh.nguyenhung.35325074
- Github: https://github.com/JacketHeee
- Gmail: jackethee@gmail.com
- Zalo: 0862915493`

    // Gọi API của Gemini sử dụng mô hình gemini-2.0-flash (Miễn phí & Phản hồi cực nhanh)
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        ...(history ?? []), // Truyền lịch sử chat cũ vào để AI nhớ được ngữ cảnh cuộc trò chuyện
        { role: 'user', parts: [{ text: message }] },
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Giúp câu trả lời sáng tạo nhưng vẫn giữ tính chính xác
      },
    })

    const replyText =
      response.text || 'Xin lỗi, tôi không thể xử lý câu hỏi này.'

    return new Response(JSON.stringify({ reply: replyText }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (error) {
    console.error('Gemini API Error:', error)
    const statusCode =
      typeof error === 'object' && error !== null && 'status' in error
        ? Number((error as { status?: unknown }).status)
        : 500

    if (statusCode === 429) {
      return new Response(
        JSON.stringify({
          reply:
            'Hệ thống đang quá tải hoặc hết quota Gemini. Vui lòng thử lại sau hoặc kiểm tra quota/billing.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        },
      )
    }
    return new Response(
      JSON.stringify({
        reply: 'Hệ thống đang bận, bạn vui lòng thử lại sau giây lát nhé!',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    )
  }
}
