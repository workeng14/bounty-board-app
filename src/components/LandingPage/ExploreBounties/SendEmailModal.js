/** @format */
import { X, Mail } from "lucide-react";
import { useState } from "react";
import { message } from "antd";

const SendEmailModal = ({ open, onClose, recipientName, recipientEmail }) => {
  const [formData, setFormData] = useState({
    senderEmail: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.senderEmail || !formData.subject || !formData.message) {
      message.error('Please fill in all required fields!');
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      message.success(`Email sent successfully to ${recipientName}!`);
      console.log("Sending email:", formData);
      setIsSending(false);
      onClose();
      // Reset form
      setFormData({
        senderEmail: "",
        subject: "",
        message: "",
      });
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[600px] mx-4 bg-white rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E7F0FA] flex items-center justify-center">
              <Mail size={20} className="text-[#0A65CC]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#18191C]">Send Email</h2>
              <p className="text-sm text-[#767F8C]">Contact {recipientName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#F1F2F4] flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-[#5E6670]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* To Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-[#18191C] mb-2">
              To
            </label>
            <div className="h-11 px-4 flex items-center gap-2 bg-[#F1F2F4] rounded-lg border border-[#E4E5E8]">
              <Mail size={16} className="text-[#767F8C]" />
              <span className="text-sm text-[#5E6670]">{recipientEmail}</span>
            </div>
          </div>

          {/* From Field */}
          <div>
            <label className="block text-sm font-medium text-[#18191C] mb-2">
              Your Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.senderEmail}
              onChange={(e) =>
                setFormData({ ...formData, senderEmail: e.target.value })
              }
              placeholder="your.email@example.com"
              className="w-full h-11 px-4 rounded-lg border border-[#E4E5E8] text-sm text-[#18191C] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent transition-all"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-[#18191C] mb-2">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              placeholder="Enter email subject"
              className="w-full h-11 px-4 rounded-lg border border-[#E4E5E8] text-sm text-[#18191C] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent transition-all"
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-[#18191C] mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Write your message here..."
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-[#E4E5E8] text-sm text-[#18191C] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0A65CC] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="h-11 px-6 rounded-lg border border-[#E4E5E8] text-sm font-medium text-[#5E6670] hover:bg-[#F1F2F4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className={`h-11 px-6 rounded-lg text-sm font-semibold text-white transition-colors shadow-sm flex items-center gap-2 ${
                isSending
                  ? 'bg-[#9CB3CB] cursor-not-allowed'
                  : 'bg-[#0A65CC] hover:bg-[#0854A6]'
              }`}
            >
              <Mail size={16} />
              {isSending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailModal;


