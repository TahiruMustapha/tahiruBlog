/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "**",
      },
      {
        protocol: "https",
       hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
    ],
  },
//   env: {
    
//     GOOGLE_CLIENT_ID : "781154136171-l42m4ibqaur45uk4jeto6jt6a8o1hrqu.apps.googleusercontent.com",
//    GOOGLE_CLIENT_SECRET: "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"
// },
};

export default nextConfig;
