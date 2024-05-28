
import React, { Fragment, Suspense } from "react";
import Preloader from "../elements/Preloader";
const BannerThree = React.lazy(() => import("../components/BannerThree"));
const CompanyOne = React.lazy(() => import("../components/CompanyOne"));
const FeatureTwo = React.lazy(() => import("../components/FeatureTwo"));
const FooterThree = React.lazy(() => import("../components/FooterThree"));
const LogisticsOne = React.lazy(() => import("../components/LogisticsOne"));
const NavbarOne = React.lazy(() => import("../components/NavbarOne"));
const ServiceThree = React.lazy(() => import("../components/ServiceThree"));
const ShipmentOne = React.lazy(() => import("../components/ShipmentOne"));
const SupportBarOne = React.lazy(() => import("../components/SupportBarOne"));
const TestimonialThree = React.lazy(() =>
  import("../components/TestimonialThree")
);

const HomeThree = () => {
  return (
    <>
      <Fragment>
        <Suspense fallback={<Preloader />}>
          {/* SupportBarOne */}
          <SupportBarOne />

          {/* Navbar one */}
          <NavbarOne />

          {/* Banner Three */}
          <BannerThree />

          {/* Service Three */}
          <ServiceThree />

          {/* Feature Two */}
          <FeatureTwo />

          {/* Testimonial Three */}
          <TestimonialThree />

          {/* Footer Three */}
          <FooterThree />
        </Suspense>
      </Fragment>
    </>
  );
};

export default HomeThree;
