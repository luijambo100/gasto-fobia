export default function EmptyState({
  title,

  subtitle,
}) {
  return (
    <div
      className="
border
border-dashed
border-slate-700
rounded-2xl
p-10
text-center
"
    >
      <h2
        className="
text-xl
font-bold
"
      >
        {title}
      </h2>

      <p
        className="
mt-2
text-gray-400
"
      >
        {subtitle}
      </p>
    </div>
  );
}
