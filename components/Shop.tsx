import { formatPrice, storefront } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export default function Shop({ response }: any) {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {response.products.edges.map((item: any) => {
            let product = item.node;
            let image = product.images.edges[0].node;
            return (
              <Link
                key={product.handle}
                href={`objects/${product.handle}`}
                className="product-tile hover:opacity-50 p-1"
              >
                <div className="w-full">
                  <Image
                    src={image.transformedSrc}
                    alt={"product-image"}
                    width={500}
                    height={500}
                    className="h-full w-full object-center"
                  />
                </div>
                
                <h3 className="mt-4 text-sm text-gray-700 text-right">{product.title}</h3>
                <p className="mt-1 text-sm text-gray-900 text-right">
                  {formatPrice(product.priceRange.minVariantPrice.amount)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
