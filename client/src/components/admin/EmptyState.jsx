import AdminIcon from './AdminIcon';

function EmptyState({ title, description }) {
  return (
    <div className="admin-card p-10 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <AdminIcon name="spark" className="h-6 w-6" />
      </div>
      <h3 className="mt-4 font-display text-2xl text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;
