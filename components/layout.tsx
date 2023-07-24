export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pt-36 max-h-full overflow-y-clip">
      {children}
    </div>
  );
}
