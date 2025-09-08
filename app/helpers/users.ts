export const users = {
  standard: {
    username: process.env.STANDARD_USER!,
    password: process.env.STANDARD_PASS!,
  },
  locked: {
    username: process.env.LOCKED_USER!,
    password: process.env.LOCKED_PASS!,
  },
  perf: {
    username: process.env.PERF_USER!,
    password: process.env.PERF_PASS!,
  },
  visual: {
    username: process.env.VISUAL_USER!,
    password: process.env.VISUAL_PASS!,
  },
} as const;

export const baseUrl = process.env.BASE_URL!;
