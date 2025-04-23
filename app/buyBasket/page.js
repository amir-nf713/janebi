"use client";

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import apiKey from '../API';
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { GoDash } from "react-icons/go";

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState(null);
  const [discountInputBg, setDiscountInputBg] = useState("bg-white");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    province: '',
    city: '',
    postalCode: '',
    address: '',
    discountCode: ''
  });

  // Calculate prices
  const { totalPrice, discountAmount, subtotal } = useMemo(() => {
    let total = 0;
    let discount = 0;
    let subtotal = 0;
    
    cartItems.forEach((cartItem) => {
      const product = productDetails.find(p => p?._id === cartItem.id);
      if (product) {
        const basePrice = product.money || 0;
        const quantity = cartItem.quantity || 1;
        const offer = product.offer || 0;
        
        total += basePrice * quantity;
        const discountedPrice = Math.floor((basePrice * (100 - offer) / 100) * quantity);
        discount += (basePrice * quantity) - discountedPrice;
        subtotal += discountedPrice;
      }
    });

    return {
      totalPrice: total,
      discountAmount: discount,
      subtotal: subtotal,
    };
  }, [cartItems, productDetails]);

  const finalPrice = subtotal + shippingCost - appliedDiscount;

  // Fetch shipping cost
  useEffect(() => {
    const fetchShippingCost = async () => {
      try {
        const response = await axios.get(apiKey.Web);
        setShippingCost(response?.data?.data?.[0]?.postMoney || 0);
      } catch (err) {
        console.error("Failed to fetch shipping cost:", err);
        setShippingCost(0);
      }
    };

    fetchShippingCost();
  }, []);

  // Fetch cart items
  useEffect(() => {
    const getCartItems = () => {
      try {
        const items = Cookies.get("cart");
        setCartItems(items ? JSON.parse(items) : []);
      } catch (err) {
        console.error("Error parsing cart items:", err);
        setCartItems([]);
      }
    };
    
    getCartItems();
    window.addEventListener("storage", getCartItems);
    return () => window.removeEventListener("storage", getCartItems);
  }, []);

  // Fetch product details
  useEffect(() => {
    if (cartItems.length === 0) {
      setProductDetails([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.all(
          cartItems.map(item => 
            axios.get(`${apiKey.getoneitem}/${item.id}`)
              .catch(err => {
                console.error(`Error fetching product ${item.id}:`, err);
                return null;
              })
          )
        );
        
        const fetchedProducts = responses
          .filter(res => res?.data?.data)
          .map(res => res.data.data);
          
        setProductDetails(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("سبد خرید شما خالی است");
      return;
    }
    
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.mobile || 
        !formData.province || !formData.city || !formData.postalCode || !formData.address) {
      setError("لطفا تمام فیلدهای ضروری را پر کنید");
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    router.push('/payment-confirmation');
  };

  const updateCart = useCallback((updatedCart) => {
    setCartItems(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
    window.dispatchEvent(new Event("storage"));
  }, []);

  const increaseQuantity = useCallback((k, id) => {
    const updatedCart = cartItems.map(item => {
      if (item.k === k) {
        const product = productDetails.find(p => p?._id === id);
        if (!product) return item;

        let canIncrease = false;
        
        product.devaiceOK?.forEach(variant => {
          variant.mojodi?.forEach((stock, colorIndex) => {
            if (item.indexcolor === colorIndex && stock > item.quantity) {
              canIncrease = true;
            }
          });
        });

        if (canIncrease) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
      }
      return item;
    });

    updateCart(updatedCart);
  }, [cartItems, productDetails, updateCart]);

  const decreaseQuantity = useCallback((k) => {
    const updatedCart = cartItems
      .map(item =>
        item.k === k && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  const removeItem = useCallback((k) => {
    const updatedCart = cartItems.filter(item => item.k !== k);
    updateCart(updatedCart);
  }, [cartItems, updateCart]);

  const applyDiscount = () => {
    if (!formData.discountCode.trim()) {
      setDiscountInputBg("bg-red-300");
      setError("لطفا کد تخفیف را وارد کنید");
      return;
    }

    axios.get(apiKey.Offer)
      .then((response) => {
        const validDiscount = response.data.data.find(
          discount => discount.code === formData.discountCode
        );

        if (!validDiscount) {
          setDiscountInputBg("bg-red-300");
          setError("کد تخفیف نامعتبر است");
          setAppliedDiscount(0);
          return;
        }

        if (validDiscount.maxShope > subtotal) {
          setDiscountInputBg("bg-red-300");
          setError(`حداقل مبلغ سفارش برای این کد تخفیف ${validDiscount.maxShope.toLocaleString()} تومان است`);
          setAppliedDiscount(0);
          return;
        }

        setDiscountInputBg("bg-green-100");
        setAppliedDiscount(validDiscount.money);
        setError(null);
      })
      .catch((error) => {
        console.error("Error applying discount:", error);
        setDiscountInputBg("bg-red-300");
        setError("خطا در اعمال کد تخفیف. لطفا دوباره تلاش کنید");
        setAppliedDiscount(0);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">تکمیل اطلاعات خرید</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">مشخصات محصول</h2>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem, index) => {
            const product = productDetails.find(p => p?._id === cartItem.id);
            if (!product) return null;

            const productImage = product.photo?.split("ph1:")[1]?.split("ph2:")[0] || "";
            const discountedPrice = Math.floor((((product.money || 0) / 100) * (100 - (product.offer || 0))))

            return (
              <div key={`${cartItem.k}-${index}`} className="border p-4 flex-col flex items-center w-full justify-around border-gray-300 mb-3">
                <div className="flex w-full flex-row items-center">
                  {productImage && (
                    <img
                      src={productImage}
                      alt={product.onvan}
                      className="w-20 h-20 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-product.png";
                      }}
                    />
                  )}
                  <div className="mr-4 text-sky-800 flex justify-center items-center font-bold">
                    {`${product.onvan || 'محصول ناشناخته'} - ${cartItem.model || 'بدون مدل'}`}
                  </div>
                </div>

                <div className="flex-wrap flex w-full mt-4 flex-row justify-around items-center">
                  <div className="flex flex-row justify-center items-center">
                    <div className="mx-3 flex items-center gap-2">
                      <button
                        onClick={() => increaseQuantity(cartItem.k, cartItem.id)}
                        className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                        aria-label="افزایش تعداد"
                      >
                        <FaPlus />
                      </button>
                      <span className="text-xl">{cartItem.quantity || 1}</span>
                      <button
                        onClick={() => decreaseQuantity(cartItem.k)}
                        className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                        disabled={cartItem.quantity <= 1}
                        aria-label="کاهش تعداد"
                      >
                        <GoDash />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(cartItem.k)}
                      className="ml-auto p-2 bg-black text-white rounded hover:bg-red-700 transition"
                      aria-label="حذف محصول"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  <div className="max-mobile-xlk:mt-3 justify-center items-center text-lg font-semibold flex flex-row">
                    {(discountedPrice * (cartItem.quantity || 1)).toLocaleString()} تومان
                    {cartItem.color && (
                      <div
                        className="w-10 h-9 mr-5 rounded flex justify-center items-center text-sm border border-black"
                        aria-label="رنگ محصول"
                      >{cartItem.color}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="font-extrabold mt-6 max-mobile-xlk:text-lg text-2xl w-full flex justify-center items-center">
            سبد خرید خالی است
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-2">نام *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-2">نام خانوادگی *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block mb-2">شماره موبایل *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              pattern="09[0-9]{9}"
              required
            />
          </div>

          <div>
            <label htmlFor="province" className="block mb-2">استان *</label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="block mb-2">شهر *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block mb-2">کد پستی *</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              pattern="\d{10}"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block mb-2">آدرس دقیق *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            name="discountCode"
            value={formData.discountCode}
            onChange={handleChange}
            placeholder="کد تخفیف"
            className={`flex-1 p-2 border ${discountInputBg} rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
          />
          <button
            type="button"
            onClick={applyDiscount}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition"
          >
            اعمال کد
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>مبلغ کل:</span>
            <span>{totalPrice.toLocaleString()} تومان</span>
          </div> 

          <div className="flex justify-between mb-2">
            <span>هزینه پست:</span>
            <span>{shippingCost.toLocaleString()} تومان</span>
          </div>
          
          {(discountAmount > 0 || appliedDiscount > 0) && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>تخفیف ها:</span>
              <span>{(discountAmount + appliedDiscount).toLocaleString()} تومان</span>
            </div>
          )}
          
          <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
            <span>مبلغ قابل پرداخت:</span>
            <span>{finalPrice.toLocaleString()} تومان</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold transition disabled:bg-gray-400"
          disabled={cartItems.length === 0 || loading}
        >
          {loading ? 'در حال پردازش...' : 'پرداخت و تکمیل خرید'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;