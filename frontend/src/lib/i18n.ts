import type { Language } from "@/lib/types";

type Dictionary = {
  languageName: string;
  appName: string;
  nav: {
    home: string;
    jobs: string;
    about: string;
    report: string;
    admin: string;
  };
  common: {
    verified: string;
    trustedSource: string;
    whyTrusted: string;
    externalLink: string;
    apply: string;
    copyLink: string;
    noApplyMethod: string;
    reset: string;
    seeAll: string;
    loadMore: string;
    back: string;
    sponsored: string;
    mmMissing: string;
    readMore: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    latest: string;
    trustStrip: string;
    trustCta: string;
    todayChip: string;
  };
  jobs: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
  };
  detail: {
    trustTitle: string;
    trustBody: string;
    trustPolicy: string;
    reportLink: string;
  };
  about: {
    title: string;
    subtitle: string;
    sections: {
      what: string;
      curation: string;
      sources: string;
      contact: string;
    };
  };
  report: {
    title: string;
    subtitle: string;
    submit: string;
  };
  legal: {
    privacy: string;
    terms: string;
  };
  admin: {
    newJob: string;
    sources: string;
    lockNote: string;
    submit: string;
  };
};

const dictionaries: Record<Language, Dictionary> = {
  mm: {
    languageName: "မြန်မာ",
    appName: "Dear Career",
    nav: {
      home: "ပင်မ",
      jobs: "အလုပ်များ",
      about: "အကြောင်းအရာ",
      report: "Report",
      admin: "Admin",
    },
    common: {
      verified: "စိစစ်ပြီး",
      trustedSource: "ယုံကြည်ရတဲ့ Source",
      whyTrusted: "ဘာကြောင့် ယုံကြည်ရတာလဲ",
      externalLink: "External link ဖြစ်ပါတယ်",
      apply: "လျှောက်မယ်",
      copyLink: "Link ကူးမယ်",
      noApplyMethod: "လျှောက်ရန် မရှိသေးပါ",
      reset: "Reset",
      seeAll: "အကုန်ကြည့်မယ်",
      loadMore: "နောက်ထပ်ကြည့်မယ်",
      back: "နောက်သို့",
      sponsored: "Sponsored",
      mmMissing: "MM မရှိသေးပါ",
      readMore: "အသေးစိတ်ဖတ်မယ်",
    },
    home: {
      title: "အလုပ်ကောင်းတွေကို စစ်ပြီးပေးတယ်",
      subtitle: "Trusted source တွေဆီကပဲ ရွေးတင်ထားတာပါ",
      cta: "အလုပ်တွေကြည့်မယ်",
      latest: "နောက်ဆုံးတင်ထားတဲ့ အလုပ်များ",
      trustStrip: "Scam မဖြစ်အောင် ဘာတွေ လုပ်ထားလဲ?",
      trustCta: "Trust & Safety ကိုကြည့်မယ်",
      todayChip: "Today",
    },
    jobs: {
      title: "အလုပ်တွေကို စစ်ပြီး ရွေးကြည့်မယ်",
      subtitle: "Filter, search, trust info နဲ့ သေချာလေ့လာလို့ရပါတယ်",
      emptyTitle: "အခု filter နဲ့ မတွေ့သေးဘူး",
      emptyBody: "Filter ကိုကျယ်အောင်ပြန်ပြင်ပြီး ထပ်ရှာကြည့်ပါ",
    },
    detail: {
      trustTitle: "ယုံကြည်ရတဲ့ Source",
      trustBody: "ဒီအလုပ်ကို curated trusted source list ထဲက domain နဲ့ စစ်ထားပါတယ်။",
      trustPolicy: "Trust policy",
      reportLink: "ဒီအလုပ်က မသင်္ကာဘူး",
    },
    about: {
      title: "Dear Career က ဘာလဲ",
      subtitle: "Scam မဖြစ်အောင် curated jobs ပဲ တင်ပေးတဲ့ Burmese-first product ပါ",
      sections: {
        what: "Dear Career အကြောင်း",
        curation: "ဘယ်လိုစိစစ်လဲ",
        sources: "Trusted sources",
        contact: "ဆက်သွယ်ရန် / Report",
      },
    },
    report: {
      title: "အလုပ်တစ်ခုကို Report လုပ်မယ်",
      subtitle: "မသင်္ကာဖွယ်၊ link မမှန်၊ duplicate စတာတွေကိုပို့နိုင်ပါတယ်",
      submit: "ပို့မယ်",
    },
    legal: {
      privacy: "ကိုယ်ရေးအချက်အလက်",
      terms: "စည်းကမ်းချက်များ",
    },
    admin: {
      newJob: "အလုပ်အသစ်တင်မယ်",
      sources: "Trusted sources",
      lockNote: "Admin API key ကို server env မှာထားပြီးမှ submit လုပ်နိုင်မယ်",
      submit: "တင်မယ်",
    },
  },
  en: {
    languageName: "English",
    appName: "Dear Career",
    nav: {
      home: "Home",
      jobs: "Jobs",
      about: "About",
      report: "Report",
      admin: "Admin",
    },
    common: {
      verified: "Verified",
      trustedSource: "Trusted source",
      whyTrusted: "Why trusted?",
      externalLink: "This opens an external link",
      apply: "Apply",
      copyLink: "Copy link",
      noApplyMethod: "No apply method",
      reset: "Reset",
      seeAll: "See all",
      loadMore: "Load more",
      back: "Back",
      sponsored: "Sponsored",
      mmMissing: "MM not available",
      readMore: "Read details",
    },
    home: {
      title: "We screen good jobs before you see them",
      subtitle: "Only selected roles from trusted sources",
      cta: "Browse jobs",
      latest: "Latest jobs",
      trustStrip: "How do we reduce scam risk?",
      trustCta: "Read Trust & Safety",
      todayChip: "Today",
    },
    jobs: {
      title: "Browse curated job opportunities",
      subtitle: "Filter, search, and check trust details before applying",
      emptyTitle: "No jobs found for this filter",
      emptyBody: "Broaden the filters and try again",
    },
    detail: {
      trustTitle: "Trusted source",
      trustBody: "This listing matches a curated source domain from our reviewed list.",
      trustPolicy: "Trust policy",
      reportLink: "This job looks suspicious",
    },
    about: {
      title: "What Dear Career is",
      subtitle: "A Burmese-first curated job product focused on trust and clarity",
      sections: {
        what: "About Dear Career",
        curation: "How we curate",
        sources: "Trusted sources",
        contact: "Contact / Report",
      },
    },
    report: {
      title: "Report a job",
      subtitle: "Send scam, misleading, wrong-link, or duplicate reports",
      submit: "Submit report",
    },
    legal: {
      privacy: "Privacy",
      terms: "Terms",
    },
    admin: {
      newJob: "Post a job",
      sources: "Trusted sources",
      lockNote: "Submissions require a server-side admin API key configuration",
      submit: "Submit",
    },
  },
};

export const LANGUAGES: Language[] = ["mm", "en"];

export function getDictionary(language: Language) {
  return dictionaries[language];
}
