function FilterBar({ searchValue, onSearchChange, searchPlaceholder, filters = [], actions, hideSearch = false }) {
  return (
    <div className="admin-card p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          {!hideSearch ? (
            <input
              className="admin-input w-full md:max-w-sm"
              type="search"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
            />
          ) : null}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            {filters.map((filter) => (
              <div key={filter.id} className="flex flex-1 flex-col gap-1">
                {filter.label ? <span className="text-xs font-semibold text-slate-500">{filter.label}</span> : null}
                <select
                  className="admin-select min-w-[160px] flex-1"
                  value={filter.value}
                  onChange={(event) => filter.onChange(event.target.value)}
                  disabled={Boolean(filter.disabled)}
                >
                  {filter.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

export default FilterBar;
