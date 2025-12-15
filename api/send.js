// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
// ⭐  امسح هذا الكود وانسخ الكود التالي ⭐
// ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

// ================================
// 🔴 ضع التوكن والرقم هنا 👇
// ================================

const TELEGRAM_TOKEN = "8571723191:AAFTFj9gh46IpqSzSP89PSly2brscsD7gZs";
const TELEGRAM_CHAT_ID = "1069064542";

// ================================
// 🔴 مثال (استبدل بقيمك الحقيقية):
// const TELEGRAM_TOKEN = "7012345679:AAHhJkLmNoPqRsTuVwXyZ";
// const TELEGRAM_CHAT_ID = "987654321";
// ================================

module.exports = async (req, res) => {
  // السماح لجميع المصادر
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // التعامل مع OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // عرض رسالة ترحيبية
  if (req.method === 'GET') {
    return res.json({
      success: true,
      message: '✅ API إرسال تليجرام يعمل!',
      bot_token_set: TELEGRAM_TOKEN ? 'نعم' : 'لا',
      chat_id_set: TELEGRAM_CHAT_ID ? 'نعم' : 'لا',
      instructions: 'أرسل POST request مع {"message": "نص الرسالة"}'
    });
  }
  
  // إرسال رسالة (POST)
  if (req.method === 'POST') {
    try {
      // قراءة البيانات
      const { message } = req.body;
      
      // التحقق من الرسالة
      if (!message) {
        return res.status(400).json({ 
          success: false,
          error: 'الرسالة مطلوبة! مثال: {"message": "مرحبا"}' 
        });
      }
      
      // التحقق من التوكن
      if (!TELEGRAM_TOKEN || TELEGRAM_TOKEN === "ضع_توكن_البوت_هنا") {
        return res.status(400).json({ 
          success: false,
          error: 'لم تضف توكن البوت!',
          solution: 'غير السطر 9: const TELEGRAM_TOKEN = "توكنك هنا";'
        });
      }
      
      // التحقق من رقم الدردشة
      if (!TELEGRAM_CHAT_ID || TELEGRAM_CHAT_ID === "ضع_رقم_الدردشة_هنا") {
        return res.status(400).json({ 
          success: false,
          error: 'لم تضف رقم الدردشة!',
          solution: 'غير السطر 10: const TELEGRAM_CHAT_ID = "رقمك هنا";'
        });
      }
      
      // إرسال الرسالة لتليجرام
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });
      
      const result = await response.json();
      
      if (result.ok) {
        return res.json({
          success: true,
          message: '✅ تم إرسال الرسالة بنجاح!',
          message_id: result.result.message_id,
          chat_id: TELEGRAM_CHAT_ID,
          timestamp: new Date().toLocaleString('ar-SA')
        });
      } else {
        return res.status(400).json({
          success: false,
          error: '❌ فشل إرسال الرسالة',
          details: result.description || 'خطأ غير معروف'
        });
      }
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: '🔥 حدث خطأ في الخادم',
        details: error.message
      });
    }
  }
};
