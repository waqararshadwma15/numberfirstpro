/*
 * English copy. Business facts (services, fees, package criteria, process, sectors, clients)
 * come from the live numberfirst.pro site. The Arabic dictionary must match this shape.
 */

export const en = {
  meta: {
    siteTitle: "Numbers First | Bookkeeping & Financial Advisory in Saudi Arabia",
    siteDescription:
      "Monthly bookkeeping, VAT and Zakat filing, ZATCA e-invoicing and payroll (WPS), plus budgeting, forecasting and financial advisory for Saudi SMEs. Fixed fees from SAR 1,000 a month.",
  },
  common: {
    brand: "NUMBERS FIRST",
    skip: "Skip to content",
    nav: {
      home: "Home",
      accounting: "Accounting & Bookkeeping",
      advisory: "Financial Planning & Advisory",
      clients: "Clients",
      contact: "Contact",
    },
    navShort: { accounting: "Accounting", advisory: "Advisory" },
    cta: {
      assessment: "Book a free assessment",
      assessmentShort: "Free assessment",
      whatsapp: "Chat on WhatsApp",
      explore: "Explore",
      packages: "See packages",
      backHome: "Back to home",
    },
    switchLang: "العربية",
    switchLangLabel: "التبديل إلى العربية",
    theme: { toLight: "Switch to light theme", toDark: "Switch to dark theme" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
    pathIndex: { accounting: "01", advisory: "02" },
    contact: {
      title: "Contact us",
      lead: "We reply within one working day.",
      mobile: "Mobile",
      whatsapp: "WhatsApp",
      email: "Email",
    },
    footer: {
      tagline: "Bookkeeping & financial advisory",
      serving: "Serving small and medium businesses across Saudi Arabia.",
      rights: "© 2026 Numbers First. Fees exclude 15% VAT.",
      solutions: "Solutions",
      company: "Company",
    },
    notFound: {
      title: "This page isn't on the books",
      lead: "The page you're looking for doesn't exist or has moved.",
    },
  },

  home: {
    hero: {
      label: "Bookkeeping & financial advisory",
      titleA: "Your numbers,",
      titleB: "first.",
      lead: "Two ways we help Saudi small and medium businesses. Choose the one that fits where you are today.",
      choose: "Choose your solution",
      emblemAlt: "Numbers First NF emblem with rising gold bars",
    },
    paths: {
      accounting: {
        title: "Accounting & Bookkeeping",
        summary: "Accurate monthly books and ZATCA-ready compliance, for one fixed monthly fee.",
        points: ["Monthly bookkeeping", "VAT, Zakat & e-invoicing", "Payroll & WPS"],
        meta: "From SAR 1,000 / month",
        cta: "Explore accounting",
      },
      advisory: {
        title: "Financial Planning & Advisory",
        summary: "Budgets, forecasts and decisions on pricing, margins, leases and expansion, backed by your own numbers.",
        points: ["Budgeting & forecasting", "Cash-flow planning", "Pricing & expansion decisions"],
        meta: "Sector expertise across 6 industries",
        cta: "Explore advisory",
      },
    },
    facts: [
      { title: "ZATCA ready", body: "E-invoicing on the Fatoora platform" },
      { title: "VAT & Zakat", body: "Returns filed on time" },
      { title: "Payroll & WPS", body: "Salaries and Mudad compliance" },
      { title: "Fixed fees", body: "SAR 1,000 to 5,000 a month" },
    ],
    choose: {
      label: "Which do you need?",
      title: "Two distinct solutions, one team behind your numbers",
      lead: "Start with the one that answers today's question. Many businesses use both.",
      accounting: {
        title: "Choose Accounting & Bookkeeping if",
        items: [
          "You need every transaction recorded, reconciled and closed each month",
          "VAT, Zakat or ZATCA e-invoicing deadlines need handling",
          "You run payroll and need WPS and Mudad compliance",
          "You want a monthly P&L, balance sheet and cash-flow pack",
        ],
      },
      advisory: {
        title: "Choose Financial Planning & Advisory if",
        items: [
          "You're setting prices or reviewing margins",
          "You're weighing a lease, a new branch or an expansion",
          "You want budgets and cash-flow forecasts reviewed against actuals",
          "You need to see profitability by branch and know what to do next",
        ],
      },
      both: {
        title: "Need both?",
        body: "Good advice starts with accurate books. Our Premium package combines monthly bookkeeping with a cash-flow forecast and a CFO-lite review.",
        cta: "Compare packages",
      },
    },
    process: {
      label: "How it works",
      title: "From first call to monthly reports",
      steps: [
        { title: "Free assessment", body: "We review your books and compliance position and note the gaps." },
        { title: "Fixed-fee proposal", body: "A written scope and monthly fee, matched to your balance sheet." },
        { title: "14-day onboarding", body: "Systems, records and access set up, with opening balances checked." },
        { title: "Monthly delivery", body: "Books closed, reports sent and a review call to go through the results." },
      ],
    },
    clients: {
      label: "Clients",
      title: "Trusted by growing businesses",
      lead: "Clinics, retail, hospitality, sports, consulting and design businesses rely on Numbers First for their books.",
      sectorsLabel: "Sectors we serve",
      sectors: [
        "Healthcare",
        "Retail and e-commerce",
        "Hospitality",
        "Food and beverage (F&B)",
        "Sports and fitness",
        "Consulting",
        "Design and workspaces",
      ],
      logoSuffix: "logo",
    },
    sample: {
      label: "Sample report",
      title: "See what lands in your inbox every month",
      lead: "Profitability by branch, a detailed P&L and recommended actions, in one clear pack.",
      cta: "View sample report",
    },
    faq: {
      label: "FAQ",
      title: "Questions businesses ask us",
      items: [
        {
          q: "What does Numbers First do?",
          a: "Numbers First offers two financial services for small and medium businesses in Saudi Arabia: Accounting & Bookkeeping (monthly bookkeeping, VAT and Zakat returns, ZATCA e-invoicing, payroll and WPS) and Financial Planning & Advisory (budgeting, cash-flow forecasting, pricing, margin, lease and expansion decisions).",
        },
        {
          q: "Who do you work with?",
          a: "Small and medium businesses across Saudi Arabia, including healthcare, retail and e-commerce, hospitality, food and beverage, sports and fitness, consulting, and design and workspace businesses.",
        },
        {
          q: "How much do your services cost?",
          a: "Bookkeeping packages are a fixed monthly fee from SAR 1,000 to SAR 5,000, set by the value of your balance sheet. Fees exclude 15% VAT. Backlog clean-up and system setup are quoted as a one-off fee.",
        },
        {
          q: "How do I get started?",
          a: "Book a free assessment. We review your books and compliance position, send a written fixed-fee proposal, complete onboarding in 14 days, then close your books and send reports every month.",
        },
        {
          q: "How quickly do you reply?",
          a: "We reply within one working day. You can reach us on WhatsApp or by phone at +966 59 856 5877, or by email at info@numberfirst.pro.",
        },
      ],
    },
    cta: {
      title: "Start with a look at your books",
      lead: "Tell us about your business. We'll review your records and compliance and come back with a fixed-fee proposal.",
    },
  },

  accounting: {
    meta: {
      title: "Bookkeeping, VAT & Zakat Services in Saudi Arabia | Numbers First",
      description:
        "Monthly bookkeeping, VAT and Zakat returns, ZATCA e-invoicing on Fatoora, payroll and WPS for Saudi SMEs. Fixed monthly fees from SAR 1,000.",
    },
    hero: {
      label: "Accounting & Bookkeeping",
      titleA: "Books closed.",
      titleB: "Returns filed.",
      titleC: "Every month.",
      lead: "Accurate monthly books, ZATCA-ready compliance and clear reports for Saudi small and medium businesses. One fixed monthly fee, from SAR 1,000.",
    },
    checklist: {
      title: "Monthly close",
      period: "This month",
      items: [
        "Transactions recorded",
        "Bank accounts reconciled",
        "E-invoices on Fatoora",
        "Payroll paid through WPS",
        "VAT return prepared",
        "Books closed, reports sent",
      ],
      done: "Ready for your review call",
    },
    services: {
      label: "What's included",
      title: "Everything your finance function needs, outsourced",
      lead: "We keep the books and handle compliance, so you can run the business.",
      items: [
        {
          title: "Monthly bookkeeping",
          body: "Every transaction recorded, reconciled and closed each month, so your books are always current.",
        },
        {
          title: "VAT, Zakat and e-invoicing",
          body: "Returns prepared and filed on time, with your invoicing connected to ZATCA's Fatoora platform.",
        },
        {
          title: "Payroll and WPS",
          body: "Salary processing and Mudad compliance, including end-of-service calculations.",
        },
        {
          title: "Management reports",
          body: "A monthly P&L, balance sheet and cash-flow pack that shows where the money goes.",
        },
      ],
    },
    compliance: {
      label: "Saudi compliance",
      title: "Built around ZATCA, VAT, Zakat and WPS",
      items: [
        { tag: "ZATCA", title: "E-invoicing", body: "Your invoicing connected to the Fatoora platform." },
        { tag: "VAT", title: "VAT returns", body: "Prepared and filed on time." },
        { tag: "Zakat", title: "Annual Zakat filing", body: "Prepared from closed, reconciled books." },
        { tag: "WPS", title: "Payroll & Mudad", body: "Salaries processed, end-of-service calculated." },
      ],
    },
    packages: {
      label: "Packages",
      title: "A fixed monthly fee that fits your size",
      lead: "Your package is set by the value of your balance sheet. After a free assessment you get a written proposal with the scope agreed.",
      selector: "What's your balance sheet value?",
      ranges: ["Under SAR 500K", "SAR 500K to 1M", "SAR 1M to 3M", "Above SAR 3M"],
      sar: "SAR",
      perMonth: "/ month",
      balanceSheet: "Balance sheet",
      popular: "Most popular",
      match: "Your match",
      choose: "Choose",
      plans: [
        {
          key: "starter",
          name: "Starter",
          price: 1000,
          criteria: "Under SAR 500K, or under 100 sales transactions",
          features: ["Monthly bookkeeping", "Quarterly VAT return", "Annual Zakat filing"],
        },
        {
          key: "standard",
          name: "Standard",
          price: 2000,
          criteria: "SAR 500K to 1M",
          features: ["Monthly bookkeeping", "Payroll up to 10 staff (WPS)", "Monthly P&L"],
        },
        {
          key: "growth",
          name: "Growth",
          price: 3500,
          criteria: "SAR 1M to 3M",
          features: ["Monthly bookkeeping", "ZATCA e-invoicing support", "Payroll up to 25 staff", "Budget and monthly reports"],
        },
        {
          key: "premium",
          name: "Premium",
          price: 5000,
          criteria: "Above SAR 3M",
          features: ["Everything in Growth", "Cash-flow forecast", "CFO-lite review", "Audit liaison and board pack"],
        },
      ],
      note: "Fees exclude 15% VAT. Backlog clean-up and system setup are quoted as a one-off fee.",
    },
    advisoryBridge: {
      title: "Ready to plan ahead?",
      body: "Once your books are accurate, the same numbers can drive budgets, forecasts and decisions.",
      cta: "Explore Financial Planning & Advisory",
    },
    faq: {
      label: "FAQ",
      title: "Accounting & bookkeeping questions",
      items: [
        {
          q: "How much does monthly bookkeeping cost in Saudi Arabia with Numbers First?",
          a: "A fixed monthly fee set by your balance sheet: Starter SAR 1,000 (under SAR 500K, or under 100 sales transactions), Standard SAR 2,000 (SAR 500K to 1M), Growth SAR 3,500 (SAR 1M to 3M) and Premium SAR 5,000 (above SAR 3M). Fees exclude 15% VAT.",
        },
        {
          q: "Do you handle ZATCA e-invoicing on the Fatoora platform?",
          a: "Yes. We connect your invoicing to ZATCA's Fatoora platform, and ZATCA e-invoicing support is included from the Growth package. Your free assessment includes an e-invoicing readiness check.",
        },
        {
          q: "Do you prepare and file VAT and Zakat returns?",
          a: "Yes. VAT and Zakat returns are prepared and filed on time. Every package includes monthly bookkeeping, and the Starter package includes a quarterly VAT return and annual Zakat filing.",
        },
        {
          q: "Can you run payroll and WPS for my staff?",
          a: "Yes. We process salaries and handle Mudad and WPS compliance, including end-of-service calculations. Standard covers payroll for up to 10 staff and Growth for up to 25.",
        },
        {
          q: "How long does onboarding take?",
          a: "14 days. We set up systems, records and access, and check your opening balances before the first monthly close.",
        },
        {
          q: "Can you fix books that are behind?",
          a: "Yes. Backlog clean-up and system setup are quoted as a one-off fee, separate from the monthly package.",
        },
      ],
    },
    cta: {
      title: "Get your books and compliance in order",
      lead: "Start with a free review of your bookkeeping, VAT position and ZATCA e-invoicing readiness.",
    },
  },

  advisory: {
    meta: {
      title: "Financial Planning & Advisory for Saudi SMEs | Numbers First",
      description:
        "Budgets, cash-flow forecasts, pricing, margin, lease and expansion advice for Saudi businesses in sports and fitness, real estate, F&B, hospitality, consultancy and creative industries.",
    },
    hero: {
      label: "Financial Planning & Advisory",
      titleA: "Decisions backed by",
      titleB: "your own numbers.",
      lead: "Budgets and cash-flow forecasts you can act on, and clear answers on pricing, margins, leases and expansion.",
    },
    chart: {
      actual: "Actual",
      forecast: "Forecast",
      budget: "Budget",
      caption: "Budget vs actual, reviewed monthly",
    },
    services: {
      label: "What we do",
      title: "From monthly numbers to next decisions",
      lead: "We turn the numbers into decisions, so you can run the business.",
      items: [
        {
          title: "Budgeting and forecasting",
          body: "Budgets and cash-flow forecasts you can act on, reviewed against actuals every month.",
        },
        {
          title: "Pricing and margins",
          body: "Pricing and margin decisions, backed by your own numbers.",
        },
        {
          title: "Lease and expansion decisions",
          body: "Clear analysis before you sign a lease, open a branch or expand.",
        },
        {
          title: "Profitability by branch",
          body: "Revenue, EBITDA and net profit by month, so you see which locations carry the business.",
        },
        {
          title: "CFO-lite review",
          body: "A regular review of results with recommended actions: what the numbers mean and what to do next.",
        },
        {
          title: "Audit liaison and board pack",
          body: "Board-ready reporting and a single point of contact for your auditors.",
        },
      ],
    },
    industries: {
      label: "Industry expertise",
      title: "We know the numbers behind your sector",
      lead: "Each industry has its own cost lines, margins and growth decisions. These are the questions we help answer most.",
      focusLabel: "Where we help",
      items: [
        {
          key: "sports",
          name: "Sports & Fitness",
          summary: "Gyms, studios, academies and court venues.",
          focus: ["Membership and session pricing", "Profitability by branch or venue", "Expansion and new-site decisions"],
        },
        {
          key: "realestate",
          name: "Real Estate",
          summary: "Property owners, developers and managers.",
          focus: ["Cash-flow forecasts for projects and portfolios", "Lease and rental decisions", "Budgets reviewed against actuals"],
        },
        {
          key: "fnb",
          name: "F&B",
          summary: "Cafés, restaurants and food brands.",
          focus: ["Menu pricing and margins", "Profitability by branch", "Lease and new-outlet decisions"],
        },
        {
          key: "hospitality",
          name: "Hospitality",
          summary: "Hotels, serviced stays and venues.",
          focus: ["Budgets and cash-flow forecasts", "Every cost line, month by month, with margins", "Expansion decisions"],
        },
        {
          key: "consultancy",
          name: "Consultancy",
          summary: "Management, professional and advisory firms.",
          focus: ["Fee pricing and project margins", "Cash-flow forecasting", "Budgets you can act on"],
        },
        {
          key: "creative",
          name: "Design & Creative",
          summary: "Design studios, agencies and creative workspaces.",
          focus: ["Project pricing and margins", "Cash-flow between projects", "Studio and workspace lease decisions"],
        },
      ],
    },
    sample: {
      label: "Sample report",
      title: "Your monthly financial outlook",
      lead: "Every month you receive a clear pack: profitability by branch, a detailed P&L and recommended actions. Open any page to view it larger.",
      open: "View larger",
      close: "Close",
      items: [
        {
          title: "Profitability by branch",
          body: "Revenue, EBITDA and net profit by month.",
          alt: "Sample branch profitability page with revenue, EBITDA and net profit charts, client details hidden",
        },
        {
          title: "Detailed monthly P&L",
          body: "Every cost line, month by month, with margins.",
          alt: "Sample detailed monthly P&L table with figures blurred",
        },
        {
          title: "Conclusion and actions",
          body: "What the numbers mean and what to do next.",
          alt: "Sample conclusion page with key findings and recommended actions, figures blurred",
        },
      ],
      note: "Sample from a client engagement. Client name, locations and figures are hidden for confidentiality.",
    },
    foundation: {
      label: "Built on accurate books",
      title: "Advice is only as good as the numbers under it",
      body: "Cash-flow forecasting, a CFO-lite review and a board pack are part of our Premium package, on top of monthly bookkeeping. Tell us what you need in your free assessment and the scope goes into your written proposal.",
      cta: "See Accounting & Bookkeeping packages",
    },
    faq: {
      label: "FAQ",
      title: "Financial planning & advisory questions",
      items: [
        {
          q: "What does your financial advisory service cover?",
          a: "Budgeting and cash-flow forecasting reviewed against actuals every month, pricing and margin decisions, lease and expansion decisions, profitability by branch, a CFO-lite review with recommended actions, and audit liaison with a board pack.",
        },
        {
          q: "Which industries do you advise?",
          a: "We focus on sports and fitness, real estate, food and beverage (F&B), hospitality, consultancy, and design and creative businesses in Saudi Arabia.",
        },
        {
          q: "What will I receive each month?",
          a: "A monthly financial outlook pack: profitability by branch (revenue, EBITDA and net profit by month), a detailed P&L with every cost line and margin, and a conclusion with recommended actions.",
        },
        {
          q: "How is financial advisory priced?",
          a: "Cash-flow forecasting, a CFO-lite review, audit liaison and a board pack are part of the Premium package at SAR 5,000 a month, alongside monthly bookkeeping. Otherwise, tell us what you need in the free assessment and the scope goes into your written proposal.",
        },
        {
          q: "Do I need accurate books before advisory?",
          a: "Advice is only as good as the numbers under it, so our advisory work builds on accurate monthly books. If your books need work, we can take on the bookkeeping too.",
        },
      ],
    },
    cta: {
      title: "Bring us the decision you're facing",
      lead: "Pricing, a new branch, a lease or next year's budget. Tell us what's on the table and we'll show you how we'd approach it.",
    },
  },

  enquire: {
    meta: {
      title: "Book a Free Bookkeeping Assessment | Numbers First",
      description:
        "Tell us about your business. We'll review your records and compliance and come back with a fixed-fee proposal.",
    },
    label: "Free assessment",
    title: "Start with a look at your books",
    lead: "Tell us about your business. We'll review your records and compliance and come back with a fixed-fee proposal.",
    checks: [
      "Review of your bookkeeping and VAT position",
      "ZATCA e-invoicing readiness check",
      "Written proposal with a fixed monthly fee",
    ],
    steps: ["Solution", "Your business", "Send"],
    stepOf: "Step {n} of {total}",
    q1: "What can we help you with?",
    options: {
      accounting: { title: "Accounting & Bookkeeping", body: "Books, VAT, Zakat, e-invoicing, payroll" },
      advisory: { title: "Financial Planning & Advisory", body: "Budgets, forecasts, pricing, expansion" },
      both: { title: "Both", body: "Accurate books and forward planning" },
      unsure: { title: "Not sure yet", body: "We'll recommend the right fit" },
    },
    q2: "Tell us about your business",
    fields: {
      name: "Your name",
      company: "Company",
      phone: "Phone or WhatsApp",
      email: "Email (optional)",
      industry: "Industry",
      balance: "Balance sheet value",
      needs: "What do you need help with?",
      message: "Anything else we should know?",
      messagePlaceholder: "For example: we're two months behind on VAT, or we're planning a second branch",
      select: "Select",
    },
    industries: [
      "Sports & Fitness",
      "Real Estate",
      "F&B",
      "Hospitality",
      "Consultancy",
      "Design & Creative",
      "Healthcare",
      "Retail and e-commerce",
      "Other",
    ],
    balances: ["Under SAR 500K", "SAR 500K to 1M", "SAR 1M to 3M", "Above SAR 3M", "Not sure"],
    needs: {
      accounting: [
        "Monthly bookkeeping",
        "VAT and Zakat returns",
        "ZATCA e-invoicing",
        "Payroll and WPS",
        "Management reports",
        "Backlog clean-up",
      ],
      advisory: [
        "Budgeting and forecasting",
        "Cash-flow forecast",
        "Pricing and margins",
        "Lease or expansion decision",
        "Profitability by branch",
        "CFO-lite review",
      ],
    },
    errors: {
      path: "Choose an option to continue.",
      name: "Please enter your name.",
      phone: "Please enter a phone or WhatsApp number.",
      email: "That email address doesn't look right.",
    },
    back: "Back",
    next: "Continue",
    review: "Prepare my request",
    q3: "Your request is ready",
    q3lead: "Send it to us on WhatsApp or by email. We reply within one working day.",
    sendWhatsapp: "Send on WhatsApp",
    sendEmail: "Email us",
    copy: "Copy request",
    copied: "Copied",
    edit: "Edit details",
    summary: {
      heading: "Free assessment request - Numbers First",
      subject: "Free assessment request",
      solution: "Solution",
      name: "Name",
      company: "Company",
      phone: "Phone/WhatsApp",
      email: "Email",
      industry: "Industry",
      balance: "Balance sheet",
      needs: "Needs",
      message: "Notes",
    },
    direct: "Prefer to talk now?",
  },
};

export type Dict = typeof en;
