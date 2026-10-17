/** @type {import('next').NextConfig} */
const INTERVIEW_COPILOT = "https://doyuim.github.io/interview-copilot";

const nextConfig = {
  // Interview Copilot is a static app hosted on GitHub Pages; serve it under this domain
  // so it lives at doyu-portfolio-site.is-a.dev/interview-copilot without a copy of the code.
  async rewrites() {
    return [
      { source: "/interview-copilot", destination: `${INTERVIEW_COPILOT}/` },
      { source: "/interview-copilot/:path*", destination: `${INTERVIEW_COPILOT}/:path*` },
    ];
  },
};

export default nextConfig;
