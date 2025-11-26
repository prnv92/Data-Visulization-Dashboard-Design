import { Sparkles, ArrowUpRight } from 'lucide-react';

interface Startup {
  name: string;
  industry: string;
  funding: string;
  round: string;
  year: number;
  description: string;
}

interface FeaturedStartupProps {
  startup: Startup;
}

export function FeaturedStartup({ startup }: FeaturedStartupProps) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 border border-zinc-800 p-6 md:p-8 h-full relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white">Featured Startup</h3>
            <p className="text-zinc-400 text-sm">Deal spotlight</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-white text-2xl mb-1">{startup.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-400 text-sm">{startup.industry}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500 text-sm">{startup.year}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <p className="text-zinc-400 text-sm">{startup.description}</p>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
            <div>
              <div className="text-zinc-500 text-xs mb-1">Funding Amount</div>
              <div className="text-white text-xl">{startup.funding}</div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-zinc-500 text-xs mb-1">Round</div>
              <div className="text-white">{startup.round}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
