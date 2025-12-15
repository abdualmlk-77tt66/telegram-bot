Enter# Telegram Bot API

API بسيط لإرسال رسائل تليجرام عبر Vercel.

## كيف تستخدم:
1. عدل التوكن ورقم الدردشة في `api/send.js`
2. انشر على Vercel
3. أرسل POST request

## مثال:
```bash
curl -X POST https://your-api.vercel.app/api/send \
  -H "Content-Type: application/json" \
  -d '{"message": "مرحبا!"}'
