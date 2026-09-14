'use client';

import { useEffect, useRef } from 'react';

interface UseAntiCheatOptions {
  /**
   * Whether anti-cheat tab-leave penalty is active (e.g. game is running and it is my turn)
   */
  enabled: boolean;
  /**
   * Callback fired when user switches tab, minimizes, or leaves the game window
   */
  onLeaveGame?: () => void;
}

export function useAntiCheat({ enabled, onLeaveGame }: UseAntiCheatOptions) {
  const onLeaveGameRef = useRef(onLeaveGame);
  onLeaveGameRef.current = onLeaveGame;

  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    // 1. Prevent context menu (right click / long press context menu)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
    };

    // 2. Prevent copying text
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
    };

    // 3. Prevent inspect/copy keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInputField =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (isInputField) return;

      const key = e.key.toLowerCase();
      // Block Ctrl/Cmd + C, Ctrl/Cmd + A, Ctrl/Cmd + U, F12
      if (
        ((e.ctrlKey || e.metaKey) && (key === 'c' || key === 'a' || key === 'u' || key === 's')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };

    // 4. Detect tab switch / window blur / minimize
    const triggerLeaveConsequence = () => {
      if (!enabledRef.current || hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      onLeaveGameRef.current?.();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        triggerLeaveConsequence();
      } else {
        // Reset trigger flag when tab becomes active again
        hasTriggeredRef.current = false;
      }
    };

    const handleWindowBlur = () => {
      // Trigger when the window loses focus
      triggerLeaveConsequence();
    };

    const handleWindowFocus = () => {
      hasTriggeredRef.current = false;
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('copy', handleCopy);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  return {
    resetLeaveTrigger: () => {
      hasTriggeredRef.current = false;
    },
  };
}
