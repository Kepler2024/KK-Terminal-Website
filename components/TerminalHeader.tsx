export default function TerminalHeader({
  command,
  title,
  className,
}: {
  command: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`mb-10 ${className ?? ""}`}>
      <div className="text-[13px] text-terminal-green-dim mb-2 font-mono">
        <span className="text-terminal-cyan">kk</span>
        <span className="text-terminal-green-muted">@</span>
        <span className="text-terminal-amber">Nomai-Server</span>
        <span className="text-terminal-green-muted">$&nbsp;</span>
        {command}
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold text-terminal-green text-glow font-mono">
        {title}
      </h2>
      <div className="gradient-line w-full max-w-[500px] mt-2.5" />
    </div>
  );
}
