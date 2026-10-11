import { useNavigate } from 'react-router-dom';

// items: [{ label, to? }] — the last item is the current page and has no link.
export default function Breadcrumb({ items }) {
  const navigate = useNavigate();
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={item.label}>
          {item.to ? <span onClick={() => navigate(item.to)}>{item.label}</span> : item.label}
          {i < items.length - 1 ? ' / ' : ''}
        </span>
      ))}
    </div>
  );
}
