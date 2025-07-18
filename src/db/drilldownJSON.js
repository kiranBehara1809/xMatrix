const DRILL_DOWN_VIEW = {
  futures: [
    {
      title: `${Math.random() > 0.5 ? "S&P" : "SPX"} Futures`,
      value: `$${Math.floor(Math.random() * 10000)}.${Math.floor(
        Math.random() * 100
      )}`,
      changeValue: `${Math.random() > 0.5 ? "-" : "+"}$${Math.floor(
        Math.random() * 100
      )}.${Math.floor(Math.random() * 100)}`,
      changePercent: `${Math.floor(Math.random() * 5)}.${String(
        Math.floor(Math.random() * 100)
      ).padStart(2, "0")}`,
    },
    {
      title: `${Math.random() > 0.5 ? "NASDAQ" : "NDX"} Fut.`,
      value: `$${Math.floor(Math.random() * 30000)}.${Math.floor(
        Math.random() * 100
      )}`,
      changeValue: `${Math.random() > 0.5 ? "-" : "+"}$${Math.floor(
        Math.random() * 100
      )}.${Math.floor(Math.random() * 100)}`,
      changePercent: `${Math.floor(Math.random() * 5)}.${String(
        Math.floor(Math.random() * 100)
      ).padStart(2, "0")}`,
    },
    {
      title: `${Math.random() > 0.5 ? "Dow" : "DJI"} Futures`,
      value: `$${Math.floor(Math.random() * 50000)}.${Math.floor(
        Math.random() * 100
      )}`,
      changeValue: `${Math.random() > 0.5 ? "-" : "+"}$${Math.floor(
        Math.random() * 100
      )}.${Math.floor(Math.random() * 100)}`,
      changePercent: `${Math.floor(Math.random() * 5)}.${String(
        Math.floor(Math.random() * 100)
      ).padStart(2, "0")}`,
    },
    {
      title: `${Math.random() > 0.5 ? "VIX" : "Volatility"} Index`,
      value: `$${Math.floor(Math.random() * 50)}.${Math.floor(
        Math.random() * 100
      )}`,
      changeValue: `${Math.random() > 0.5 ? "-" : "+"}$${Math.floor(
        Math.random() * 5
      )}.${Math.floor(Math.random() * 100)}`,
      changePercent: `${Math.floor(Math.random() * 5)}.${String(
        Math.floor(Math.random() * 100)
      ).padStart(2, "0")}`,
    },
  ],
  marketSummary: [
    {
      title: `Dow Jones: ${Math.random() > 0.5 ? "Rise" : "Drop"} Due to ${
        Math.random() > 0.5 ? "Economic" : "Financial"
      } Data`,
      content: `Dow Jones Industrial Average sees ${
        Math.random() > 0.5 ? "sharpest rise" : "sharpest drop"
      } in a month, as ${Math.random() > 0.5 ? "optimism" : "concerns"} over ${
        Math.random() > 0.5 ? "economic" : "financial"
      } data and ${
        Math.random() > 0.5 ? "strong" : "mixed"
      } corporate earnings weighed on sentiment. Investors reacted to the latest ${
        Math.random() > 0.5 ? "GDP" : "CPI"
      } data and ${Math.random() > 0.5 ? "policy" : "tariff"} updates.`,
    },
    {
      title: `S&P 500: ${Math.random() > 0.5 ? "Rose" : "Slipped"} ${Math.floor(
        Math.random() * 5
      )}.${Math.floor(Math.random() * 100)}%`,
      content: `The S&P 500 ${
        Math.random() > 0.5 ? "rose" : "slipped"
      } ${Math.floor(Math.random() * 5)}.${Math.floor(
        Math.random() * 100
      )}% after ${
        Math.random() > 0.5 ? "hitting" : "missing"
      } a new record, influenced by ${
        Math.random() > 0.5 ? "stable" : "rising"
      } inflation and ${
        Math.random() > 0.5 ? "positive" : "disappointing"
      } results from major financials. ${
        Math.random() > 0.5 ? "Optimism" : "Uncertainty"
      } has ${
        Math.random() > 0.5 ? "boosted" : "tempered"
      } hopes for imminent Fed rate changes.`,
    },
    {
      title: `Nasdaq: ${
        Math.random() > 0.5 ? "Hits" : "Misses"
      } Record Led by ${Math.random() > 0.5 ? "Tech" : "Energy"}`,
      content: `Nasdaq ${
        Math.random() > 0.5 ? "hits" : "misses"
      } new record, led by ${
        Math.random() > 0.5 ? "tech" : "energy"
      } rally at a ${
        Math.random() > 0.5 ? "new all-time high" : "slight decline"
      }. ${
        Math.random() > 0.5 ? "Semiconductor" : "Renewable energy"
      } stocks surged after ${
        Math.random() > 0.5 ? "Nvidia" : "Tesla"
      } announced plans to expand ${
        Math.random() > 0.5 ? "AI" : "EV"
      } initiatives, boosting related names like ${
        Math.random() > 0.5 ? "AMD" : "Ford"
      } and ${Math.random() > 0.5 ? "Super Micro" : "General Motors"}.`,
    },
    {
      title: `Market Trends: ${Math.random() > 0.5 ? "Rising" : "Declining"} ${
        Math.random() > 0.5 ? "Inflation" : "Interest"
      } Rates`,
      content: `The market is influenced by ${
        Math.random() > 0.5 ? "rising" : "declining"
      } ${Math.random() > 0.5 ? "inflation" : "interest"} rates and ${
        Math.random() > 0.5 ? "strong" : "weak"
      } ${
        Math.random() > 0.5 ? "consumer" : "corporate"
      } spending. Analysts predict a ${
        Math.random() > 0.5 ? "bullish" : "bearish"
      } trend for the next quarter.`,
    },
  ],
  stocks: {
    gainers: Array.from({ length: 4 }, () => ({
      name: `${Math.random() > 0.5 ? "Global" : "Nova"} ${
        Math.random() > 0.5 ? "Tech" : "Pharma"
      } ${Math.random() > 0.5 ? "Inc." : "Ltd."}`,
      symbol: `${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      value: `$${Math.floor(Math.random() * 50)}.${Math.floor(
        Math.random() * 100
      )}`,
      change: `+${Math.floor(Math.random() * 300)}.${Math.floor(
        Math.random() * 100
      )}%`,
    })),
    topStocks: Array.from({ length: 5 }, () => ({
      name: `${Math.random() > 0.5 ? "Tech" : "Energy"} ${
        Math.random() > 0.5 ? "Corp." : "Inc."
      }`,
      symbol: `${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      value: `$${Math.floor(Math.random() * 500)}.${Math.floor(
        Math.random() * 100
      )}`,
      change: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(
        Math.random() * 5
      )}.${Math.floor(Math.random() * 100)}%`,
    })),
  },
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
  marketStatus: Math.random() > 0.5 ? "Market Open" : "Market Closed",
};

export { DRILL_DOWN_VIEW };
