function RowActions({ primaryLabel = 'Mở', secondaryLabel = 'Chỉnh sửa', dangerLabel = 'Thêm' }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className="admin-btn-secondary px-3 py-2 text-xs">
        {primaryLabel}
      </button>
      <button type="button" className="admin-btn-ghost px-3 py-2 text-xs">
        {secondaryLabel}
      </button>
      <button type="button" className="admin-btn-ghost px-3 py-2 text-xs text-rose-600 hover:bg-rose-50">
        {dangerLabel}
      </button>
    </div>
  );
}

export default RowActions;
