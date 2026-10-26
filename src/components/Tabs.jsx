import { useId, useRef, useState } from 'react';

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const id = useId().replace(/:/g, '');
  const moveFocus = (event, index) => {
    const last = tabs.length - 1;
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? last : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = last;
    if (nextIndex !== index) {
      event.preventDefault();
      setActive(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Conteúdo do dashboard">
        {tabs.map((tab, index) => (
          <button key={tab.label} ref={(element) => { tabRefs.current[index] = element; }} className={`tab ${active === index ? 'is-active' : ''}`} role="tab" id={`${id}-tab-${index}`} aria-selected={active === index} aria-controls={`${id}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => moveFocus(event, index)}>
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => <div key={tab.label} id={`${id}-panel-${index}`} className="tab-panel" role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={active !== index}>{tab.content}</div>)}
    </div>
  );
}
