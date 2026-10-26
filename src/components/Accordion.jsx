import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId().replace(/:/g, '');
  return <div className="accordion">{items.map((item, index) => {
    const open = openIndex === index;
    const buttonId = `${baseId}-question-${index}`;
    const panelId = `${baseId}-answer-${index}`;
    return <div className={`accordion-item ${open ? 'is-open' : ''}`} key={item.question}>
      <h3><button id={buttonId} aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}>{item.question}<ChevronDown size={18} aria-hidden="true" /></button></h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion-panel" hidden={!open}><p>{item.answer}</p></div>
    </div>;
  })}</div>;
}
