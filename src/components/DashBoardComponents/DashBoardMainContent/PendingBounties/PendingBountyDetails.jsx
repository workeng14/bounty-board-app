/** @format */
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Layers,
  CircleDollarSign,
  CheckCircle,
  Blocks,
  ExternalLink,
  Download,
  Globe,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import EditBountyModal from "./modals/EditBountyModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";

/* ---------------- Mock data (بدّليها ب API لاحقاً) ---------------- */
const DB = {
  1: {
    id: 1,
    title: "Bounty Name",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop",
    posted: "2025-06-14",
    expire: "2025-07-14",
    category: "Development",
    salary: "50k",
    status: "Under Review",
    milestones: 5,
    description:
      "We are currently working on integrating libonnxruntime into our Unreal Engine 5.4 project targeting iOS. You can find the ONNX Runtime library here:",
    link: "https://github.com/microsoft/onnxruntime",
    details:
      "The integration appears to work correctly when running development builds, and the plugin loads and functions as expected. However, we are encountering a critical issue: the app crashes immediately in distribution (shipping) builds...",
    technical:
      "This bounty involves integrating the libonnxruntime library into an Unreal Engine 5.4 project targeting iOS...",
    languages: ["Python", "C++", "Objective-C", "Swift"],
    skills: [
      "Crash Debugging",
      "Xcode",
      "Model Conversion",
      "TFLite",
      "Static Libraries",
      "Ultralytics",
      "ONNX Runtime",
      "Swift",
    ],
    resources: [
      { id: 1, type: "link", label: "Link to Project", url: "https://github.com/microsoft/onnxruntime" },
      { id: 2, type: "pdf", label: "YOLO World Official Docs", ext: "PDF" },
    ],
    roles: [
      { name: "Frontend Developer", stack: ["React", "TailwindCSS", "TypeScript"] },
      { name: "Backend Developer", stack: ["Node.js", "Express.js", "MongoDB"] },
    ],
  },
};

export default function PendingBountyDetails() {
  const { id } = useParams();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const data = useMemo(() => DB[id] ?? DB[1], [id]);

  return (
    <section className="w-full">
      {/* breadcrumb */}
      <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
        <Link to="/dashboard/pending-bounties" className="hover:underline">
          Pending Bounties
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span>{data.title}</span>
      </div>

      {/* header card */}
      <div className="bg-white border rounded-xl shadow-sm p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold">{data.title}</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenEdit(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md px-3 py-1.5"
            >
              <Pencil className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white text-sm rounded-md px-3 py-1.5"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>

        {/* summary row */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-5">
          <div className="md:col-span-1">
            <img
              src={data.image}
              alt=""
              className="h-[140px] w-full object-cover rounded-lg border"
            />
          </div>

          <InfoPill icon={<CalendarDays />} label="Bounty Posted:" value={formatDate(data.posted)} />
          <InfoPill icon={<Clock />} label="Bounty Expire In:" value={formatDate(data.expire)} />
          <InfoPill icon={<Layers />} label="Category" value={data.category} />
          <InfoPill icon={<CircleDollarSign />} label="Price:" value={data.salary} />
          <InfoPill icon={<CheckCircle />} label="Status:" value={data.status} />
          <InfoPill icon={<Blocks />} label="Milestones" value={data.milestones} />
        </div>

        {/* Project Description */}
        <Section title="Project Description">
          <p className="text-gray-700">
            {data.description}{" "}
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 inline-flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" /> {data.link}
            </a>
          </p>
          <p className="text-gray-700 mt-3">{data.details}</p>
        </Section>

        {/* Technical Details */}
        <Section title="Technical Details">
          <p className="text-gray-700">{data.technical}</p>
        </Section>

        {/* Languages & Skills */}
        <Section title="Languages & Skills">
          <h4 className="text-sm font-medium mb-2">Languages</h4>
          <div className="flex flex-wrap gap-3">
            {data.languages.map((t, i) => (
              <Tag key={i} label={t} />
            ))}
          </div>

          <h4 className="text-sm font-medium mt-6 mb-2">Skills & Technologies</h4>
          <div className="flex flex-wrap gap-3">
            {data.skills.map((t, i) => (
              <Tag key={i} label={t} />
            ))}
          </div>
        </Section>

        {/* Project Resources + Open Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Section title="Project Resources" className="lg:col-span-2">
            <div className="space-y-4">
              {data.resources.map((r) =>
                r.type === "link" ? (
                  <div
                    key={r.id}
                    className="border-b pb-3"
                  >
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Link to Project</div>
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 break-all"
                        >
                          {r.url}
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={r.id}
                    className="flex items-center justify-between border rounded-lg px-4 py-3"
                  >
                    <div>
                      <div className="font-medium">{r.label}</div>
                      <div className="text-xs text-gray-500">{r.ext}</div>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1.5 rounded-md">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
          </Section>

          <Section title="Open Roles">
            {data.roles.map((r, i) => (
              <div key={i} className="mb-6">
                <div className="font-semibold">{r.name}</div>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  <li>{r.stack.join(", ")}</li>
                </ul>
              </div>
            ))}
          </Section>
        </div>
      </div>

      {/* Modals */}
      {openEdit && <EditBountyModal data={data} onClose={() => setOpenEdit(false)} />}
      {openDelete && (
        <DeleteConfirmModal
          title="Delete Bounty"
          message="Are you sure you want to delete this bounty?"
          onCancel={() => setOpenDelete(false)}
          onConfirm={() => {
            setOpenDelete(false);
            alert("Bounty deleted (mock).");
          }}
        />
      )}
    </section>
  );
}

/* ---------------------- عناصر مساعدة داخلية ---------------------- */

function InfoPill({ icon, label, value }) {
  const Icon = () => React.cloneElement(icon, { className: "h-5 w-5 text-blue-600" });
  return (
    <div className="flex items-center gap-3">
      <Icon />
      <div>
        <div className="text-[11px] uppercase tracking-wide text-gray-400">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <div className={`mt-6 ${className}`}>
      <h3 className="text-[16px] font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span className="inline-block rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 border">
      {label}
    </span>
  );
}

const formatDate = (s) =>
  new Date(s).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
