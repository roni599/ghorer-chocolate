import Layout from "./Layout.jsx";

export default function LegalPageLayout({ title, subtitle, children }) {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8">
        <h1 className="text-center font-display text-3xl text-cocoa-950">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-center font-body text-sm text-cocoa-950/60">{subtitle}</p>
        )}
        <div className="mt-10 space-y-8 font-body text-[15px] leading-relaxed text-cocoa-950/80">
          {children}
        </div>
      </div>
    </Layout>
  );
}

export function Section({ heading, children }) {
  return (
    <section>
      <h2 className="mb-2.5 font-display text-xl text-cocoa-950">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
