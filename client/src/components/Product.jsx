
import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState } from "react";

const Product = () => {
  const [preferenceId,setPreferenceId]=useState(null)
  initMercadoPago('TEST-8b026674-a58f-4de7-b91e-ee31670594f2',{locale:"es-AR"});

  const productData = {
    title: "Hamburguesa",
    quantity: 1,
    price: 1000,
    payer: "test_user_1490493949@testuser.com"
  };

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "https://localhost:3000/create_preference",
        productData
      );
      // const { id } = response.data.id;
      // console.log(id)
      // return id;
      const { redirectUrl } = response.data;
      return redirectUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const url = await createPreference();
    //const id= await createPreference();
     //if (id) setPreferenceId(id);
    if (url) window.location.href = url;
  };

  return (
    <article className="p-8 bg-slate-800 rounded-xl text-white border border-slate-600">
      <div className="w-56 rounded-xl overflow-hidden">
        <img
          src="https://d31npzejelj8v1.cloudfront.net/media/recipemanager/recipe/1687289598_doble-carne.jpg"
          alt="Hamburguesa deliciosa"
        />
      </div>
      <div className="space-y-2 mt-2">
        <h3 className="text-3xl font-bold">{productData.title}</h3>
        <p className="text-xl font-semibold mb-2">${productData.price}</p>
        <button
          className="py-2 w-full bg-emerald-600 rounded-xl"
          onClick={handleBuy}
        >
          Comprar
        </button>
        {/* {preferenceId && <Wallet initialization={{preferenceId: preferenceId}} 
        customization={{
          visual: {
            theme: 'default',
          },
        }}
        onError={(error) => {
          console.error('Error:', error);
        }}
        onReady={() => {
          console.log('Wallet Brick is ready');
        }}
        onSubmit={(response) => {
          console.log('Payment submitted:', response);
        }}
        />} */}
      </div>
    </article>
  );
};

export default Product;