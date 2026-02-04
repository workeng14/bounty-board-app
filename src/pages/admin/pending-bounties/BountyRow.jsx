import { Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { CategoryTag, StatusBadge } from "./Badges";
import { useAdminBounties } from "../../../context/AdminBountiesContext";

const BountyRow = ({ bounty, variant = "pending" }) => {
  const { approve, reject } = useAdminBounties();
  const navigate = useNavigate();

  return (
    <div className="flex items-center px-4 py-3">
      {/* Bounty name + email */}
      <div className="w-[32%] flex items-center gap-3">
        <Avatar size={34} className="bg-[#3B82F6]">{bounty.initials}</Avatar>
        <div>
          <div className="font-semibold text-[#111827] -mb-0.5">{bounty.posterName}</div>
          <div className="text-[12px] text-gray-500">{bounty.posterEmail}</div>
        </div>
      </div>

      {/* Category */}
      <div className="w-[22%]">
        <CategoryTag text={bounty.category} />
      </div>

      {/* Status */}
      <div className="w-[18%]">
        <StatusBadge status={bounty.status} />
      </div>

      {/* Price */}
      <div className="w-[12%] text-[#4B5563]">{bounty.price}0$</div>

      {/* Actions */}
      <div className="w-[16%] flex items-center gap-8">
        {variant === "pending" ? (
          <>
            <Button
              size="small"
              className="!text-white !bg-[#EF4444] hover:!bg-[#DC2626] !border-none"
              onClick={() => reject(bounty.id)}
            >
              Reject
            </Button>
            <Button
              size="small"
              className="!text-white !bg-[#22C55E] hover:!bg-[#16A34A] !border-none"
              onClick={() => approve(bounty.id)}
            >
              Approve
            </Button>
            <Button
              size="small"
              className="!text-white !bg-[#3B82F6] hover:!bg-[#2563EB] !border-none"
              onClick={() => navigate(`/admin/pending-bounties/${bounty.id}`)}
            >
              View
            </Button>
          </>
        ) : (
          <Button
            size="small"
            className="!text-white !bg-[#3B82F6] hover:!bg-[#2563EB] !border-none"
            onClick={() => navigate(`/admin/pending-bounties/${bounty.id}`)}
          >
            View project Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default BountyRow;
