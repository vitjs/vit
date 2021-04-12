export default function Block({ children }: { children?: React.ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: 16,
        padding: '16px 24px',
        border: 'red 2px dashed',
      }}
    >
      {children}
    </div>
  );
}
