import { db } from '../firebaseAdmin.js';
import emailjs from '@emailjs/nodejs';

export const createOrder = async (req, res) => {
  const { cartItems, customerInfo, paymentMethod, finalTotal, orderId } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: 'Giỏ hàng trống' });
  }

  try {
    // 1. CHẠY FIREBASE TRANSACTION TẠI SERVER
    await db.runTransaction(async (transaction) => {
      const productUpdates = [];

      for (const item of cartItems) {
        const productRef = db.collection('products').doc(item.id);
        const productSnap = await transaction.get(productRef);

        if (!productSnap.exists) {
          throw new Error(`Sản phẩm "${item.name}" không còn tồn tại trên hệ thống!`);
        }

        const currentStock = productSnap.data().stock;

        if (currentStock < item.quantity) {
          throw new Error(`Rất tiếc! "${item.name}" chỉ còn ${currentStock} sản phẩm trong kho.`);
        }

        productUpdates.push({
          ref: productRef,
          newStock: currentStock - item.quantity,
        });
      }

      // Xử lý trừ kho
      for (const update of productUpdates) {
        transaction.update(update.ref, { stock: update.newStock });
      }

      // Tạo Order Document
      const orderRef = db.collection('orders').doc(); // Tự render ID ngẫu nhiên của firebase
      
      transaction.set(orderRef, {
        orderId: orderId,
        customerName: customerInfo.fullName,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        customerAddress: customerInfo.address,
        items: cartItems,
        total: finalTotal,
        paymentMethod: paymentMethod,
        status: "PENDING",
        createdAt: new Date(),
      });
    });

    // 2. NẾU LƯU FIREBASE THÀNH CÔNG -> BẮT ĐẦU GỬI MAIL (Ở SERVER)
    try {
      const templateParams = {
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email,
        orderId: orderId,
        total: finalTotal.toLocaleString() + " VND",
        address: customerInfo.address,
      };

      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        templateParams,
        {
          publicKey: process.env.EMAILJS_PUBLIC_KEY,
          privateKey: process.env.EMAILJS_PRIVATE_KEY
        }
      );
      console.log(`Đã gửi email xác nhận thành công cho đơn ${orderId}!`);
    } catch (mailError) {
      console.error("Lỗi khi gửi email qua server:", mailError);
    }

    // Trả kết quả thành công về cho Frontend
    res.status(200).json({ success: true, message: 'Đặt hàng thành công', orderId: orderId });

  } catch (error) {
    console.error("Lỗi đặt hàng (Server): ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
