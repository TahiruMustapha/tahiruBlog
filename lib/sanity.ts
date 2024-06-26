import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId:"y5xuhpyc",
  dataset:"production",
  apiVersion:"2024-03-24",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
