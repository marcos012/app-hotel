export const Section = ({
  title,
  headerActionTitle,
  headerActionIcon,
  headerAction,
  children,
}: {
  title?: string;
  headerActionTitle?: string;
  headerActionIcon?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-lg font-semibold text-[#1D2939]">{title}</h2>

        {headerAction ? (
          headerAction
        ) : headerActionTitle ? (
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-[#D0D5DD] bg-white px-4 py-2 text-sm font-medium text-[#1D2939] shadow-sm hover:bg-gray-50"
          >
            {headerActionIcon && <span>{headerActionIcon}</span>}
            <span>{headerActionTitle}</span>
          </button>
        ) : null}
      </div>

      <div className="px-6 pb-3">{children}</div>
    </div>
  );
};
