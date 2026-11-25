import { useMemo, useState } from 'react';

export type Publication = {
  id: string;
  group: string;
  year: number | null;
  title: string;
  venue: string;
  citations: number;
  url: string | null;
  themes: string[];
};

type Props = {
  publications: Publication[];
  themes: Record<string, string>;
  groups: Record<string, string>;
};

type Sort = 'year' | 'citations';

export default function PublicationList({ publications, themes, groups }: Props) {
  const [theme, setTheme] = useState<string>('all');
  const [sort, setSort] = useState<Sort>('year');

  const chips = useMemo(
    () => [
      { key: 'all', label: 'All', count: publications.length },
      ...Object.entries(themes).map(([key, label]) => ({
        key,
        label,
        count: publications.filter((p) => p.themes.includes(key)).length,
      })),
    ],
    [publications, themes],
  );

  const grouped = useMemo(() => {
    const list = publications.filter((p) => theme === 'all' || p.themes.includes(theme));
    const byYear = (a: Publication, b: Publication) => (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations;
    const byCites = (a: Publication, b: Publication) => b.citations - a.citations || (b.year ?? 0) - (a.year ?? 0);
    return Object.entries(groups)
      .map(([key, label]) => ({
        key,
        label,
        items: list.filter((p) => p.group === key).sort(sort === 'year' ? byYear : byCites),
      }))
      .filter((g) => g.items.length > 0);
  }, [publications, groups, theme, sort]);

  return (
    <div>
      <div className="controls" role="group" aria-label="Filter by theme">
        {chips.map((c) => (
          <button
            key={c.key}
            type="button"
            className="chip"
            aria-pressed={theme === c.key}
            onClick={() => setTheme(c.key)}
          >
            {c.label} <span aria-hidden="true">· {c.count}</span>
          </button>
        ))}
      </div>

      <div className="sortrow" role="group" aria-label="Sort publications">
        <span>Sort by</span>
        <button type="button" aria-pressed={sort === 'year'} onClick={() => setSort('year')}>
          Newest
        </button>
        <button type="button" aria-pressed={sort === 'citations'} onClick={() => setSort('citations')}>
          Most cited
        </button>
      </div>

      <div aria-live="polite">
        {grouped.length === 0 && <p className="empty">No publications under this theme.</p>}
        {grouped.map((g) => (
          <section key={g.key} aria-label={g.label}>
            <h4 className="group-title">
              {g.label} · {g.items.length}
            </h4>
            <ol className="pubs">
              {g.items.map((p) => (
                <li key={p.id}>
                  <span className="yr">{p.year ?? ''}</span>
                  <div>
                    <div className="pt">{p.url ? <a href={p.url}>{p.title}</a> : p.title}</div>
                    <div className="pv">{p.venue}</div>
                  </div>
                  <span className="pc">{p.citations ? `${p.citations} cites` : ''}</span>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
