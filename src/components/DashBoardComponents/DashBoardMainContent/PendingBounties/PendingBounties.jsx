/** @format */
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Blocks,
  CircleDollarSign,
  ChevronDown,
  ImageOff,
} from "lucide-react";

const MOCK = [
  {
    id: 1,
    title: "Bounty Name",
    min: 50000,
    max: 80000,
    milestones: 5,
    submittedAt: "2025-06-12",
    status: "Under Review",
    image: "",
  },
  {
    id: 2,
    title: "Bounty Name",
    min: 40000,
    max: 60000,
    milestones: 3,
    submittedAt: "2025-06-10",
    status: "Under Review",
    image: "",
  },
];

export default function PendingBounties() {
  const [sort, setSort] = useState("newest");

  const list = useMemo(() => {
    const arr = [...MOCK];
    return sort === "newest"
      ? arr.sort(
          (a, b) =>
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
        )
      : arr.sort(
          (a, b) =>
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime()
        );
  }, [sort]);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold">
          Pending Bounties <span className="text-gray-400 text-base">({MOCK.length})</span>
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Sort by</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none border rounded-lg bg-white text-sm py-2 pl-3 pr-8"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        These bounties are currently under admin review. You will be notified once
        they are approved or require changes.
      </p>

      <div className="mt-4 space-y-3">
        {list.map((b) => (
          <Link
            to={`/dashboard/pending-bounties/${b.id}`}
            key={b.id}
            className="block bg-white border rounded-xl shadow-sm px-4 py-3 hover:border-gray-300"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="h-[64px] w-[96px] rounded-lg bg-gray-50 border grid place-items-center text-gray-400">
                {b.image ? (
                  <img
                    src={b.image}
                    alt=""
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <ImageOff className="h-5 w-5" />
                    <span className="sr-only">No Image</span>
                  </>
                )}
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <div className="font-medium">{b.title}</div>
                <div className="flex flex-wrap items-center gap-4 text-[13px] text-gray-600 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <CircleDollarSign className="h-4 w-4" />
                    ${nf(b.min)}–{nf(b.max)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Blocks className="h-4 w-4" /> {b.milestones} Milestones
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Submitted on {formatDate(b.submittedAt)}
                  </span>
                </div>
              </div>

              {/* Status */}
              <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                {b.status}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="text-center text-xs text-gray-400 mt-10">
        © 2025 Bounty Board – All Rights Reserved
      </footer>
    </section>
  );
}

const nf = (n) => new Intl.NumberFormat().format(n);
const formatDate = (s) =>
  new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
