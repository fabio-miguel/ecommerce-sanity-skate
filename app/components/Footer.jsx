import {useMatches, NavLink, Link} from '@remix-run/react';

export function Footer({menu}) {
  return (
    <footer className="footer">
      {/* <FooterMenu menu={menu} /> */}
      <FooterSiteLinks />
      <FooterSocialLinks />
    </footer>
  );
}

function FooterMenu({menu}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function FooterSiteLinks() {
  return (
    <nav className="pt-8 flex flex-col gap-8 items-center justify-center text-center mb-16 font-black">
      <Link
        to="/info/about"
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        About
      </Link>
      <Link
        to="/articles"
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Articles
      </Link>
      <Link
        to="/info/shipping-and-delivery"
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Shipping & Delivery
      </Link>
      <Link
        to="/info/terms-and-conditions"
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Terms & Conditions
      </Link>
      <Link
        to="/info/privacy-policy"
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Privacy Policy
      </Link>
    </nav>
  );
}

function FooterSocialLinks() {
  return (
    <nav className="pt-8 flex flex-col gap-8 items-center justify-center text-center mb-16 font-black">
      <Link
        to=""
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Instagram
      </Link>
      <Link
        to=""
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Facebook
      </Link>
      <Link
        to=""
        className="uppercase text-6xl no-underline leading-7 tracking-wider text-white"
      >
        Newsletter
      </Link>
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
