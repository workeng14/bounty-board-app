/** @format */
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Image as ImageIcon,
  Eye,
  X,
  Clock4,
  CalendarDays,
  DollarSign,
  UserRound,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { message } from "antd";

// =========== Mock data (Replace it later with API data ) ===========
const MOCK = {
  pending: [
    {
      id: "p-101",
      title: "Bounty Name",
      user: "user name",
      role: "Mobile Developer",
      value: 1800,
      durationWeeks: 4,
      appliedAt: "2024-01-18",
      note: "Experienced React Native developer with 50+ published apps. I can handle both iOS...",
      status: "Pending",
    },
    {
      id: "p-102",
      title: "Bounty Name",
      user: "user name",
      role: "Mobile Developer",
      value: 1800,
      durationWeeks: 4,
      appliedAt: "2024-01-18",
      note: "Experienced React Native developer with 50+ published apps. I can handle both iOS...",
      status: "Pending",
    },
    {
      id: "p-103",
      title: "Bounty Name",
      user: "user name",
      role: "Mobile Developer",
      value: 1800,
      durationWeeks: 4,
      appliedAt: "2024-01-18",
      note: "Experienced React Native developer with 50+ published apps. I can handle both iOS...",
      status: "Pending",
    },
  ],
  reapply: [
    {
      id: "r-201",
      title: "Bounty Name",
      user: "user name",
      role: "Mobile Developer",
      value: 1800,
      durationWeeks: 4,
      appliedAt: "2024-01-18",
      note: "Experienced React Native developer with 50+ published apps. I can handle both iOS...",
      status: "Not selected",
    },
  ],
  waiting: [
    {
      id: "w-301",
      title: "Bounty Name",
      user: "user name",
      role: "Mobile Developer",
      value: 1800,
      durationWeeks: 4,
      appliedAt: "2024-01-18",
      status: "Waiting",
    },
  ],
};

// ================ Badge helper =================
function Pill({ color = "gray", children }) {
  const map = {
    yellow:
      "bg-[#FFF6CC] text-[#7A5D00] ring-1 ring-[#F1D96A] px-3 py-1 rounded-full text-[12px] font-medium",
    orange:
      "bg-[#FFEAD6] text-[#8A4A00] ring-1 ring-[#F7C89C] px-3 py-1 rounded-full text-[12px] font-medium",
    green:
      "bg-[#DFF6E3] text-[#0E7237] ring-1 ring-[#AEE8BE] px-3 py-1 rounded-full text-[12px] font-medium",
    gray:
      "bg-gray-100 text-gray-700 ring-1 ring-gray-200 px-3 py-1 rounded-full text-[12px] font-medium",
  };
  return <span className={map[color]}>{children}</span>;
}

// ================ Withdraw Modal =================
function WithdrawModal({ open, onClose, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-[540px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">Withdraw Application</h3>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
          <p className="text-sm text-gray-700">
            <strong>Are you sure you want to withdraw this application?</strong>
            <br />
            This action cannot be undone. You&apos;ll need to reapply if you change
            your mind.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
            className="rounded-lg px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700"
          >
            Withdraw Application
          </button>
        </div>
      </div>
    </div>
  );
}

// ================ One Card =================
function ApplicationCard({
  data,
  variant, // "pending" | "reapply" | "waiting"
  onWithdraw,
}) {
  const navigate = useNavigate();
  const goToDetails = () =>
    navigate(`/dashboard/pending/${data.id}`, {
      state: { source: variant },
    });

  // badge color
  const badge =
    variant === "pending" ? (
      <Pill color="yellow">Pending</Pill>
    ) : variant === "reapply" ? (
      <Pill color="orange">Not selected</Pill>
    ) : (
      <Pill color="green">Waiting</Pill>
    );

  return (
    <div className="rounded-2xl border border-[#D7E7FF] shadow-[0_1px_0_#E7EEF8] overflow-hidden">
      {/* image placeholder + badge */}
      <div className="relative h-40 w-full bg-gray-200 grid place-items-center">
        <ImageIcon className="h-6 w-6 text-gray-400" />
        <div className="absolute right-3 top-3">{badge}</div>
      </div>

      {/* body */}
      <div className="p-5">
        <h3 className="text-[18px] font-semibold">{data.title}</h3>
        <p className="text-sm text-gray-500 mt-1">by: {data.user}</p>

        <div className="mt-4 space-y-2 text-[14px] text-gray-700">
          <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-gray-500" />
            <span>
              Applied as: <span className="font-medium">{data.role}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <span>
              Total Value:{" "}
              <span className="text-green-600 font-semibold">{data.value}$</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock4 className="h-4 w-4 text-gray-500" />
            <span>
              Duration: <span className="font-medium">{data.durationWeeks} weeks</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span>
              Applied: <span className="font-medium">
                {new Date(data.appliedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>

        {/* note (optional) */}
        {data.note && (
          <div className="mt-3 rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600">
            {data.note}
          </div>
        )}

        {/* actions */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={goToDetails}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>

          {variant === "pending" && (
            <button
              onClick={() => onWithdraw?.(data)}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
              Withdraw
            </button>
          )}

          {variant === "reapply" && (
            <Link
              to={`/dashboard/pending/${data.id}`}
              state={{ source: "reapply" }}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A60E0] text-white px-3 py-2 text-sm hover:bg-[#0a56c6]"
            >
              Reapply
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// ================ The Main Page =================
export default function PendingApplications() {
  const [sortOpen, setSortOpen] = useState(false);
  const [withdraw, setWithdraw] = useState({ open: false, item: null });
  const [sortBy, setSortBy] = useState("recent"); // "recent" or "oldest"
  const [pendingList, setPendingList] = useState(MOCK.pending);
  const [reapplyList, setReapplyList] = useState(MOCK.reapply);
  const [waitingList, setWaitingList] = useState(MOCK.waiting);

  const { pending, reapply, waiting } = useMemo(() => {
    const sortApplications = (apps) => {
      return [...apps].sort((a, b) => {
        const dateA = new Date(a.appliedAt);
        const dateB = new Date(b.appliedAt);
        return sortBy === "recent" ? dateB - dateA : dateA - dateB;
      });
    };

    return {
      pending: sortApplications(pendingList),
      reapply: sortApplications(reapplyList),
      waiting: sortApplications(waitingList),
    };
  }, [sortBy, pendingList, reapplyList, waitingList]);

  const handleWithdraw = () => {
    if (!withdraw.item) return;
    
    // Remove the item from pending list
    setPendingList(prev => prev.filter(item => item.id !== withdraw.item.id));
    
    message.success("✅ Application withdrawn successfully!");
    console.log("withdraw:", withdraw.item);
    
    // Close the modal
    setWithdraw({ open: false, item: null });
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-semibold">Pending Applications</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track your bounty applications and their status.
          </p>
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm"
          >
            Sort by: {sortBy === "recent" ? "Recent" : "Oldest"} <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 w-40 rounded-lg border bg-white p-1 shadow-lg text-sm z-10">
              <button 
                onClick={() => { setSortBy("recent"); setSortOpen(false); }}
                className={`w-full text-left rounded-md px-2 py-1 hover:bg-gray-50 ${
                  sortBy === "recent" ? "bg-blue-50 text-blue-600 font-medium" : ""
                }`}
              >
                Recent
              </button>
              <button 
                onClick={() => { setSortBy("oldest"); setSortOpen(false); }}
                className={`w-full text-left rounded-md px-2 py-1 hover:bg-gray-50 ${
                  sortBy === "oldest" ? "bg-blue-50 text-blue-600 font-medium" : ""
                }`}
              >
                Oldest
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pending grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {pending.map((item) => (
          <ApplicationCard
            key={item.id}
            data={item}
            variant="pending"
            onWithdraw={(it) => setWithdraw({ open: true, item: it })}
          />
        ))}
      </div>

      {/* Reapply */}
      <div className="mt-10">
        <div className="mb-3">
          <h3 className="text-[18px] font-semibold">
            Eligible to Reapply <span className="text-gray-400 text-sm">({reapply.length})</span>
          </h3>
          <p className="text-sm text-gray-500">
            Your request was not chosen this time, but you can try again as individual
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {reapply.map((item) => (
            <ApplicationCard key={item.id} data={item} variant="reapply" />
          ))}
        </div>
      </div>

      {/* Waiting */}
      <div className="mt-10">
        <h3 className="text-[18px] font-semibold mb-4">Waiting Applications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {waiting.map((item) => (
            <ApplicationCard key={item.id} data={item} variant="waiting" />
          ))}
        </div>
      </div>

      {/* Withdraw modal */}
      <WithdrawModal
        open={withdraw.open}
        onClose={() => setWithdraw({ open: false, item: null })}
        onConfirm={handleWithdraw}
      />
    </section>
  );
}



