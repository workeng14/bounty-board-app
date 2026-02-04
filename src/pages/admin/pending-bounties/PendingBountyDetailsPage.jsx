// src/pages/admin/pending-bounties/PendingBountyDetailsPage.jsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminBounties } from "../../../context/AdminBountiesContext";
import { StatusBadge, CategoryTag } from "./Badges";
import { Button } from "antd";

export default function PendingBountyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, approve, reject } = useAdminBounties();

  const bounty = getById(id);

  if (!bounty) {
    return <div className="p-6 text-red-500">Bounty not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Bounty Details</h1>
        <StatusBadge status={bounty.status} />
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{bounty.posterName}</h2>
            <p className="text-gray-500 text-sm">{bounty.posterEmail}</p>
          </div>
          <CategoryTag text={bounty.category} />
        </div>

        <p><strong>Price:</strong> {bounty.price}$</p>

        <div className="flex gap-3">
          <Button
            className="!bg-[#22C55E] !text-white"
            onClick={() => approve(bounty.id)}
          >
            Approve
          </Button>
          <Button
            className="!bg-[#EF4444] !text-white"
            onClick={() => reject(bounty.id)}
          >
            Reject
          </Button>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    </div>
  );
}
