import { SitePage } from '../site-page'

export default function ProjectsPage() {
  return (
    <SitePage
      eyebrow="Projects"
      title="Selected work"
      description="Software projects, experiments, and systems built across the stack."
    >
      <div className="grid gap-6">
        <article className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Mobile product</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">OnTrack</h2>
            </div>
            <a
              href="https://github.com/KyleNewbigging/OnTrack"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              View repo
            </a>
          </div>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A habit and goal-tracking app focused on daily follow-through, clean progress visibility, and thoughtful recurring-task logic.
            It includes heatmaps, date-aware progress summaries, radar views, and a growing set of quality-of-life improvements shaped through real usage.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Built with React Native, Expo, Zustand, and AsyncStorage</li>
            <li>Designed around consistency tracking, recurrence rules, and actionable progress</li>
            <li>Improved iteratively through small, reviewable pull requests and real bug-fix cycles</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">AI workflow system</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Hugo, my OpenClaw dev agent</h2>
            </div>
            <a
              href="https://github.com/openclaw/openclaw"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              OpenClaw
            </a>
          </div>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Hugo is my personal OpenClaw developer agent, set up to work inside a real repo with rules, schedules, GitHub PR flow, and human review.
            The goal is practical AI-assisted development, not vague automation, with guardrails around issue pickup, testing, branching, and approvals.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            <li>Integrated with GitHub, WhatsApp, cron scheduling, and repo-specific operating rules</li>
            <li>Works through branches and pull requests, never direct-to-main changes</li>
            <li>Used to ship real fixes, maintenance work, and engineering follow-up inside OnTrack</li>
          </ul>
        </article>
      </div>
    </SitePage>
  )
}
