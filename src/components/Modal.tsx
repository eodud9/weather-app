import { useEffect, useRef, type ReactNode } from "react";

export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const modal = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    modal.current?.showModal();
  }, []);
  return (
    <dialog ref={modal} onClose={onClose} className="outline-none rounded-lg bg-stone-200 p-15 min-h-1/2 shadow-2xl">
      {children}
    </dialog>
  );
}
