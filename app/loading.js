export default function Loading() {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div
          className="
          h-10
          w-56
          rounded-xl
          bg-slate-800
        "
        />

        <div
          className="
          h-40
          rounded-2xl
          bg-slate-900
        "
        />

        <div
          className="
          grid
          md:grid-cols-3
          gap-4
        "
        >
          <div className="h-28 rounded-2xl bg-slate-900" />

          <div className="h-28 rounded-2xl bg-slate-900" />

          <div className="h-28 rounded-2xl bg-slate-900" />
        </div>
      </div>
    </div>
  );
}
