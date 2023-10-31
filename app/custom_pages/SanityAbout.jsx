import sanityAbout from '~/images/sanity_studio/about_page_sanity.png';
import aboutPage from '~/images/sanity_studio/about_page.png';

const SanityAbout = () => {
  return (
    <div>
      <h1 className="uppercase font-extrabold">
        Content Management System (CMS) Reference
      </h1>
      <h3 className="p-4 text-lg mb-8">
        Below, you can view a concise studio showing how the content of the
        About page is managed. I specialise in building custom studios for
        clients to manage their content with ease.
      </h3>
      <div className="sm:grid grid-cols-2 text-center">
        <div className="mb-8">
          <h2 className="font-extrabold">CMS STUDIO</h2>
          <img src={sanityAbout} alt="Example studio for About page" />
        </div>
        <div>
          <h2 className="font-extrabold">ABOUT PAGE REF</h2>
          <img src={aboutPage} alt="About page reference" />
        </div>
      </div>
    </div>
  );
};
export default SanityAbout;
