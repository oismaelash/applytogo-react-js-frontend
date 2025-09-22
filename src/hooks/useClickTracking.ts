import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface ClickTrackingOptions {
  enabled?: boolean;
  trackCardClicks?: boolean;
  trackButtonClicks?: boolean;
  trackLinkClicks?: boolean;
  trackInputInteractions?: boolean;
}

// Hook para tracking automático de cliques
export const useClickTracking = (options: ClickTrackingOptions = {}) => {
  const {
    enabled = true,
    trackCardClicks = true,
    trackButtonClicks = true,
    trackLinkClicks = true,
    trackInputInteractions = false
  } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Identificar o tipo de elemento clicado
      const elementType = getElementType(target);
      const elementInfo = getElementInfo(target);

      // Track baseado no tipo de elemento
      switch (elementType) {
        case 'button':
          if (trackButtonClicks) {
            trackEvent('click', 'button', elementInfo.text, undefined);
          }
          break;

        case 'link':
          if (trackLinkClicks) {
            const href = target.getAttribute('href');
            const isExternal = href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));
            trackEvent('click', isExternal ? 'external_link' : 'internal_link', elementInfo.text || href, undefined);
          }
          break;

        case 'card':
          if (trackCardClicks) {
            trackEvent('click', 'card', elementInfo.text, undefined);
          }
          break;

        case 'input':
          if (trackInputInteractions) {
            trackEvent('click', 'input', elementInfo.placeholder || elementInfo.type, undefined);
          }
          break;

        case 'select':
          if (trackInputInteractions) {
            trackEvent('click', 'select', elementInfo.placeholder, undefined);
          }
          break;

        default:
          // Track cliques em outros elementos interativos
          if (target.getAttribute('role') === 'button' || 
              target.classList.contains('cursor-pointer') ||
              target.onclick ||
              target.getAttribute('tabindex') !== null) {
            trackEvent('click', 'interactive_element', elementInfo.text || elementInfo.tagName, undefined);
          }
          break;
      }

      // Track cliques em elementos com data attributes específicos
      const trackingData = target.getAttribute('data-track');
      if (trackingData) {
        const [action, category, label] = trackingData.split('|');
        trackEvent(action || 'click', category || 'custom', label || elementInfo.text, undefined);
      }
    };

    // Adicionar listener de clique
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [enabled, trackCardClicks, trackButtonClicks, trackLinkClicks, trackInputInteractions]);
};

// Função para identificar o tipo de elemento
function getElementType(element: HTMLElement): string {
  const tagName = element.tagName.toLowerCase();
  
  // Verificar se é um botão
  if (tagName === 'button' || 
      element.getAttribute('role') === 'button' ||
      element.classList.contains('btn') ||
      element.classList.contains('button')) {
    return 'button';
  }

  // Verificar se é um link
  if (tagName === 'a' && element.getAttribute('href')) {
    return 'link';
  }

  // Verificar se é um card
  if (element.classList.contains('card') ||
      element.closest('.card') ||
      tagName === 'article') {
    return 'card';
  }

  // Verificar se é um input
  if (tagName === 'input' || tagName === 'textarea') {
    return 'input';
  }

  // Verificar se é um select
  if (tagName === 'select' || element.classList.contains('select')) {
    return 'select';
  }

  return 'other';
}

// Função para extrair informações do elemento
function getElementInfo(element: HTMLElement): {
  text: string;
  tagName: string;
  placeholder?: string;
  type?: string;
} {
  const text = element.textContent?.trim().substring(0, 50) || '';
  const tagName = element.tagName.toLowerCase();
  
  return {
    text,
    tagName,
    placeholder: element.getAttribute('placeholder') || undefined,
    type: element.getAttribute('type') || undefined
  };
}
