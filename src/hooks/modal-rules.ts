import { useEffect, useRef, useCallback } from 'react';
import { scrollController } from '../utils/scroll-controller';
import { useModalContext } from './modal-context';

const NO_FOCUSABLE = 0;
const FIRST_FOCUSABLE = 0;
const LAST_FOCUSABLE = 1;
const HIDDEN_FOCUSABLE = -1;


export function useModalRules(refs: React.RefObject<HTMLElement>[]) {
  const { closeModal } = useModalContext();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<Element | null>(null);

  const handleCloseModal = useCallback(() => {
    closeModal();
    scrollController.enableScroll();
    if (previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
    }
  }, [closeModal]);

  useEffect(() => {
    let isMounted = true;

    // Сохранение текущего активного элемента
    previousActiveElement.current = document.activeElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = refs.map((ref) => ref.current).filter(Boolean) as HTMLElement[];
      if (focusableElements.length === NO_FOCUSABLE) {
        return;
      }

      const firstElement = focusableElements[FIRST_FOCUSABLE];
      const lastElement = focusableElements[focusableElements.length - LAST_FOCUSABLE];

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    const handleOverlayClick = (event: MouseEvent) => {
      if (isMounted && overlayRef.current && event.target === overlayRef.current) {
        handleCloseModal();
      }
    };

    const handleEscapePress = (event: KeyboardEvent) => {
      if (isMounted && event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleEscapePress);

    const overlayElement = overlayRef.current;
    if (overlayElement) {
      overlayElement.addEventListener('click', handleOverlayClick);
    }

    scrollController.disableScroll();

    // Установка фокуса на первый фокусируемый элемент или скрытый элемент
    const focusableElements = refs.map((ref) => ref.current).filter(Boolean) as HTMLElement[];
    if (focusableElements.length > NO_FOCUSABLE) {
      focusableElements[FIRST_FOCUSABLE].focus();
    } else if (modalRef.current) {
      const hiddenFocusableElement = document.createElement('div');
      hiddenFocusableElement.tabIndex = HIDDEN_FOCUSABLE;
      modalRef.current.appendChild(hiddenFocusableElement);
      hiddenFocusableElement.focus();
      hiddenFocusableElement.remove();
    }

    return () => {
      isMounted = false;
      document.removeEventListener('keydown', handleEscapePress);
      document.removeEventListener('keydown', handleKeyDown);
      if (overlayElement) {
        overlayElement.removeEventListener('click', handleOverlayClick);
      }
      scrollController.enableScroll();
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [handleCloseModal, refs]);

  return { modalRef, overlayRef, handleCloseModal };
}
