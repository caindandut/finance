const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  icon: { type: String, default: 'tag' },
  isDefault: { type: Boolean, default: false }, // Danh mục mặc định của hệ thống
}, { timestamps: true });

// Index để tìm kiếm nhanh
categorySchema.index({ user: 1, type: 1 });

module.exports = mongoose.model('Category', categorySchema);