"use client";

import { addUserEmailToProduct } from "@/lib/actions";

interface Props {
  productId: string,
}

const Modal = ({ productId }: Props) => {

  const handleClick = async () => {
    const email = prompt("Enter your email address ");
    // console.log(email)
    if (!email) return alert("Plz enter the email");

    await addUserEmailToProduct(productId, email);
  }

  return (
    <>
      <button
        className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        onClick={handleClick}
      >
        Track Price
      </button>

    </>
  )
}

export default Modal
