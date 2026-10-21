import Link from 'next/link';
import { Terminal, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-cyan-500/30 space-y-6 shadow-2xl shadow-cyan-950/30">
        <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-950/70 text-rose-300 border border-rose-800/40">
            ERR_404 // ROUTE_NOT_FOUND
          </span>
          <h1 className="text-2xl font-bold text-white font-mono">
            RANA.OS: Target Node Unreachable
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            The requested URI path is not registered in the RANA.OS routing table.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-[#030712] font-semibold text-xs tracking-wider uppercase transition-all shadow-md shadow-cyan-500/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to System Root</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
