import { formatPrice, storefront } from "@/utils";
import Link from "next/link";
import Image from "next/image";

export default function Shop({ response }: any) {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 col-auto gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {response.products.edges.map((item: any) => {
            let product = item.node;
            let image = product.images.edges[0].node;
            return (
              <Link
                key={product.handle}
                href={`objects/${product.handle}`}
                className="group product-tile p-1"
              >
                <div className="relative w-full">
                  <Image
                    src={image.transformedSrc}
                    alt={"product-image"}
                    width={500}
                    height={500}
                    className="h-full w-full hover:opacity-50 object-center"
                  />
                  <div>
                    <div className="absolute right-[0px] top-[0%] font-['Minion'] text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">{product.title}</div>
                    <div className="absolute right-[0px] bottom-[0px] font-['Minion'] text-sm text-primary-blue font-semibold md:text-transparent group-hover:text-primary-blue group-focus:text-primary-blue">
                      {formatPrice(product.priceRange.minVariantPrice.amount)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          }).reverse()}
        </div>
      </div>
    </div>
  );
}
