import Modal from "@/components/Modal";
import { getProductById } from "@/lib/actions"
import { Product } from "@/types";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string }
}


const ProductDetails = async ({ params: { id } }: Props) => {

  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-6 shadow-md rounded-lg">
        {/* Left: Product Image */}
        <div className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.productTitle}
            className="w-full h-auto max-h-72 object-cover rounded-lg"
          />
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-2/3 space-y-4">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900">{product.productTitle}</h1>

          {/* Price & Discount Section */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div className="text-lg font-bold">
              <span>{product.currency}&nbsp;</span>
              <span className="text-xl font-extrabold text-gray-900">{product.currentPrice}</span>
            </div>
            {product.discountRate && (
              <span className="text-sm bg-red-500 text-white px-3 py-1 rounded">
                {product.discountRate} OFF
              </span>
            )}
          </div>

          {/* 2x2 Grid for Price Info with Borders */}
          <div className="grid grid-cols-2 divide-x divide-gray-300 border border-gray-300">
            <div className="text-sm text-gray-600 flex justify-between p-4 border-b border-gray-300">
              <span>Original Price:</span>
              <span className="font-bold text-gray-900">{product.currency} {product.originalPrice}</span>
            </div>
            <div className="text-sm text-gray-600 flex justify-between p-4 border-b border-gray-300">
              <span>Current Price:</span>
              <span className="font-bold text-gray-900">{product.currency} {product.currentPrice}</span>
            </div>
            <div className="text-sm text-gray-600 flex justify-between p-4">
              <span>Highest Price:</span>
              <span className="font-bold text-gray-900">{product.currency} {product.highestPrice}</span>
            </div>
            <div className="text-sm text-gray-600 flex justify-between p-4">
              <span>Lowest Price:</span>
              <span className="font-bold text-gray-900">{product.currency} {product.lowestPrice}</span>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-4">
            {/* Visit Product Page */}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Visit Product Page
            </a>

            {/* Track Price Button (opens <Modal>), a prompt box */}
            <Modal />
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Product Description</h2>
        <p className="text-gray-700">
          This is a placeholder for the product description. You can replace this with actual product details.
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;

