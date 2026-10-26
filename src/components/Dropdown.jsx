import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.indexOf(value)));
  const ref = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);
  const listboxId = `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const labelId = `${listboxId}-label`;

  const focusOption = (index) => {
    const nextIndex = Math.max(0, Math.min(index, options.length - 1));
    setActiveIndex(nextIndex);
    requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus());
  };
  const close = (returnFocus = false) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };
  const selectOption = (option) => {
    onChange(option);
    close(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => { if (ref.current && !ref.current.contains(event.target)) close(); };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus());
    }
  }, [open, activeIndex]);

  const toggleOpen = () => {
    if (!open) {
      const selectedIndex = options.indexOf(value);
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
    setOpen(!open);
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setActiveIndex(options.indexOf(value) >= 0 ? options.indexOf(value) : 0);
        setOpen(true);
        return;
      }
      focusOption(activeIndex + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      if (!open) setOpen(true);
      focusOption(event.key === 'Home' ? 0 : options.length - 1);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      close(true);
    }
  };

  const handleOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption(index + (event.key === 'ArrowDown' ? 1 : -1));
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      focusOption(event.key === 'Home' ? 0 : options.length - 1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectOption(options[index]);
    }
  };

  return (
    <div className="dropdown" ref={ref}>
      <span className="dropdown-label" id={labelId}>{label}</span>
      <button ref={triggerRef} className="dropdown-trigger" aria-haspopup="listbox" aria-expanded={open} aria-controls={listboxId} onClick={toggleOpen} onKeyDown={handleTriggerKeyDown}>
        <span>{value}</span><ChevronDown size={17} aria-hidden="true" className={open ? 'rotate' : ''} />
      </button>
      {open && <ul className="dropdown-menu" id={listboxId} role="listbox" aria-labelledby={labelId} aria-activedescendant={`${listboxId}-option-${activeIndex}`}>
        {options.map((option, index) => <li key={option}><button ref={(element) => { optionRefs.current[index] = element; }} id={`${listboxId}-option-${index}`} role="option" tabIndex={index === activeIndex ? 0 : -1} aria-selected={option === value} onClick={() => selectOption(option)} onKeyDown={(event) => handleOptionKeyDown(event, index)}>{option}</button></li>)}
      </ul>}
    </div>
  );
}
