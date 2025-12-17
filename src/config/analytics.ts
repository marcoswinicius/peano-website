// Google Analytics Configuration for Peano Corporate
// Add this to index.html when Google Analytics is configured

export const googleAnalyticsConfig = {
  // Replace with your actual GA4 ID
  measurementId: 'G-XXXXXXXXXX',
  
  // Track page views
  pageView: (path: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
      });
    }
  },

  // Track events
  trackEvent: (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  },

  // Predefined events
  events: {
    chatOpened: () => {
      window.gtag?.('event', 'lead_chat_opened', {
        event_category: 'engagement',
        event_label: 'lead_chat_widget',
      });
    },
    leadSubmitted: (data: { name: string; email: string; phone: string }) => {
      window.gtag?.('event', 'lead_submitted', {
        event_category: 'conversion',
        event_label: 'chat_widget',
        lead_name: data.name,
        lead_phone: data.phone,
        value: 1,
      });
    },
    cta_clicked: (ctaName: string) => {
      window.gtag?.('event', 'cta_clicked', {
        event_category: 'engagement',
        event_label: ctaName,
      });
    },
  },
};

// HTML to add to index.html <head>:
/*
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
</script>
<!-- End Google Analytics -->
*/
