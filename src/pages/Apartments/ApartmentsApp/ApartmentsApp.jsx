import { useState } from "react";
import { Apartments, OBJECTS } from "./Apartments";
import { ObjectDetail } from "./ObjectDetail";

export function ApartmentsApp() {
  const [currentSlug, setCurrentSlug] = useState(null);

  const currentItem = currentSlug
    ? OBJECTS.find((o) => o.slug === currentSlug)
    : null;

  const similarItems = currentItem
    ? OBJECTS.filter(
        (o) =>
          o.id !== currentItem.id &&
          (o.type === currentItem.type || o.status === currentItem.status),
      ).slice(0, 3)
    : [];

  if (currentItem) {
    return (
      <ObjectDetail
        item={currentItem}
        onBack={() => setCurrentSlug(null)}
        onNavigate={(slug) => {
          setCurrentSlug(slug);
          window.scrollTo(0, 0);
        }}
        similarItems={similarItems}
      />
    );
  }

  return (
    <Apartments
      onNavigate={(slug) => {
        setCurrentSlug(slug);
        window.scrollTo(0, 0);
      }}
    />
  );
}

export default ApartmentsApp;
