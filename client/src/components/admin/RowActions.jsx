function RowActions({
  row,
  primaryLabel = 'Mở',
  secondaryLabel = 'Chỉnh sửa',
  dangerLabel = 'Thêm',
  onPrimary,
  onSecondary,
  onDanger,
  disabled = false
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="admin-btn-secondary px-3 py-2 text-xs"
        onClick={onPrimary ? () => onPrimary(row) : undefined}
        disabled={disabled}
      >
        {primaryLabel}
      </button>
      <button
        type="button"
        className="admin-btn-ghost px-3 py-2 text-xs"
        onClick={onSecondary ? () => onSecondary(row) : undefined}
        disabled={disabled}
      >
        {secondaryLabel}
      </button>
      <button
        type="button"
        className="admin-btn-ghost px-3 py-2 text-xs text-rose-600 hover:bg-rose-50"
        onClick={onDanger ? () => onDanger(row) : undefined}
        disabled={disabled}
      >
        {dangerLabel}
      </button>
    </div>
  );
}

export default RowActions;

