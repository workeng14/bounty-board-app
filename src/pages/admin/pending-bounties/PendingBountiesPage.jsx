import { Input, Select, Card, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useAdminBounties } from "../../../context/AdminBountiesContext";
import BountyRow from "./BountyRow";

const Panel = ({ title, children }) => (
  <div className="bg-white rounded-lg p-4 border border-[#E5E7EB]">{children}</div>
);

const HeaderStat = ({ title, value, dotClass }) => (
  <Card className="!rounded-lg !border-[#E5E7EB]">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-[14px] text-[#6B7280]">{title}</div>
        <div className="text-[28px] font-bold text-[#111827] mt-1">{value}</div>
      </div>
      <span className={`inline-block w-3 h-3 rounded ${dotClass}`} />
    </div>
  </Card>
);

const TableHeader = () => (
  <div className="flex items-center text-[#6B7280] text-[14px] font-medium px-4 py-3">
    <div className="w-[32%]">Bounty Name ↕</div>
    <div className="w-[22%]">Category ↕</div>
    <div className="w-[18%]">Status</div>
    <div className="w-[12%]">Price ↕</div>
    <div className="w-[16%]">Actions</div>
  </div>
);

const SearchBar = ({ withStatus = true, onSearch, onStatus, onCategory, category, status }) => (
  <div className="flex items-center gap-3">
    <Input
      allowClear
      prefix={<SearchOutlined />}
      placeholder="Search users..."
      className="h-[40px] w-[270px]"
      onChange={(e) => onSearch(e.target.value)}
    />
    {withStatus && (
      <Select
        className="w-[140px]"
        value={status}
        options={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ]}
        onChange={onStatus}
      />
    )}
    <Select
      className="w-[160px]"
      value={category}
      options={[
        { value: "all", label: "All Category" },
        { value: "Category Name", label: "Category Name" },
      ]}
      onChange={onCategory}
    />
  </div>
);

const Section = ({
  title,
  items,
  variant,
  showSearchStatus,
  rightText,
}) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [limit, setLimit] = useState(4);

  const filtered = useMemo(() => {
    let x = items;
    if (search) {
      const s = search.toLowerCase();
      x = x.filter(
        (b) =>
          b.posterName.toLowerCase().includes(s) ||
          b.posterEmail.toLowerCase().includes(s)
      );
    }
    if (status !== "all") x = x.filter((b) => b.status === status);
    if (category !== "all") x = x.filter((b) => b.category === category);
    return x;
  }, [items, search, status, category]);

  return (
    <div className="mt-6">
      <div className="text-[22px] font-[700] text-[#111827] mb-3">{title}</div>
      <Panel>
        <div className="flex items-center justify-between mb-4">
          <SearchBar
            withStatus={showSearchStatus}
            onSearch={setSearch}
            onStatus={setStatus}
            onCategory={setCategory}
            category={category}
            status={status}
          />
          <div className="text-[12px] text-[#6B7280]">{rightText}</div>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] overflow-hidden">
          <TableHeader />
          <div className="divide-y divide-[#E5E7EB]">
            {filtered.slice(0, limit).map((b) => (
              <BountyRow key={b.id} bounty={b} variant={variant} />
            ))}
          </div>
          <div className="text-center py-3">
            {filtered.length > limit && (
              <Button
                size="small"
                className="!text-[#3B82F6] !border-[#BFDBFE] !bg-[#EFF6FF]"
                onClick={() => setLimit((n) => n + 4)}
              >
                View All
              </Button>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
};

const PendingBountiesPage = () => {
  const { byStatus, stats, bounties } = useAdminBounties();

  return (
    <div className="px-6 py-5">
      {/* Title */}
      <div className="text-[22px] font-[700] text-[#111827]">Pending Bounties</div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <HeaderStat title="Total Bounties" value={stats.total} dotClass="bg-[#3B82F6]" />
        <HeaderStat title="Approved Projects" value={stats.approved} dotClass="bg-[#22C55E]" />
        <HeaderStat title="Rejected Projects" value={stats.rejected} dotClass="bg-[#EF4444]" />
      </div>

      {/* Pending */}
      <Section
        title="Pending Bounties"
        items={byStatus("pending")}
        variant="pending"
        showSearchStatus={true}
        rightText={`${byStatus("pending").length} Project found`}
      />

      {/* Approved */}
      <Section
        title="Approved Bounties"
        items={byStatus("approved")}
        variant="approved"
        showSearchStatus={false}
        rightText={`${byStatus("approved").length} Project found`}
      />

      {/* Rejected */}
      <Section
        title="Rejected Bounties"
        items={byStatus("rejected")}
        variant="rejected"
        showSearchStatus={false}
        rightText={`${byStatus("rejected").length} Project found`}
      />
    </div>
  );
};

export default PendingBountiesPage;
