import { Lectures } from "./lectures";
import { Features } from "./features";
import { About } from "./about";
import { VideoFeatureSection } from "./video-feature-section";
import { Pricing } from "./pricing";
import { Testimonials } from "./testimonials";
import { News } from "./news";

export default function DeferredHomeSections() {
  return (
    <>
      <Lectures />
      <Features />
      <About />
      <VideoFeatureSection />
      <Pricing />
      <Testimonials />
      <News />
    </>
  );
}
