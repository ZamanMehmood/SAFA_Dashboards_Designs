function PaymentBadges({ methods }) {
  return (
    <div className="flex flex-wrap gap-2">
      {methods.map((method) => (
        <span
          key={method}
          className="rounded border border-line px-2.5 py-1.5 text-[11px] font-medium text-ink-secondary"
        >
          {method}
        </span>
      ))}
    </div>
  );
}

export default PaymentBadges;
