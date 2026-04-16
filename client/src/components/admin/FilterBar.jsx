function FilterBar({ searchValue, onSearchChange, searchPlaceholder, filters = [], actions }) {
  return (
    <div className="admin-card p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <input
            className="admin-input w-full md:max-w-sm"
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
          />
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            {filters.map((filter) => (
              <select
                key={filter.id}
                className="admin-select min-w-[160px] flex-1"
                value={filter.value}
                onChange={(event) => filter.onChange(event.target.value)}
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

export default FilterBar;
