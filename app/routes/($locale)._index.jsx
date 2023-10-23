import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money, MediaFile} from '@shopify/hydrogen';

import imageUrlBuilder from '@sanity/image-url';
import {client} from '~/lib/sanity/sanity';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * Sanity image builder
 */
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  const homepageSanity = await context.sanity.fetch(`*[_type == "home"]`); // Sanity data from homepage

  return defer({featuredCollection, recommendedProducts, homepageSanity});
}

export default function Homepage() {
  const data = useLoaderData();

  return (
    <div className="home">
      <SanityHero hero={data.homepageSanity} />
    </div>
  );
}

function SanityHero(data) {
  const heroVideoURL = data.hero[0].hero.shopifyAsset.url;
  const heroLogoURL = data.hero[0].hero.content[0].image.asset._ref;

  return (
    <section
      className="hero-section w-full relative overflow-hidden h-screen"
      style={{
        height: 'calc(100vh - var(--header-height))',
      }}
    >
      <div className="hero-content flex flex-col w-full h-full absolute top-0 right-0 bottom-0 left-0 ">
        <div className="hero-video-container h-full flex-shrink-1 overflow-hidden relative border-solid border-black border-2">
          <div className="hero-video-wrapper h-full relative">
            <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full pointer-events-none bg-var(--black)"></div>
            <video
              width="100%"
              height="100%"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full !important object-cover"
            >
              <source src={heroVideoURL} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="relative"></div>
        <div className="bottom-0 left-0 right-0 hero-logo-container p-5 mt-auto flex-shrink-0">
          <img
            src={urlFor(heroLogoURL).url()}
            alt="Test"
            className="w-full h-auto max-w-full mx-auto"
            style={{
              inset: '0px',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

{
  /* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */
}

// function FeaturedCollection({collection}) {
//   if (!collection) return null;
//   const image = collection?.image;
//   return (
//     <Link
//       className="featured-collection"
//       to={`/collections/${collection.handle}`}
//     >
//       {image && (
//         <div className="featured-collection-image">
//           <Image data={image} sizes="100vw" />
//         </div>
//       )}
//       <h1>{collection.title}</h1>
//     </Link>
//   );
// }

// function RecommendedProducts({products}) {
//   return (
//     <div className="recommended-products">
//       <h2>Recommended Products</h2>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Await resolve={products}>
//           {({products}) => (
//             <div className="recommended-products-grid">
//               {products.nodes.map((product) => (
//                 <Link
//                   key={product.id}
//                   className="recommended-product"
//                   to={`/products/${product.handle}`}
//                 >
//                   <Image
//                     data={product.images.nodes[0]}
//                     aspectRatio="1/1"
//                     sizes="(min-width: 45em) 20vw, 50vw"
//                   />
//                   <h4>{product.title}</h4>
//                   <small>
//                     <Money data={product.priceRange.minVariantPrice} />
//                   </small>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </Await>
//       </Suspense>
//       <br />
//     </div>
//   );
// }
