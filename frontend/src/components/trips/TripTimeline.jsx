export default function TripTimeline({ status }) {
  const steps = [
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'ongoing', label: 'On Trip' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Trip Progress
      </h3>
      <div className="mt-4 space-y-3">
        {steps.map((step, index) => {
          const active = step.key === status;
          const completed = ['scheduled', 'ongoing', 'completed'].indexOf(step.key) <= ['scheduled', 'ongoing', 'completed'].indexOf(status);

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${completed ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background text-muted-foreground'}`}>
                {index + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${active ? 'text-foreground' : 'text-slate-600'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-slate-500">
                  {active ? 'Current status' : completed ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
