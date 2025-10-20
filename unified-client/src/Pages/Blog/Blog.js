import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { BlogBanner } from "../../components/BlogBanner/BlogBanner";
import { Section1 } from "../../components/Section1/Section1";
import "./Blog.css";

function Blog() {
  // useEffect(() => {
  //   AOS.init();
  //   // eslint-disable-next-line
  // }, []);
  return (
    <>
      <Header />
      <div class='soon'>
        <img src='./img/images/blog/coming-soon.png'></img>
      </div>

      {/* <Header />
      <BlogBanner />
      <Section1 />
      <Footer /> */}
    </>
  );
}

export default Blog;
