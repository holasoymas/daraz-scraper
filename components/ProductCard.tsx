import { Product } from "@/types"
import Link from "next/link"
import Image from "next/image"

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/product/${product._id}`} className="block p-4 border rounded-lg shadow-lg transition hover:shadow-xl">
      <div className="relative w-full">
        <Image
          src={product.image}
          alt={product.productTitle}
          width={200}  // Set a fixed width
          height={0}   // Allow height to adjust dynamically
          className="w-full h-auto max-h-60 object-contain rounded"
        />
      </div>

      {/* Product Details */}
      <div className="mt-3 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{product.productTitle}</h3>

        <div className="flex justify-between items-center mt-2 text-gray-700">
          <div className="text-lg font-bold">
            <span>{product.currency}</span>
            <span className="ml-1">{product.currentPrice}</span>
          </div>

          {product.discountRate && (
            <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
              {product.discountRate} OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard
