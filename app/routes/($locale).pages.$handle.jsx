import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

import {useLocation, useNavigation} from '@remix-run/react';
import {client} from '~/lib/sanity/sanity';
import imageUrlBuilder from '@sanity/image-url';
import About from '~/custom_pages/About';
// import Contact from '~/custom_pages/Contact';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.page.title}`}];
};

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function loader({params, context}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  const pageContentSanity = await context.sanity.fetch(`*[_type == "page"]`); // Sanity data from homepage

  return json({page, pageContentSanity});
}

export default function Page() {
  const {page, pageContentSanity} = useLoaderData();
  const location = useLocation();
  const {state} = useNavigation();
  const isAboutPage = location.pathname === '/pages/about';
  // const isContactPage = location.pathname === '/pages/contact';
  // console.log(pageContentSanity);
  return (
    <>
      {state === 'loading' ? (
        <div></div>
      ) : (
        <>
          {/* <PageHeader heading={isAboutPage ? 'About' : page.title}></PageHeader> */}
          <div className="w-full">
            {isAboutPage ? (
              <About data={pageContentSanity} />
            ) : (
              // ) : isContactPage ? (
              //   // <ContactForm />
              //   <Contact data={pageContentSanity} />
              <div
                dangerouslySetInnerHTML={{__html: page.body}}
                className="prose dark:prose-invert"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

// DEFUALT CODE ====================================================
// export default function Page() {
//   const {page} = useLoaderData();
//   console.log(page);

//   return (
//     <div className="page">
//       <header>
//         <h1>{page.title}</h1>
//       </header>
//       <main dangerouslySetInnerHTML={{__html: page.body}} />
//     </div>
//   );
// }
