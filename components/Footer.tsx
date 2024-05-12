import { DisplayedFooter } from '@/components';
import { getPosts, storefront } from '@/utils';

export default async function Footer() {

    async function getData() {
        const posts = await getPosts()

        if (!posts) {
            return {
                notFound: true,
            }
        }

        return {
            posts
        }
    }

    const getProducts = async () => {
        const { data } = await storefront(productsQuery);
        return {
            products: data.products,
        };
    };

    const gql = String.raw;

    const productsQuery = gql`
          query Products {
            products(first: 10) {
              edges {
                node {
                  title
                  handle
                  tags
                  totalInventory
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  images(first: 10) {
                    edges {
                      node {
                        transformedSrc
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        `;

    const data = await getData();

    let response = data.posts

    let objectsResponse = (await getProducts()) as any;

    return (
        <DisplayedFooter response={response} objectsResponse={objectsResponse}/>
    )
}