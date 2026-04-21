import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đọc file json nếu nó được chỉ định
let serviceAccount = null;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    const accountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
    if (fs.existsSync(accountPath)) {
      const rawData = fs.readFileSync(accountPath);
      serviceAccount = JSON.parse(rawData);
    } else {
      console.warn("Không tìm thấy file service account tại: ", accountPath);
    }
  }
} catch (error) {
  console.warn("Không thể đọc file service account. Admin SDK có thể không hoạt động hoặc đang dùng ADC.");
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Thường dùng khi deploy lên GCP hoặc để không crash nếu chưa có key
    admin.initializeApp();
    console.warn("Firebase Admin initialized without explicitly defined service account.");
  }
}

export const db = admin.firestore();
export default admin;
