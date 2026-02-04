import React, { useState } from "react";
import { Modal, Avatar, Button, Divider } from "antd";
import { 
  Calendar, 
  BookOpen, 
  FileText, 
  User, 
  Briefcase, 
  GraduationCap, 
  Shield, 
  ClipboardCheck,
  Phone,
  Mail,
  Globe,
  Download,
  Linkedin,
  X
} from "lucide-react";
import { SubTitleText } from "../../../../../shared/Texts/SubTitleText";
import SendEmailModal from "../../../../LandingPage/ExploreBounties/SendEmailModal";

export const ViewUserProfileModal = ({ open, onClose, userData }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Default user data
  const defaultUser = {
    userName: "Esther Howard",
    position: "Website Designer (UI/UX)",
    avatar: "https://ui-avatars.com/api/?name=Esther+Howard&background=0A65CC&color=fff",
    dateOfBirth: "14 June, 2021",
    nationality: "Bangladesh",
    maritalStatus: "Single",
    gender: "Male",
    experience: "7 Years",
    education: "Master Degree",
    bountiesCreated: 9,
    participatedIn: 14,
    phone: "+1-202-555-0141",
    email: "esther.howard@gmail.com",
    secondaryEmail: "esther.howard@gmail.com",
    website: "www.estherhoward.com",
    biography: "I've been passionate about graphic design and digital art from an early age, with a keen interest in Website and User Interface design. Over the years, I can create High-quality and aesthetically pleasing designs as per the requirements and expectations of clients within the stipulated time. Check out my work and feel free to discuss your graphic design needs. I mostly use Adobe Photoshop, Illustrator, XD, and Figma. I have experience in designing for various kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - Designing as per the needs for iOS, Android, and Hybrid Mobile Applications. *Wireframe Designs.",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    linkedIn: "https://linkedin.com/in/estherhoward"
  };

  const user = { ...defaultUser, ...userData };

  const InfoItem = ({ icon, label, value }) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-[12px] text-[#767F8C]">{label}</span>
      </div>
      <p className="text-[14px] font-medium text-[#18191C]">{value}</p>
    </div>
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width="75%"
      style={{ maxWidth: '1000px', top: 20 }}
      closeIcon={<X size={20} />}
    >
      <div className="max-h-[85vh] overflow-y-auto px-2">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pt-4">
          <div className="flex items-center gap-4">
            <Avatar 
              size={80} 
              src={user.avatar}
              style={{ backgroundColor: '#0A65CC' }}
            >
              {user.userName.charAt(0)}
            </Avatar>
            <div>
              <h1 className="text-[24px] font-semibold text-[#18191C]">{user.userName}</h1>
              <p className="text-[16px] text-[#767F8C]">{user.position}</p>
            </div>
          </div>
          <Button 
            className="flex items-center gap-2 px-4 py-2 h-[40px] rounded-lg border-[#0A65CC] text-[#0A65CC] hover:bg-[#E7F0FA]"
            icon={<Mail size={16} />}
            onClick={() => setShowEmailModal(true)}
          >
            Send Mail
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Biography */}
            <div>
              <SubTitleText text="BIOGRAPHY" size={18} color="#18191C" font="medium" className="mb-3" />
              <p className="text-[14px] text-[#5E6670] leading-relaxed">
                {user.biography}
              </p>
            </div>

            {/* Notes */}
            <div>
              <SubTitleText text="Notes" size={18} color="#18191C" font="medium" className="mb-3" />
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-[14px] text-[#5E6670] leading-relaxed">
                  {user.notes}
                </p>
              </div>
            </div>

            <Divider />

            {/* Social Media */}
            <div>
              <SubTitleText text="Follow me Social Media" size={14} color="#18191C" font="medium" className="mb-3" />
              <div className="flex items-center gap-3">
                <a 
                  href={user.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#0077B5] flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <Linkedin size={20} className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <SubTitleText text="Personal Details" size={16} color="#18191C" font="medium" className="mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <InfoItem 
                  icon={<Calendar size={16} className="text-[#0A65CC]" />}
                  label="DATE OF BIRTH"
                  value={user.dateOfBirth}
                />
                <InfoItem 
                  icon={<BookOpen size={16} className="text-[#0A65CC]" />}
                  label="NATIONALITY"
                  value={user.nationality}
                />
                <InfoItem 
                  icon={<FileText size={16} className="text-[#0A65CC]" />}
                  label="MARITAL STATUS"
                  value={user.maritalStatus}
                />
                <InfoItem 
                  icon={<User size={16} className="text-[#0A65CC]" />}
                  label="GENDER"
                  value={user.gender}
                />
                <InfoItem 
                  icon={<Briefcase size={16} className="text-[#0A65CC]" />}
                  label="EXPERIENCE"
                  value={user.experience}
                />
                <InfoItem 
                  icon={<GraduationCap size={16} className="text-[#0A65CC]" />}
                  label="EDUCATION"
                  value={user.education}
                />
                <InfoItem 
                  icon={<Shield size={16} className="text-[#0A65CC]" />}
                  label="BOUNTIES CREATED"
                  value={user.bountiesCreated}
                />
                <InfoItem 
                  icon={<ClipboardCheck size={16} className="text-[#0A65CC]" />}
                  label="PARTICIPATED IN"
                  value={user.participatedIn}
                />
              </div>
            </div>

            {/* Download Resume */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <SubTitleText text="Download My Resume" size={16} color="#18191C" font="medium" className="mb-3" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FileText size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#18191C]">{user.userName}</p>
                    <p className="text-[12px] text-[#767F8C]">PDF</p>
                  </div>
                </div>
                <button className="w-8 h-8 rounded-full bg-[#0A65CC] flex items-center justify-center hover:bg-[#0B5BB8] transition-colors">
                  <Download size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-4">
              <SubTitleText text="Contact Information" size={16} color="#18191C" font="medium" className="mb-3" />
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-[#0A65CC] mt-1" />
                  <div className="flex-1">
                    <span className="text-[12px] text-[#767F8C] block">PHONE</span>
                    <p className="text-[14px] font-medium text-[#18191C]">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#0A65CC] mt-1" />
                  <div className="flex-1">
                    <span className="text-[12px] text-[#767F8C] block">EMAIL ADDRESS</span>
                    <p className="text-[14px] font-medium text-[#18191C]">{user.email}</p>
                    
                    {user.secondaryEmail && (
                      <>
                        <span className="text-[12px] text-[#767F8C] block mt-2">SECONDARY EMAIL</span>
                        <p className="text-[14px] font-medium text-[#18191C]">{user.secondaryEmail}</p>
                      </>
                    )}
                  </div>
                </div>

                {user.website && (
                  <div className="flex items-start gap-3">
                    <Globe size={16} className="text-[#0A65CC] mt-1" />
                    <div className="flex-1">
                      <span className="text-[12px] text-[#767F8C] block">WEBSITE</span>
                      <p className="text-[14px] font-medium text-[#18191C]">{user.website}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Send Email Modal */}
      {showEmailModal && (
        <SendEmailModal
          open={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          recipientName={user.userName}
          recipientEmail={user.email}
        />
      )}
    </Modal>
  );
};

