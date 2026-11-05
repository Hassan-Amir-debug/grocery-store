"use client";


import { useEffect, useState } from "react";


interface Product {
 title: string;
 brand?: string;
 category: string;
 image: string;
 description?: string;
 price?: number;
 quantity?: number;

}

const categories = [
 { name: "Fruits", image: "/Pictures/fruits.jpg" },
 { name: "Vegetables", image: "/Pictures/vegetables.jpg" },
 { name: "Grains & Pulses", image: "/Pictures/grains-pulses.jpg" },
 { name: "Snacks", image: "/Pictures/snacks.jpg" },
 { name: "Bread", image: "/Pictures/Bread.jpg" },
];
const banners = [
 {
   title: "Fresh Groceries, Delivered to Your Door!",
   subtitle: "Everything you need for your home, all in one place.",
   image:
     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
 },
 {
   title: "Freshness for Every Day",
   subtitle: "Explore our collection of fresh fruits and vegetables.",
   image:
     "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1600",
 },
 {
   title: "Your Everyday Grocery Store",
   subtitle: "Shop your essentials from one convenient place.",
   image:
     "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
 },
];


export default function Home() {
 const [products, setProducts] = useState<Product[]>([]);
 const [search, setSearch] = useState("");
 const [cart, setCart] = useState<Product[]>([]);
 const [cartOpen, setCartOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] =
   useState<Product | null>(null);
const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
const [bannerIndex, setBannerIndex] = useState(0);
 useEffect(() => {
   fetch("/products.json")
     .then((res) => {
       if (!res.ok) throw new Error("Products could not be loaded");
       return res.json();
     })
     .then((data) => setProducts(data))
     .catch((error) => console.error(error));
 },

 []);
 useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("user");
    }
  }
}, []);


 useEffect(() => {
   const timer = setInterval(() => {
     setBannerIndex((current) => (current + 1) % banners.length);
   }, 5000);


   return () => clearInterval(timer);
 }, []);


 const matchingProducts = products.filter((product) =>
   product.title.toLowerCase().includes(search.toLowerCase())
 );


 
const addToCart = (product: Product) => {
  setCart((current) => {
    const existingProduct = current.find(
      (item) => item.title === product.title
    );

    if (existingProduct) {
      return current.map((item) =>
        item.title === product.title
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    return [...current, { ...product, quantity: 1 }];
  });
};



 const openCategory = (category: string) => {
   window.location.href = `/category?name=${encodeURIComponent(category)}`;
 };


 const getCategoryImage = (category: string) =>
   products.find((product) => product.category === category)?.image;


 const formatPrice = (price?: number) =>
   price !== undefined
     ? `PKR ${price.toLocaleString("en-PK")}`
     : "Price unavailable";


 return (
   <main className="min-h-screen bg-[#f8f6ed] text-[#26382b]">


     {/* HEADER */}
     <header className="sticky top-0 z-40 bg-[#173d2b] text-white shadow-lg">
       <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-4">


         <div>
           <h1 className="text-2xl font-bold">
             Grocery Store
           </h1>
           <p className="text-xs text-green-200">by Hassan</p>
         </div>


         <nav className="flex flex-wrap items-center gap-5 text-sm">
           <a href="/" className="hover:text-green-300">Home</a>
           <div className="group relative">
             <button className="hover:text-green-300">
               Categories ▾
             </button>
             <div className="absolute left-0 top-full hidden w-52 rounded-lg bg-white py-2 text-gray-800 shadow-xl group-hover:block">
 {categories.map((category) => (
   <button
     key={category.name}
     onClick={() => {
       document.getElementById(category.name)?.scrollIntoView({
         behavior: "smooth",
         block: "start",
       });
     }}
     className="block w-full px-4 py-2 text-left hover:bg-green-50"
   >
     {category.name}
   </button>
 ))}
</div>
           </div>
           <a href="/about" className="hover:text-green-300">About Us</a>
           <a href="/contact" className="hover:text-green-300">Contact</a>
         </nav>
  <div className="flex items-center gap-4">
  {user ? (
  <>
    <span className="text-sm font-semibold">
      Welcome, {user.name || user.email}!
    </span>

    <button
      onClick={() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setUser(null);
      }}
      className="text-sm hover:text-green-300"
    >
      Logout
    </button>
  </>
) : (
  <>
    <a href="/login" className="text-sm hover:text-green-300">
      Login
    </a>

    <a
      href="/signup"
      className="rounded-full border border-green-200 px-5 py-2 text-sm font-semibold hover:bg-green-800"
    >
      Sign Up
    </a>
  </>
)}

  <button
    onClick={() => setCartOpen(true)}
    className="rounded-full bg-[#d9e7c5] px-5 py-2 font-semibold text-[#173d2b] hover:bg-white"
  >
    🛒 Cart ({cart.length})
  </button>
</div>

       </div>


       <div className="mx-auto max-w-7xl px-6 pb-4">
         <input
           type="search"
           placeholder="Search for groceries..."
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="w-full rounded-full bg-white px-5 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
         />
       </div>
     </header>


     <div className="mx-auto max-w-7xl px-6 py-8">


       {/* SEARCH RESULTS */}
       {search.trim() ? (
         <section>
           <h2 className="mb-6 text-2xl font-bold">
             Search Results for "{search}"
           </h2>


           <div className="flex gap-5 overflow-x-auto pb-5">
             {matchingProducts.map((product, index) => (
               <ProductCard
                 key={`${product.title}-${index}`}
                 product={product}
                 onAdd={() => addToCart(product)}
                 onClick={() => setSelectedProduct(product)}
                 formatPrice={formatPrice}
               />
             ))}
           </div>


           {matchingProducts.length === 0 && (
             <p className="py-12 text-center text-gray-500">
               No matching products found.
             </p>
           )}
         </section>
       ) : (
         <>
           {/* PROMOTIONAL BANNER */}
           <section
             className="relative flex min-h-[340px] items-center overflow-hidden rounded-3xl bg-cover bg-center text-white"
             style={{
               backgroundImage: `linear-gradient(90deg, rgba(12,35,22,.85), rgba(12,35,22,.2)), url(${banners[bannerIndex].image})`,
             }}
           >
             <div className="max-w-xl px-10 py-14">
               <p className="mb-3 font-semibold text-green-200">
                 GROCERY STORE BY HASSAN
               </p>
               <h2 className="text-4xl font-bold leading-tight">
                 {banners[bannerIndex].title}
               </h2>
               <p className="mt-4 text-green-50">
                 {banners[bannerIndex].subtitle}
               </p>
               <button
                 onClick={() =>
                   document.getElementById("featured")?.scrollIntoView({
                     behavior: "smooth",
                   })
                 }
                 className="mt-7 rounded-full bg-[#d9e7c5] px-7 py-3 font-bold text-[#173d2b] hover:bg-white"
               >
                 Shop Now →
               </button>
             </div>


             <div className="absolute bottom-5 right-6 flex gap-2">
               {banners.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setBannerIndex(index)}
                   className={`h-3 w-3 rounded-full ${
                     bannerIndex === index ? "bg-white" : "bg-white/40"
                   }`}
                 />
               ))}
             </div>
           </section>


           {/* CATEGORY SHORTCUTS */}
<section className="bg-[#f8f7f2] px-6 py-10">
 <div className="mx-auto max-w-7xl">
   <h2 className="mb-8 text-center text-2xl font-bold text-[#174d35]">
     Shop by Category
   </h2>


   <div className="flex flex-wrap justify-center gap-8">
     {categories.map((category) => (
       <button
         key={category.name}
         onClick={() =>
           document
             .getElementById(category.name)
             ?.scrollIntoView({
               behavior: "smooth",
               block: "start",
             })
         }
         className="group flex flex-col items-center gap-3"
       >
         <img
           src={category.image}
           alt={category.name}
           className="h-24 w-24 rounded-full border-2 border-[#174d35] object-cover transition-transform duration-300 group-hover:scale-110"
         />


         <span className="font-semibold text-[#174d35]">
           {category.name}
         </span>
       </button>
     ))}
   </div>
 </div>
</section>


           {/* CATEGORY PRODUCT SECTIONS */}


{categories.map((category) => {
const categoryProducts = products
  .filter((product) =>
    product.category ===
    (category.name === "Bread" ? "Frozen Foods" : category.name)
  )
  .slice(0, 10);

 return (
   <section
     key={category.name}
     id={category.name}
     className="mt-12 scroll-mt-40"
   >
     <h2 className="mb-6 text-2xl font-bold text-[#174d35]">
       {category.name}
     </h2>


     <div className="flex gap-5 overflow-x-auto pb-5">
       {categoryProducts.map((product, index) => (
         <ProductCard
           key={`${product.title}-${index}`}
           product={product}
           onAdd={() => addToCart(product)}
           onClick={() => setSelectedProduct(product)}
           formatPrice={formatPrice}
         />
       ))}
     </div>


     {categoryProducts.length === 0 && (
       <p className="text-gray-500">
         No products available in this category.
       </p>
     )}
   </section>
 );
      })}
          </>
        )}

      </div>

     {/* FOOTER */}
     <footer className="mt-16 bg-[#173d2b] px-6 py-8 text-center text-white">
       <h2 className="text-xl font-bold">Grocery Store by Hassan</h2>
       <p className="mt-2 text-sm text-green-200">
         Freshness and quality at your doorstep.
       </p>
       <p className="mt-4 text-xs text-green-300">
         © 2026 Grocery Store by Hassan. All rights reserved.
       </p>
     </footer>


     {/* PRODUCT DETAILS POPUP */}
     {selectedProduct && (
       <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
         onClick={() => setSelectedProduct(null)}
       >
         <div
           className="grid w-full max-w-3xl gap-6 rounded-2xl bg-white p-6 md:grid-cols-2"
           onClick={(e) => e.stopPropagation()}
         >
           <img
             src={selectedProduct.image}
             alt={selectedProduct.title}
             className="h-72 w-full object-contain"
           />
           <div className="flex flex-col justify-center">
             <p className="text-sm text-gray-500">
               {selectedProduct.brand || selectedProduct.category}
             </p>
             <h2 className="mt-2 text-2xl font-bold">
               {selectedProduct.title}
             </h2>
             <p className="mt-4 font-bold text-green-700">
               {formatPrice(selectedProduct.price)}
             </p>
             <p className="mt-3 text-sm text-gray-600">
               {selectedProduct.description || "Product details coming soon."}
             </p>
             <button
               onClick={() => addToCart(selectedProduct)}
               className="mt-6 rounded-lg bg-[#173d2b] px-5 py-3 font-semibold text-white"
             >
               🛒 Add to Cart
             </button>
             <button
               onClick={() => setSelectedProduct(null)}
               className="mt-3 text-sm text-gray-500"
             >
               Close
             </button>
           </div>
         </div>
       </div>
     )}


     {/* CART SIDE PANEL */}
     {cartOpen && (
       <div
         className="fixed inset-0 z-50 bg-black/50"
         onClick={() => setCartOpen(false)}
       >
         <aside
           className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 text-gray-800 shadow-xl"
           onClick={(e) => e.stopPropagation()}
         >
           <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold">Your Cart</h2>
             <button onClick={() => setCartOpen(false)}>✕</button>
           </div>


           {cart.length === 0 ? (
             <p className="mt-10 text-center text-gray-500">
               Your cart is empty.
             </p>
           ) : (
             <div className="mt-6 space-y-5">
               {cart.map((product, index) => (
                 <div key={index} className="flex items-center gap-4 border-b pb-4">
                   <img
                     src={product.image}
                     alt={product.title}
                     className="h-16 w-16 object-contain"
                   />
                  <div>
  <p className="font-semibold">{product.title}</p>

  <p className="text-sm text-green-700">
    {formatPrice(product.price)}
  </p>

  <div className="mt-2 flex items-center gap-3">
    <button
      onClick={() =>
        setCart((current) =>
          current.map((item, i) =>
            i === index
              ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
              : item
          )
        )
      }
      className="rounded bg-gray-200 px-3 py-1"
    >
      −
    </button>

    <span>{product.quantity || 1}</span>

    <button
      onClick={() =>
        setCart((current) =>
          current.map((item, i) =>
            i === index
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          )
        )
      }
      className="rounded bg-gray-200 px-3 py-1"
    >
      +
    </button>
  </div>
</div>
                   <button
                     onClick={() =>
                       setCart((current) =>
                         current.filter((_, i) => i !== index)
                       )
                     }
                     className="ml-auto text-sm text-red-600"
                   >
                     Remove
                   </button>
                 </div>
               ))}
               <button
  className="w-full rounded-lg bg-[#173d2b] py-3 font-semibold text-white"
  onClick={() => {
    localStorage.setItem("grocery-cart", JSON.stringify(cart));
    window.location.href = "/checkout";
  }}
>
  Proceed to Checkout
</button>
             </div>
           )}
         </aside>
       </div>
     )}
   </main>
 );
}


function ProductCard({
 product,
 onAdd,
 onClick,
 formatPrice,
}: {
 product: Product;
 onAdd: () => void;
 onClick: () => void;
 formatPrice: (price?: number) => string;
}) {
 return (
   <div className="min-w-64 max-w-64 rounded-2xl border border-[#e5e5d8] bg-white p-4 shadow-sm transition hover:shadow-lg">
     <button onClick={onClick} className="w-full">
       <div className="flex h-48 items-center justify-center">
         <img
           src={product.image}
           alt={product.title}
           className="max-h-full max-w-full object-contain"
         />
       </div>
       <div className="mt-4 text-left">
         <p className="text-xs text-gray-500">
           {product.brand || product.category}
         </p>
         <h3 className="mt-1 line-clamp-2 min-h-10 font-semibold">
           {product.title}
         </h3>
         <p className="mt-3 font-bold text-[#24613c]">
           {formatPrice(product.price)}
         </p>
       </div>
     </button>
     <button
       onClick={onAdd}
       className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#173d2b] py-3 font-semibold text-white hover:bg-green-800"
     >
       🛒 Add to Cart
     </button>
   </div>
 );
}

