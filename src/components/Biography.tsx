import { useLayoutEffect, useRef, useState } from 'react';

// Collapsed biography with "Read more"; short texts are shown in full without the button
export default function Biography({ name, text }: { name: string; text: string }) {
  const boxRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  // null until measured: the text is rendered collapsed first, then measured
  const [overflows, setOverflows] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    if (box && overflows === null) setOverflows(box.scrollHeight > box.clientHeight + 1);
  }, [overflows]);

  function toggle() {
    setExpanded((value) => {
      if (value) boxRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return !value;
    });
  }

  if (!text) {
    return <p className="details-overview-text">We don't have a biography for {name}.</p>;
  }

  const open = expanded || overflows === false;

  return (
    <>
      <p ref={boxRef} className={`details-overview-text person ${open ? 'active' : ''}`}>
        {text}
      </p>
      {overflows && (
        <button className="btn read-more" type="button" aria-expanded={expanded} onClick={toggle}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </>
  );
}
