const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'VND' },
  icon: { type: String, default: 'wallet' }, // Lưu tên icon để FE render
  color: { type: String, default: '#000000' }, // Mã màu ví
  isCredit: { type: Boolean, default: false }, // Nếu là thẻ tín dụng
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);