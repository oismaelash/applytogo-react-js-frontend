import { useEffect, useRef } from 'react';
import { 
  trackScrollInteraction, 
  trackHoverInteraction, 
  trackFocusInteraction,
  trackPageSectionView 
} from '@/lib/analytics';

interface InteractionTrackingOptions {
  enabled?: boolean;
  trackScroll?: boolean;
  trackHover?: boolean;
  trackFocus?: boolean;
  trackSectionViews?: boolean;
  scrollThreshold?: number;
}

// Hook para tracking de interações avançadas
export const useInteractionTracking = (options: InteractionTrackingOptions = {}) => {
  const {
    enabled = true,
    trackScroll = true,
    trackHover = false,
    trackFocus = false,
    trackSectionViews = true,
    scrollThreshold = 100
  } = options;

  const lastScrollPosition = useRef(0);
  const viewedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    // Tracking de scroll
    if (trackScroll) {
      const handleScroll = () => {
        const currentPosition = window.pageYOffset;
        const direction = currentPosition > lastScrollPosition.current ? 'down' : 'up';
        
        // Só track se a diferença for significativa
        if (Math.abs(currentPosition - lastScrollPosition.current) > scrollThreshold) {
          trackScrollInteraction(direction, currentPosition);
          lastScrollPosition.current = currentPosition;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [enabled, trackScroll, scrollThreshold]);

  // Tracking de hover (opcional - pode ser pesado)
  useEffect(() => {
    if (!enabled || !trackHover) return;

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Só track em elementos interativos
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.classList.contains('card') ||
          target.closest('.card')) {
        const elementType = target.tagName.toLowerCase();
        const elementText = target.textContent?.trim().substring(0, 30) || '';
        trackHoverInteraction(elementType, elementText);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [enabled, trackHover]);

  // Tracking de focus (para acessibilidade)
  useEffect(() => {
    if (!enabled || !trackFocus) return;

    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      const elementType = target.tagName.toLowerCase();
      const elementText = target.getAttribute('placeholder') || 
                         target.textContent?.trim().substring(0, 30) || 
                         target.getAttribute('aria-label') || '';
      
      trackFocusInteraction(elementType, elementText);
    };

    document.addEventListener('focusin', handleFocus);
    
    return () => {
      document.removeEventListener('focusin', handleFocus);
    };
  }, [enabled, trackFocus]);

  // Tracking de visualização de seções
  useEffect(() => {
    if (!enabled || !trackSectionViews) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section') || 
                              entry.target.id || 
                              entry.target.className.split(' ')[0];
            
            if (sectionName && !viewedSections.current.has(sectionName)) {
              trackPageSectionView(sectionName);
              viewedSections.current.add(sectionName);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar elementos com data-section ou seções principais
    const sections = document.querySelectorAll('[data-section], header, main, footer, .card');
    sections.forEach(section => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [enabled, trackSectionViews]);

  return null;
};
